Orden de ejecución:

-- Docker

1. Ejecutar: docker compose --profile dev up
2. Para apagar ejecutar: docker rm -f $(docker ps -aq) && docker network prune -f