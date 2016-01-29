import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import org.apache.hadoop.conf.Configuration
import org.apache.spark.{ SparkContext, SparkConf }
import org.apache.spark.rdd.RDD
import org.bson.BSONObject
import com.mongodb.hadoop.{
  MongoInputFormat,
  MongoOutputFormat,
  BSONFileInputFormat,
  BSONFileOutputFormat
}
import com.mongodb.hadoop.util.MongoConfigUtil
import org.bson.types.ObjectId
import org.bson.{ BSONObject, BasicBSONObject }
import com.mongodb.hadoop.io.MongoUpdateWritable
import com.mongodb.BasicDBList

import scala.io.Source
import spray.json._
import DefaultJsonProtocol._

//val sc = SparkContext.getOrCreate

// val inputURI = "mongodb://localhost:27018/weather_db.historical"
// val outputURI = "mongodb://localhost:27018/weather_db.forecast"

object SysDist {
  var sc : SparkContext = null

  var hosts : List[String] = List(
    "localhost:27018",
    "localhost:27019",
    "localhost:27020"
  )

  var inputDB : String = "weather_db"
  var inputColl : String = "historical"

  var outputDB : String = "weather_db"
  var outputColl : String = "forecast"

  val baseURLFormat : String = "mongodb://%s/%s.%s?replicaSet=%s"

  var replicaSetName : String = "sysdist"
  var readPref : String = ""

  val inputConfig = new Configuration()
  val outputConfig = new Configuration()

  def readConfig() {
    val configsStr = Source.fromFile("config.json").getLines.mkString
    val jsonAst = configsStr.parseJson
    //println(jsonAst.prettyPrint)
    jsonAst.asJsObject.getFields("hosts", "database", "histColl", "foreColl", "replicaSet", "readPreference") match {
      case Seq(JsArray(_hosts), JsString(_db), JsString(_histColl), JsString(_foreColl), JsString(_replSet), JsString(_readPref)) => {
        hosts = _hosts.toList.map(_.convertTo[String])
        inputDB = _db
        outputDB = _db
        inputColl = _histColl
        outputColl = _foreColl
        replicaSetName = _replSet
        readPref = _readPref
      }
    }
  }

  def getURL(hostList: List[String], db: String, collection: String, replicaSet: String, readPref: String) : String = {
    var baseURLFormat = "mongodb://%s/%s.%s?replicaSet=%s"
    if (readPref != "") {
      baseURLFormat += "&readPreference=%s"
      println(">>>>> Using readPreference \"" + readPref + "\"")
      baseURLFormat.format(hostList.reduce(_+","+_), db, collection, replicaSet, readPref)
    }
    else {
      baseURLFormat.format(hostList.reduce(_+","+_), db, collection, replicaSet)
    }
  }

  def kelvinToCelsius(numberAsObj : Object) : Double = {
    val temp_kelvin = 
      (if (numberAsObj.isInstanceOf[Double])
         Double.unbox(numberAsObj)
       else
         numberAsObj.asInstanceOf[Integer].toDouble)
    temp_kelvin - 273.15
  }

  def saveToMongo(rdd: RDD[(Null, MongoUpdateWritable)], config: Configuration) {
    rdd.saveAsNewAPIHadoopFile("", classOf[Any], classOf[Any], classOf[MongoOutputFormat[Any,Any]], config)
  }
  // Fix the foreign keys in the database. That means, add a hist_id field
  // to entries in 'forecast' with the id from 'historical'
  def fixFK() {
    val fixFKInputFore = new Configuration()

    fixFKInputFore.set("mongo.input.uri", getURL(hosts, "weather_db", "forecast", replicaSetName, readPref))
    val name_fore = sc.newAPIHadoopRDD(fixFKInputFore, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])
    val name_fore_sorted = name_fore.map(
      {
        case (id, obj) =>
          (obj.get("city").asInstanceOf[BSONObject].get("name").toString,
            // If this object already contains the foreign key, we will discard it later
            // (this should happen either for every single document or for none of them)
            if (obj.containsField("hist_id")) None else id.toString)
      }).sortByKey(true, 1)

