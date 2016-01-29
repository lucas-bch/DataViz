This is the project that generates the Spark script that runs on the database.
It adds the foreign keys to the `forecast` collection, in the `hist_id` field
of each document.

To compile it run

```bash
sbt package
```

The resulting .jar will be located in `./target/scala-2.10/`.

This folder also has a symbolic link to said .jar in the top level, called
sysdist.jar, and it can be used to call the submit\_jar.sh script, that sends
the job to Spark.

The submit\_jar.sh needs all the .jars that are in ./lib to run properly, and
the `spark-submit` executable needs to be referenced in the `$SPARK_SUBMIT`
variable.

The database parameters such as the hosts of the replica set and the replica
set's name itself can be configured in `config.json`.
