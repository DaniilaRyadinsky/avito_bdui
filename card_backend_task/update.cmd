@REM docker exec -i carddb pg_dump carddb > dump.sql -U postgres
echo off
docker-compose down -v
docker load -i card.tar

docker-compose up -d
timeout /t 15
docker exec -i carddb psql carddb<dump.sql -U postgres
echo "all updates compiled"