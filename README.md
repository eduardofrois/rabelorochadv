# rabelorochadv

Modern institutional website for Rabelo & Rocha Advogados.

## Development

```bash
npm install
cp .env.example .env
docker compose up -d db
npm run dev
```

## Verification

```bash
npm run verify
npm run build
docker compose config
```

## GitNexus

```bash
npx gitnexus analyze
```

## Local Operations

Create `.env` from `.env.example`, then start the local stack:

```bash
docker compose up -d --build
```

`DATABASE_URL` is meant for host-side tooling. The app container receives
`DOCKER_DATABASE_URL`, which points to the Compose `db` service.

Run a database backup:

```bash
BACKUP_DIR=./backups ./docker/scripts/backup-postgres.sh
```
