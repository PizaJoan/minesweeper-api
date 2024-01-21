FROM mysql:latest


ENV MYSQL_DATABASE=minesweeper
ENV MYSQL_USER=jpizaf
ENV MYSQL_PASSWORD=pas123
ENV MYSQL_ALLOW_EMPTY_PASSWORD=true

ADD db/init.sql /docker-entrypoint-initdb.d

EXPOSE 3306
