# -*- coding: utf-8 -*-

import sys
import subprocess
import time
from random import randint
from OpenWeatherMapClient import OpenWeatherMapClient
from citiesIdsFinder import getCitiesIds, getCitiesIdsByCountry

def generateIdFile():
	IdList = getCitiesIds()
	for i in xrange(1,6):
		with open("cityIDs"+str(i),'w') as idFile:
			for j in xrange(0,41273):
				if not IdList:
					break
				else:
					idFile.write(str(IdList[0])+ "\n")
					del IdList[0]

def runAll():
	weekDay = subprocess.check_output("date \'+%u\'", shell=True)
	weekDay = weekDay.strip('\n')
	if weekDay == '6' or weekDay == '7':
		weekDay == randint(1,5)
	with open("cityIDs"+weekDay) as idFile:
		numberPerMinute = 0
		for line in idFile:
			if numberPerMinute == 55:
				time.sleep(60)
				numberPerMinute = 0
			cityId = line.strip('\n')
			owmc = OpenWeatherMapClient()
			owmc.fiveDayForecast(cityId)
			numberPerMinute+=1

def runCountry(country):
	numberPerMinute = 0
	countryIdsList = getCitiesIdsByCountry(country)
	owmc = OpenWeatherMapClient()
	for cityId in countryIdsList:
		if numberPerMinute == 55:
				time.sleep(60)
				numberPerMinute = 0
		owmc.fiveDayForecast(cityId)
		numberPerMinute+=1

def help():
	print "--gen:  Generates the ids files to execute the script using all the available cities"
	print "--all:  To run the script using ALL OpenWeatherMap cities"
	print "-- contry <COUNTRY INITIALS>:  To execute the script using only a selected country"


if __name__ == '__main__':
	if len(sys.argv) > 1 and sys.argv[1] == '--gen':
		generateIdFile()
	elif len(sys.argv) > 1 and sys.argv[1] == '--all':
		try:
			runAll()
		except Exception:
			print "Error: Please remember to generate the ids files before running the script in this mode"
			help()
	elif len(sys.argv) > 1 and sys.argv[1] == '--country':
		try:
			country = sys.argv[2]
			runCountry(country)
		except Exception:
			print "Error: Invalid country or format"
			help()

	else:
		help()