#!/usr/bin/env sh
set -eu

BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
POSTGRES_DB="${POSTGRES_DB:-rabelorochadv}"
POSTGRES_USER="${POSTGRES_USER:-rabelo}"
mkdir -p "$BACKUP_DIR"

docker compose exec -T db pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" > "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
printf 'Backup written to %s\n' "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
