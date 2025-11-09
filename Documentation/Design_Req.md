# WordSense – Webanwendung für Vokabeltraining
## (alles hier kommt von ChatGPT und wurde noch nicht bearbeitet/geprüft)
## Idee
- Web App für Sprachenlernen
- Fokus auf Vokabeln (komplett innerhalb der Sprache, die man lernt)
- Fokus auf mobile Ansicht
- In erster Linie für Englisch, evtl. erweiterbar auf andere Sprachen (Japanisch wäre cool)
- Grammatik evtl. zum Nachlesen

---

## Prinzip

### Main-Game
- Beschreibung:
  - Vokabel und Definition bilden ein Paar
  - Ein Teil des Paars wird gegeben, das andere wird gesucht
  - **Modus 1**: Definition gegeben, Wort auswählen oder schreiben
  - **Modus 2**: Wort gegeben, Definition auswählen
- Funktionen:
  - Vokabel schreiben (mit Rechtschreibfehlererkennung)
  - Wort im Satz anzeigen (togglebar)
  - Anzeigen der Definitionen falscher Wörter
  - Synonyme finden
  - Schwierigkeit anpassbar (A1–C2)
  - Aussprache abhörbar
  - Weitere Informationen zum Wort (Formalität, Wortart, …)

---

## Erweiterte Funktionsideen

### 1️⃣ Lern- und Spielmodi
- Cloze-Tests (Lückentexte)
- Multiple Choice mit ähnlichen Distraktoren
- Audio-zu-Text Übungen
- Reverse-Learning (fortgeschrittene Wörter zuerst)
- Memory-Spiel (Matching)
- Quiz-Kategorien nach Themen

### 2️⃣ Lernunterstützende Funktionen
- Rechtschreib- und Tippfehlererkennung
- Wortfamilien & Ableitungen
- Grammatikhinweise (Konjugationen, Pluralformen, Präpositionen)
- Wortart / Part-of-Speech
- Kontext-Sätze aus echten Quellen

### 3️⃣ Personalisierung & Anpassung
- Custom Vocabulary Sets
- Tägliches Lernziel
- Adaptive Schwierigkeit
- Favoritenliste / Wörter merken

### 4️⃣ Gamification & Motivation
- Punkte & Level-System
- Streaks / Tages-Challenges
- Badges & Achievements
- Leaderboards / Freundes-Challenges

### 5️⃣ Audio & Multimedia
- Aussprache abspielbar (verschiedene Akzente)
- Video-Beispiele
- Spracherkennung (Nutzer spricht Wort)

### 6️⃣ Analyse & Fortschritt
- Statistiken (richtig/falsch pro Wort, Lernzeit, Wiederholungsbedarf)
- Heatmaps / Fortschrittsdiagramme
- Vergleich von Lernsessions

---

## Design / UI & UX

### Needs (unbedingt nötig)
- Responsive Design / Mobile-first
- Einfache Navigation
- Minimalistisches Layout
- Lesbarkeit & Kontrast
- Schnelles Feedback auf Antworten

### Wants (wünschenswert)
- Effekte bei richtiger/falscher Antwort
- Progress Bar / Session-Fortschritt
- Tooltips / Pop-ups für Zusatzinformationen
- Einstellbare Ansicht (Satz ein-/ausblenden, Multiple Choice vs. Schreiben)
- Themen / Farbschema wählbar

### Nice-to-have (optional)
- Dark Mode / Light Mode
- Motivierende Elemente
- Drag & Drop Spielelemente
- Gamification Dashboard
- Adaptive Layouts

### UX-Feinheiten
- Schnelle Wiederholung falsch beantworteter Wörter
- Interruptions vermeiden
- Feedback auf Mikrointeraktionen (z. B. Button-Animationen)
- Zugänglichkeit (Screenreader, Tastaturbedienung)
