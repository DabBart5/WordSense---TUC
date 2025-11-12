# WordSense (Temp)
## Idee
- Web App für Sprachenlernen
- Fokus auf Vokabeln (komplett innerhalb der Sprache die man lernt)
- evtl. Fokus auf Mobile Ansicht
- In erster Linie für Englisch, evtl. erweiterbar für andere Sprachen 
- Grammatik evtl. zum Nachlesen (auch in Englisch)
- evtl. (in passenden Aspekten) ähnlich zu [Kotoba Taisen](https://kotobataisen.com/) oder [Bunpro](https://bunpro.jp/)

## Offene Fragen
1. Sollte man einen Account brauchen? (fänd ich blöd)
  	- Mit Datenverwaltung für jeden Nutzer neue Möglichkeiten (Gamification (Daily Streaks, Rewards), Wortlisten, ...)
  	- Alternativ irgendwie über Cookies
2. Ist das Projekt von einem vorherigem Studenten benutzbar?
3. Gibt es DataSets die meinen Ansprüchen entsprechen?
   - Cambrigde Dictionary hat eine API, kostet aber
4. Sollte ich mich mehr auf das Main-Game beschränken? -> Konsultation
	- Einfach nur eine schlichte Nice App um kurz Vokabeln zu üben 
5. 	

## Prinzip
-Main-Game:
  - Vokabel und Definition bilden ein Paar
  - Ein Teil des Paars wird gegeben, das andere wird gesucht
	- Modus 1:
        - Die Definition eines Wortes ist gegeben
        - Es werden 4 verschiedene Wörter vorgeschlagen (ich denke 4 ist ne ganz gute Zahl, bei zu vielen Optionen braucht man zu lange um sich die alle durchzulesen)
        - Es ist das Wort zu wählen was am ehesten zu der Definiton passt
        - Weiteres: zusätzliche Funtionen: i., ii, ...
   	- Modus 2:
      	- Ein Wort ist gegeben
     	- Die Definition ist gesucht
    	- Es sind 4 Defintionen gegeben 
       	- Es ist die Definition zu wählen die am ehesten zu dem Wort passt
    	- 
- Grammar:
  	-  orientiert an Bunpro (grammatik zum nachlesen, hier vlt. noch ein paar Übungsaufgaben dazu)
  	-  Grammatikregeln nach "Schwierigkeit" (CEFR) sortiert
  	-  Einzelne Grammatikregeln auswählbar um mehr Informationen über diese lesen zu können
  		- beinhaltet Erklärung (Nutzung, Bedeutung) auf Englisch, Beipielsätze
  		- Übungsaufgabe(n), Satz gegeben mit Lücke sowie Anforderungen (Grammatik), -> Freitextfeld in dem das Wort einzugeben ist, -> überprüfen, ob richtig (evtl. hinweise wenn falsch) 
  	- Für ein SRS (Spaced Repetition System) sind Accounts ziemlich notwendig, also vielleicht nicht?
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
         	- Rechtschreibfehlererkennung
    		- Vokabel evtl. in Satz gegeben (togglebar)
    3. Modus 2:
    	- ...
    4. Anzeigen der Definitionen der falschen Wörter
    5. Synonyme finden (?) (evtl. nur synonyme angezeigt bekommen, um nuancen zu lernen)
    6. Schwierigkeit solle anpassbar sein (A1, A2, B1. B2, C1, C2) (Cambrigde dictionary hat glaube ich einschätzungen dazu)
      	- Auswahl von Wörtern könnten sehr ähnlich (synonyme) sein um Nuancen zu lernen
    7. Aussprache sollte abhörbar sein (zumindest mit angegeben werden, phonetisches alphabet)
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
# Open-Source Material
- [dictionaryapi](https://dictionaryapi.dev/)
- Wiktionary, ([kaikki](https://kaikki.org/dictionary/English/) scheint das maschinenlesbar zu haben, über wiktionary selbst auf ersten blick schwieriger)
- [librelingo](https://librelingo.app/)

---
# Frontend
## Framework Wahl
Die Liste stellt eine Rangliste dar, je weiter oben, desto lieber würde ich damit arbeiten (ich kann nicht sagen, dass ich alle ausgiebig getestet habe, das Meiste wird sich beim arbeiten damit herausstellen)
1. svelte (sveltekit?) (soll sehr schön sein, sah auch recht angenehm aus)
2. Alpine (auf ersten Blick leichter einstieg)
3. Vue (soll ganz gut sein, ...)
4. Angular (oft benutzt, leichterer Einstieg als bei React)

# Backend
## Framework (falls benötigt)
keine Rangliste (nicht wirklich, noch nicht genug damit beschäftigt)
1. Django (arbeite im Softwarepraktikum vielleicht damit)
2. Node.js 

---
## Requirements
### Functional Requirements

### Non Functional Requirements

---
#What you should think about

- wenn du ressourcen von anderen benutzt, schreib die dir irgendwo auf und pack die am ende auf irgende seite im fertigen produkt
