# WordSense---TUC
WordSense is a WebApp I am developing as part of a University Project. 


How to start:
should work like this on windows at least

Git-Clone

    git clone https://github.com/DabBart5/WordSense---TUC
    cd WordSense---TUC/WordSense/TestProjekt
    cp .enc.example .env

initialize db
start docker
you need two terminals:
Terminal 1:

    docker compose build
    docker compose up db
    cat backup.sql | docker exec -i my_postgres psql -U your_username -d your_database
    #docker exec -i WordSense-db psql -U devuser -d dictionary_game < ./backup.sql #this should work too, havent checked tho

stop the process (str + c)

    docker compose up
