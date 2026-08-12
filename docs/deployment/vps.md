# VPS Deployment

## Requirements

- Docker Engine
- Docker Compose plugin
- DNS pointing to the VPS
- `.env` created from `.env.example`

Use `DOCKER_DATABASE_URL` for the app container database connection. The
default value points to the Compose `db` service.

## First Deploy

```bash
docker compose pull
docker compose build
docker compose up -d
docker compose ps
```

## Backup

```bash
BACKUP_DIR=./backups ./docker/scripts/backup-postgres.sh
```

## Rollback

Redeploy the previous image or Git revision, then run `docker compose up -d --build`.
