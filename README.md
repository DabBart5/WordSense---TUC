# WordSense---TUC
WordSense is a WebApp I am developing as part of a University Project. 


How to start:
should work like this on windows at least
you need git and docker at the very least, maybe more

# Clone the Project
In the Terminal:

    git clone https://github.com/DabBart5/WordSense---TUC
    cd WordSense---TUC/WordSense/TestProjekt
    cp .enc.example .env

Feel free to edit the env with your data

---

# initialize db
start docker

Terminal:

    docker compose build
    docker compose up db
    cat backup.sql | docker exec -i my_postgres psql -U your_username -d your_database

instead of the last line you can also try (didnt work for me though, because of the "<"):

    docker exec -i WordSense-db psql -U devuser -d dictionary_game < ./backup.sql

when this finished, stop the process (str + c)

---

# Compose Up

    docker compose up

---

there may be a warning that should only run when starting for the first time
Done
