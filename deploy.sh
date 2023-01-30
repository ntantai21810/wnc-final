#!/bin/bash
rm -rf docker-compose.yaml
wget https://raw.githubusercontent.com/ntantai21810/wnc-final/master/docker-compose.yaml
docker compose stop
docker compose rm -f
docker compose pull
docker compose run wnc-fe
docker image prune -a -f