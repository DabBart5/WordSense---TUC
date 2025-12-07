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

    docker exec -i WordSense-db psql -U devuser -d dictionary_game < ./backup.sql #havent checked this yet
