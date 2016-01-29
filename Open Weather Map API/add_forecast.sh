find . -name "five*.json" -print0 | parallel -0 mongoimport --db weather_db --port 27018 --collection forecast "{}"