    val fixFKInputHist = new Configuration()
    fixFKInputHist.set("mongo.input.uri", getURL(hosts, "weather_db", "historical", replicaSetName, readPref))
    val name_hist = sc.newAPIHadoopRDD(fixFKInputHist, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])
    val name_hist_sorted =
      name_hist.
        map(
          {
            case (id, obj) =>
              (obj.get("city").asInstanceOf[BSONObject].get("name").toString, id.toString)
          }).
          sortByKey(true, 1)
    // This gives us pairs in the form ( (city1, idHistorical), (city1, idForecast) )
    val zipped = name_hist_sorted.zip(name_fore_sorted)
    saveToMongo(
    zipped.
      filter({ case ((n1, id_h), (n2, id_f)) => id_f != None }).
      map(
        {
          case ((n1, id_h), (n2, id_f)) =>
            val query = new BasicBSONObject().append("_id", new ObjectId(id_f.toString))
            val update = new BasicBSONObject().append("$set", new BasicBSONObject("hist_id", new ObjectId(id_h)))
            val muw = new MongoUpdateWritable(query, update, false, false)
            (null, muw)
        })
    , outputConfig)
  }

  def calc_avg_temp_last5d() {
    val docs = sc.newAPIHadoopRDD(inputConfig, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])

    val update_avgtemp = docs.
      map(x =>
      (x._1.toString,
       x._2.get("list").asInstanceOf[BasicDBList].toArray().takeRight(5 * 8).
         map(y => {
           val temp = y.asInstanceOf[BSONObject].get("main").asInstanceOf[BSONObject].get("temp")
           kelvinToCelsius(temp)
         }))).
      map(x => (x._1, x._2.reduce(_+_)/x._2.length)).
      map(x => {
        val newProps = new BasicBSONObject().append("stats.avg_temp_last5d", x._2)
        val query = new BasicBSONObject().append("hist_id", new ObjectId(x._1))
        val update = new BasicBSONObject().append("$set", newProps)
        (null, new MongoUpdateWritable(query, update, false, false))
      })
      saveToMongo(update_avgtemp, outputConfig)
  }

  def calc_minmax_temp() {
    val docs = sc.newAPIHadoopRDD(inputConfig, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])

    val update_minmaxtemp = docs.
      map(x =>
        (x._1.toString,
         x._2.get("list").asInstanceOf[BasicDBList].toArray().
          map(y => {
            val temp = y.asInstanceOf[BSONObject].get("main").asInstanceOf[BSONObject].get("temp")
            kelvinToCelsius(temp)
          }))).
      map(x => (x._1, (x._2.max, x._2.min))).
      map(x => {
        val newProps = new BasicBSONObject()
        newProps.append("stats.max_temp", x._2._1)
        newProps.append("stats.min_temp", x._2._2)
        val query = new BasicBSONObject().append("hist_id", new ObjectId(x._1))
        val update = new BasicBSONObject().append("$set", newProps)
        (null, new MongoUpdateWritable(query, update, false, false))
      })

    saveToMongo(update_minmaxtemp, outputConfig)
  }

  def calc_minmax_rain() {
    val docs = sc.newAPIHadoopRDD(inputConfig, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])

    val update_minmaxrain = docs.
      map(x =>
        (x._1.toString,
         x._2.get("list").asInstanceOf[BasicDBList].toArray().
         map(y => {
          val rain = Option(y.asInstanceOf[BSONObject].get("rain").asInstanceOf[BSONObject])
          val rain_3h = Option(if (rain.isDefined) rain.get.get("3h") else null)
          val rain_db : Double = (
            if (!rain_3h.isDefined)
              0.0 : Double
            else if (rain_3h.get.isInstanceOf[Double])
              Double.unbox(rain_3h.get)
            else
              rain_3h.get.asInstanceOf[Integer].toDouble)
          val dt_txt = y.asInstanceOf[BSONObject].get("dt_txt").toString
          (dt_txt, rain_db)
        }).filter(x => x._2 > 0.0).groupBy(y => {
          val date = y._1
          date.substring(0, date.indexOf(' '))
        }).toList.map(x => {
          val date = x._1
          val list = x._2.asInstanceOf[Array[(String,Double)]].map(_._2)
          (date, list.sum)})
        )).filter(x => x._2.length > 0 ).map(x => {
        val _max = x._2.map(_._2).max
        val _min = x._2.map(_._2).min
        (x._1, (_max, _min)) } ).
      map(x => {
        val newProps = new BasicBSONObject()
        newProps.append("stats.max_rain", x._2._1)
        newProps.append("stats.min_rain", x._2._2)
        val query = new BasicBSONObject().append("hist_id", new ObjectId(x._1))
        val update = new BasicBSONObject().append("$set", newProps)
        (null, new MongoUpdateWritable(query, update, false, false))
      })

    saveToMongo(update_minmaxrain, outputConfig)
  
  }

  def calc_avg_wind_5d() {
    val docs = sc.newAPIHadoopRDD(inputConfig, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])

    val update_avgwind = docs.
      map(x =>
        (x._1.toString,
         x._2.get("list").asInstanceOf[BasicDBList].toArray().takeRight(8 * 5).
         map(y => {
          val wind = Option(y.asInstanceOf[BSONObject].get("wind").asInstanceOf[BSONObject])
          val wind_speed = Option(if (wind.isDefined) wind.get.get("speed") else null)
          val wind_db : Double = (
            if (!wind_speed.isDefined)
              0.0 : Double
            else if (wind_speed.get.isInstanceOf[Double])
              Double.unbox(wind_speed.get)
            else
              wind_speed.get.asInstanceOf[Integer].toDouble)
          wind_db
          }))).
      map(x =>
        (x._1, x._2.reduce(_ + _)/x._2.length)).
      map(x => {
        val newProp = new BasicBSONObject().append("stats.avg_rain_last5d", x._2)
        val query = new BasicBSONObject().append("hist_id", new ObjectId(x._1))
        val update = new BasicBSONObject().append("$set", newProp)
        (null, new MongoUpdateWritable(query, update, false, false))
      })

    saveToMongo(update_avgwind, outputConfig)
  }

  def calc_minmax_wind() {
    val docs = sc.newAPIHadoopRDD(inputConfig, classOf[MongoInputFormat], classOf[Object], classOf[BSONObject])

    val update_minmaxwind = docs.
      map(x =>
        (x._1.toString,
         x._2.get("list").asInstanceOf[BasicDBList].toArray().
         map(y => {
          val wind = Option(y.asInstanceOf[BSONObject].get("wind").asInstanceOf[BSONObject])
          val wind_speed = Option(if (wind.isDefined) wind.get.get("speed") else null)
          val wind_db : Double = (
            if (!wind_speed.isDefined)
              0.0 : Double
            else if (wind_speed.get.isInstanceOf[Double])
              Double.unbox(wind_speed.get)
            else
              wind_speed.get.asInstanceOf[Integer].toDouble)
          val dt_txt = y.asInstanceOf[BSONObject].get("dt_txt").toString
          (dt_txt, wind_db)
        }).filter(x => x._2 > 0.0).groupBy(y => {
          val date = y._1
          date.substring(0, date.indexOf(' '))
        }).toList.map(x => {
          val date = x._1
          val list = x._2.asInstanceOf[Array[(String,Double)]].map(_._2)
          (date, (if (list.length == 0) None else Some(list.max)) : Option[Double])})
        )).map(x => (x._1, x._2.filter(_._2.isDefined))).map(x => {
        val _max = x._2.map(_._2.get).max
        val _min = x._2.map(_._2.get).min
        (x._1, (_max, _min)) } ).
      map(x => {
        val newProps = new BasicBSONObject()
        newProps.append("stats.max_wind", x._2._1)
        newProps.append("stats.min_wind", x._2._2)
        val query = new BasicBSONObject().append("hist_id", new ObjectId(x._1))
        val update = new BasicBSONObject().append("$set", newProps)
        (null, new MongoUpdateWritable(query, update, false, false))
      })

    saveToMongo(update_minmaxwind, outputConfig)
  
  }

  def main(args : Array[String]) {
    println(">>>>> Starting...")
    readConfig
    val conf = new SparkConf().setAppName("SysDist")
    sc = new SparkContext(conf)

    var inputURI = String.format(baseURLFormat, hosts.reduce(_ +","+ _), inputDB, inputColl, replicaSetName)
    var outputURI = String.format(baseURLFormat, hosts.reduce(_ +","+ _), outputDB, outputColl, replicaSetName)

    if (args.length > 0) {
      readPref = args(0)
    }

    MongoConfigUtil.setOutputURI(outputConfig, outputURI)
    MongoConfigUtil.setInputURI(inputConfig, getURL(hosts, inputDB, inputColl, replicaSetName, readPref))
    
    val docs = sc.newAPIHadoopRDD(
      inputConfig,
      classOf[MongoInputFormat],
      classOf[Object],
      classOf[BSONObject]
    )

    println(">>>>> There are " + docs.count.toString + " documents in the base")

    println(">>>>> Fixing database's FKs...")
    fixFK
    println(">>>>> Fixed :)")

    println("Calculating temperature records...")
    calc_minmax_temp
    println("Finished...")


    println(">>>>> Calculating avg temp last 5 days")
    calc_avg_temp_last5d
    println(">>>>> Calculations finished")
    
        println(">>>>> Calculate rain records...")
    calc_minmax_rain
    println(">>>>> Finished...")
    
    println(">>>>> Calculate wind records...")
    calc_minmax_wind
    println(">>>>> Finished...")

    println(">>>>> Calculate wind avgs...")
    calc_avg_wind_5d
    println(">>>>> Finished...")

    //println(">>>>> Result : " + (sc.parallelize(List.range(1,10000)).sum).toString)

  }
}
