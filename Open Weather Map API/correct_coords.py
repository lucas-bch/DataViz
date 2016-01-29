import json
from sys import argv

file_name = argv[1]

with open(file_name, "r+") as f:
	data = json.load(f)
	data["city"]["coord"] = [ data["city"]["coord"]["lon"], data["city"]["coord"]["lat"] ]
	f.seek(0)
	json.dump(data, f, indent=4)
