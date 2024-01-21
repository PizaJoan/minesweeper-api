## FOR DB

1 build image

docker rm -f $(docker ps -aq --filter ancestor=minesweeper:db) && \
 docker rmi -f minesweeper:db && \
 docker build -t minesweeper:db -f "docker/db.dockerfile" .

2 run container

docker run -d -p 3306:3306 \
 -v minesweeper-db:/db \
 minesweeper:db
