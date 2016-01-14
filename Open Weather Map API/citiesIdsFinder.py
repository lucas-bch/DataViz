# -*- coding: utf-8 -*-

import sys
import json

CITIES_ID = dict()
duplicationControl = 0

def jsonReader():  
	global duplicationControl
	with open('city.list.json') as json_data:
		for line in json_data:
			data = json.loads(line)
			try:
				alreadyInDict = CITIES_ID[data["name"] + "_" + str(data["coord"]["lon"])+"x"+str(data["coord"]["lat"])]
				if alreadyInDict:
					duplicationControl += 1
			except KeyError:
				CITIES_ID[data["name"] + "_" + str(data["coord"]["lon"])+"x"+str(data["coord"]["lat"])] = data["_id"]

def findCityId(cityName,lon,lat):
	jsonReader()
	try:
		return CITIES_ID[cityName+"_"+lon+"x"+lat]
	except KeyError:
		print "Invalid information, city not found"
		sys.exit(1)

def getCitiesIds():
	if not bool(CITIES_ID):
		jsonReader()
	return CITIES_ID.values()

def getCitiesIdsByCountry(country):
	Ids = []
	with open('city.list.json') as json_data:
		for line in json_data:
			data = json.loads(line)
			if data["country"] == country:
				Ids.append(data["_id"])
	return Ids

def main(cityName,lon,lat):
	print "CITY ID: " + str(findCityId(cityName,lon,lat))

def tester():
	jsonReader()
	c_id = CITIES_ID["London_-0.12574x51.50853"]
	c_id2 = CITIES_ID["Tyuzler_34.083332x44.466667"]
	c_id3 = CITIES_ID["Murava_23.966669x54.916672"] 
	print 'Testing Ids'
	print c_id, c_id2, c_id3
	if c_id == 2643743 and c_id2 == 690856 and c_id3 == 596826:
		print "Ids Check!"
	print "Testing loss of information"
	if len(CITIES_ID.keys()) == (209579 - duplicationControl):
		print "Loss of information check!"
		print "Duplication: " + str(duplicationControl)
	else:
		print 209579 - len(CITIES_ID.keys())

if __name__ == '__main__':
	if len(sys.argv) > 1 and sys.argv[1] == "--test":
		print "Running Tester"
		tester()
	elif len(sys.argv) < 4:
		print "You should call the program with the city longitude and latitude that you want to search"
		print "Example: python citiesIdsFinder.py Murava 23.966669 54.916672"
		print "Or python citiesIdsFinder.py --test to run a consistency test"
	else:
		main(sys.argv[1],sys.argv[2],sys.argv[3])