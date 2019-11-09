curl -sd @signal.json -H "Content-Type: application/json" http://localhost:27301/api/1.0/signals | jq .
curl -sX DELETE http://localhost:27301/api/1.0/signals/-570 | jq .
