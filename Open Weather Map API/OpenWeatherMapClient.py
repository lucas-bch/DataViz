# -*- coding: utf-8 -*-

import sys
import os
import json, urllib2, requests
from pprint import pprint
from citiesIdsFinder import findCityId

class OpenWeatherMapClient():
	def __init__(self):
		self.app_id = 'c985cd184e28ef1ccfdd4d0e6257bfb5'

	def currentWeatherData(self,cityId):
		requestInfo = "http://api.openweathermap.org/data/2.5/forecast?id=" + str(cityId) + "&appid=" + self.app_id
		try:
			data = self.makeARequest(requestInfo)
			self.generateNewJson(data, "currentWeather")
		except Exception as ex:
			print ex.args

	def fiveDayForecast(self,cityId):
		requestInfo = "http://api.openweathermap.org/data/2.5/forecast?id=" + str(cityId) + "&appid=" + self.app_id
		try:
			data = self.makeARequest(requestInfo)
			self.generateNewJson(data, "fiveDayForecast")
		except Exception as ex:
			print requestInfo
			print ex.args

	def makeARequest(self, requestInfo):
		try:
			request = requests.get(requestInfo)
			return request.json()
		except ValueError:
			print 'Problem Requesting:'
			print requestInfo
			raise Exception("Invalid Request")

	def generateNewJson(self, data, prefix):
		#building the file name
		dayAndHour = data["list"][0][u'dt_txt'].split(" ")[0]
		name = data[u'city'][u'name'].replace('/','')
		lat = str(data[u'city'][u'coord'][u'lat'])
		lon = str(data[u'city'][u'coord'][u'lon'])
		fileName = prefix+ "=" + "_".join([name,lon,lat]) + ".json"
		#making sure that the directory exists
		if not os.path.exists('data/'):
				os.makedirs('data/')

		#getting the current day forecast to put in the historical file
		forecast_list = data["list"]
		hist_list = []
		for forecast in forecast_list:
			if forecast[u'dt_txt'].split(' ')[0] == dayAndHour:
				hist_list.append(forecast)

		#appending in the historical data
		hist_data = None
		try:
			with open("data/historical_"+fileName,'r') as jsonFile:
				hist_data = json.load(jsonFile)
				h = hist_data[u'list'] 
				for element in h:
					hist_list.append(element)
		except IOError:
			pass
		except Exception as e:
			print fileName
			print e.args
		finally:
			with open("data/historical_"+fileName,'w') as jsonFile:
				if hist_data == None:
					hist_data = data.copy()
				hist_data[u'list'] = hist_list
				json.dump(hist_data,jsonFile)

		with open("data/"+fileName,'w') as jsonFile:
			json.dump(data,jsonFile)

def tester():
	owmc = OpenWeatherMapClient()
	cityId = findCityId("Grenoble", str(5.7266), str(45.187199))
	owmc.fiveDayForecast(cityId)

if __name__ == '__main__':
	tester()
