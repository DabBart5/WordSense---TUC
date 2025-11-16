# Data Dictionary
## Word for Dictionary 


| Name         | type     | Description                           | 
|--------------|----------|---------------------------------------|
| id           | int      | An Identifier                         |
| lang         | enum     | The language of the word              |
| voc          | string   | the word itself                       |
| gender       | enum     | gender of word in gendered language   |
| pronunciation| string   | phontic alphabet                      |
| Definition   | [string]   | Defintion of the word               |
| synonym      | [string] | synonyms                              |
| exSentence   | [string] | A sentence in which the word is used  | 
| wordType     | enum     | noun, verb, adjective ...             |
| difficulty   | enum     | A1, ..., C2                           |  
| notes        | String   | Additional notes                      |  
