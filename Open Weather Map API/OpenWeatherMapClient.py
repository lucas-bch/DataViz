# -*- coding: utf-8 -*-

import sys
import os
import json, urllib2, requests
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
		dayAndHour = data["list"][0][u'dt_txt']
		name = data[u'city'][u'name'].replace('/','')
		lat = str(data[u'city'][u'coord'][u'lat'])
		lon = str(data[u'city'][u'coord'][u'lon'])
		fileName = prefix+ "=" + "_".join([name,lon,lat,dayAndHour])
		#writing the file
		if not os.path.exists('data/'):
    			os.makedirs('data/')
		with open("data/"+fileName,'w') as jsonFile:
			json.dump(data,jsonFile)

def tester():
	owmc = OpenWeatherMapClient()
	cityId = findCityId("Grenoble", str(5.7266), str(45.187199))
	owmc.fiveDayForecast(cityId)

if __name__ == '__main__':
	tester()
