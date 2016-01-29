echo "Correcting coordinates..."

find . -name "*.json" -print0 | parallel -0 python correct_coords.py "{}"

echo "Add historical data..."
./add_historical.sh

echo "Add forecast data..."
./add_forecast.sh

echo "Done!"
