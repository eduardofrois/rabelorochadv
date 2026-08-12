# rabelorochadv

Modernizacao do site institucional da Rabelo & Rocha Advogados em Next.js,
TypeScript, PostgreSQL e Docker.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run verify
npm run build
docker compose config
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
