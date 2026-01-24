import json
import os

print(os.listdir())

with open("./db/A1.Json", "r", encoding='utf-8') as file:
    data= json.load(file)

for entry in data:
    entry["word"] = entry["word"].lower()
    entry["exSentence"] = entry["exSsentence"]
    

with open("db/C2Lower.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

file.close()