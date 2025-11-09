# WordSense (Temp)
## Idee
- Web App für Sprachenlernen
- Fokus auf Vokabeln (komplett innerhalb der Sprache die man lernt)
- evtl. Fokus auf Mobile Ansicht
- In erster Linie für Englisch, evtl. erweiterbar für andere Sprachen (Japanisch wäre cool (für mich selbst))
- Grammatik evtl. zum Nachlesen (auch in Englisch)
- evtl. ähnlich zu [Kotoba Taisen](https://kotobataisen.com/)

## Offene Fragen
1. Sollte man einen Account brauchen? (fänd ich blöd)
  	- Mit Datenverwaltung für jeden Nutzer neue Möglichkeiten (Gamification (Daily Streaks, Rewards), Wortlisten, ...)
  	- Alternativ irgendwie über Cookies
2. Ist das Projekt von einem vorherigem Studenten benutzbar?
3. Gibt es DataSets die meinen Ansprüchen entsprechen?
   - Cambrigde Dictionary hat eine API, kostet aber
4. Sollte ich mich (fast nur) auf das Main-Game beschränken?
	- Einfach nur eine schlichte Nice App um kurz Vokabeln zu üben
5. 	

## Prinzip
-Main-Game:
  - Beschreibung:
      - Vokabel und Definition bilden ein Paar
      - Ein Teil des Paars wird gegeben, das andere wird gesucht
		- Modus 1:
            - Die Definition eines Wortes ist gegeben
            - Es werden X verschiedene Wörter vorgeschlagen (10 > X > 4, customizable)
            - Es ist das Wort zu wählen was am ehesten zu der Definiton passt
            - Weiteres: zusätzliche Funtionen: i., ii, ...
    	- Modus 2:
        	- Ein Wort ist gegeben
           	- Die Definition ist gesucht
           	- Es sind X Defintionen gegeben (10 > X > 4, customizable)
           	- Es ist die Definition zu wählen die am ehesten zu dem Wort passt
    	- 
           	
  ---
  - Zusätzliche Funktionen:
    1. Main Game (beide Modi)
    	- Timer-Mode (Zeitspanne customizable)
    	- Endless-Mode
    	- Normal Mode (X Fragen hintereinander, X customizable (standard 10 oder 20 oder so?))
    	- ein I dont know button wäre vielleicht auch nicht schlecht (für statistiken, gegen raten)
    	- mehr einschränkungen der Wörter die Vorkommen (Adjektive, Substantive, vlt. auch Städte, etc. was einem so einfällt)
    2. Modus 1: 
       - Als Alternative in Modus 1: es sollte möglich sein das Wort zu schreiben
         	- Als Alternative in Modus 1: es sollte möglich sein das Wort zu schreiben
         	  	- Rechtschreibfehlererkennung
    		- Vokabel evtl. in Satz gegeben (togglebar)
    3. Modus 2:
    	- ...
    4. Anzeigen der Definitionen der falschen Wörter
    5. Synonyme finden
    6. Schwierigkeit solle anpassbar sein (A1, A2, B1. B2, C1, C2) (Cambrigde dictionary hat glaube ich einschätzungen dazu)
      	- Auswahl von Wörtern könnten sehr ähnlich (synonyme) sein um Nuancen zu lernen
    7. Aussprache sollte abhörbar sein
    8. Es sollten weitere Informationen über das Wort angezeigt werden (Formalität, Synonyme/Antonyme, Phonetische Schreibweise ... (sprachspezifisches))
    9. Eigene Wortlisten erstellen oder hochladen
    10. Wörter markieren (einfügen in eine Wortliste, Zugriff auf diese aus Menü)
    11. Wörter exportieren nach Anki, oder ähnliches
    12. Merken welche Wörter schwerfallen, evtl. sammeln in liste (revision später möglich)
    13. Statistiken am Ende von Lesson

---

# Design:
  - Needs:
    - Interface in Deutsch oder Englisch
    - 
  - Wants:
    	-Gamification
    		- Exp (maybe), Rewards für Level-up (App sollte von start an komplett benutzbar sein, sprich: nichts wichtiges locked hinter level)
    		- Tägliches Ziel/ Daily Quests
    		-
    	- Effekte wenn richtige Antwort abgeschickt (nicht nervig, nicht lang, nicht blockierend, ...)
  - Nice to Have:
		
---
#Open-Source Material
- [dictionaryapi](https://dictionaryapi.dev/)
- Wiktionary, ([kaikki](https://kaikki.org/dictionary/English/) scheint das maschinenlesbar zu haben, über wiktionary selbst auf ersten blick schwieriger)
- [librelingo](https://librelingo.app/)
	
## Requirements
### Functional Requirements

### Non Functional Requirements
