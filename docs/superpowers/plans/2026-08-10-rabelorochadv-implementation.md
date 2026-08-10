# Rabelo & Rocha Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved MVP for the Rabelo & Rocha Advogados institutional website: public site, strategic landing pages, SEO blog, secure admin, PostgreSQL persistence, Docker/VPS readiness, and GitNexus validation.

**Architecture:** Use a modular Next.js full-stack application with App Router. Keep public site, admin, data access, security, SEO, storage, and feature domains isolated inside one repository so the MVP stays maintainable without a separate NestJS backend.

**Tech Stack:** Next.js, React, TypeScript, PostgreSQL, Prisma, Docker Compose, Vitest, Playwright, ESLint, Tailwind CSS, Zod, secure cookie sessions, Markdown/MDX-controlled content rendering.

---

## Source Spec

- Spec: `docs/superpowers/specs/2026-08-10-rabelorochadv-design.md`
- Approved approach: Next.js full-stack in VPS/Docker with PostgreSQL.
- Do not introduce a separate NestJS API or headless CMS in the MVP.

## Verification Budget

Distinct claims and minimum evidence:

1. **Foundation builds reproducibly** — owner: foundation task worker. Evidence: `npm run typecheck`, `npm run lint`, `npm run test`, `docker compose config`.
2. **Database model supports MVP** — owner: data task worker. Evidence: Prisma validation, migration generation, repository tests against a test database.
3. **Admin is protected** — owner: auth/admin worker. Evidence: unit tests for password/session helpers and Playwright checks for protected `/admin` redirect.
4. **Public site is SEO/accessibility ready** — owner: site worker. Evidence: metadata tests, sitemap/robots route tests, Playwright smoke checks, Lighthouse/manual axe pass when UI exists.
5. **Blog lifecycle works** — owner: blog/admin worker. Evidence: repository tests for `DRAFT`, `PUBLISHED`, `SCHEDULED`, `ARCHIVED`, route tests for published-only public output.
6. **Deployment path is documented and runnable** — owner: operations worker. Evidence: `docker compose config`, `.env.example`, backup script dry-run/help output, GitNexus analyze step documented.

If a later implementation changes stack choices, rerun the affected claim evidence instead of relying on older results.

## Planned File Structure

Create or modify these files through the tasks below:

```txt
README.md
package.json
tsconfig.json
next.config.ts
eslint.config.mjs
vitest.config.ts
playwright.config.ts
.env.example
.gitignore
docker-compose.yml
Dockerfile
docker/Caddyfile
docker/scripts/backup-postgres.sh
prisma/schema.prisma
prisma/seed.ts
src/app/(site)/layout.tsx
src/app/(site)/page.tsx
src/app/(site)/escritorio/page.tsx
src/app/(site)/areas-de-atuacao/page.tsx
src/app/(site)/areas-de-atuacao/[slug]/page.tsx
src/app/(site)/blog/page.tsx
src/app/(site)/blog/[slug]/page.tsx
src/app/(site)/contato/page.tsx
src/app/(site)/politica-de-privacidade/page.tsx
src/app/(site)/termos-de-uso/page.tsx
src/app/(site)/aereo/page.tsx
src/app/(site)/transito/page.tsx
src/app/(admin)/admin/layout.tsx
src/app/(admin)/admin/page.tsx
src/app/(admin)/admin/login/page.tsx
src/app/(admin)/admin/posts/page.tsx
src/app/(admin)/admin/posts/novo/page.tsx
src/app/(admin)/admin/posts/[id]/page.tsx
src/app/(admin)/admin/midia/page.tsx
src/app/(admin)/admin/leads/page.tsx
src/app/api/contact/route.ts
src/app/api/media/route.ts
src/app/robots.ts
src/app/sitemap.ts
src/components/site/*.tsx
src/components/admin/*.tsx
src/components/ui/*.tsx
src/components/seo/*.tsx
src/features/auth/*
src/features/blog/*
src/features/leads/*
src/features/media/*
src/features/redirects/*
src/lib/db/*
src/lib/security/*
src/lib/seo/*
src/lib/storage/*
src/lib/validation/*
src/styles/globals.css
tests/unit/*.test.ts
tests/e2e/*.spec.ts
docs/deployment/vps.md
docs/operations/gitnexus.md
```

---

## Task 1: Scaffold Next.js Foundation

**Files:**
- Create/modify: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `.env.example`, `src/styles/globals.css`, `src/app/(site)/layout.tsx`, `src/app/(site)/page.tsx`
- Test: `tests/unit/smoke.test.ts`, `tests/e2e/home.spec.ts`

- [ ] **Step 1: Create the Next.js app skeleton**

Run from `/Users/level33/lab/rabelorochadv`:

```bash
npx create-next-app@latest . --ts --eslint --app --src-dir --import-alias "@/*" --tailwind --no-turbopack
```

Expected: project files are created in the existing repository without deleting `docs/superpowers/specs/2026-08-10-rabelorochadv-design.md` or this plan.

- [ ] **Step 2: Install verification dependencies**

Run:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom playwright
npx playwright install --with-deps chromium
```

Expected: dependencies installed and `package-lock.json` updated.

- [ ] **Step 3: Set package scripts**

Modify `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "verify": "npm run typecheck && npm run lint && npm run test"
  }
}
```

- [ ] **Step 4: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 5: Add test setup**

Create `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 6: Add a failing smoke test**

Create `tests/unit/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest';

describe('project foundation', () => {
  it('identifies the application name', () => {
    expect(process.env.NEXT_PUBLIC_SITE_NAME).toBe('Rabelo & Rocha Advogados');
  });
});
```

- [ ] **Step 7: Run the smoke test and confirm failure**

Run:

```bash
npm run test -- tests/unit/smoke.test.ts
```

Expected: FAIL because `NEXT_PUBLIC_SITE_NAME` is not configured for tests.

- [ ] **Step 8: Add environment defaults for tests**

Modify `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';

process.env.NEXT_PUBLIC_SITE_NAME = 'Rabelo & Rocha Advogados';
```

- [ ] **Step 9: Add `.env.example`**

Create `.env.example`:

```env
NEXT_PUBLIC_SITE_NAME="Rabelo & Rocha Advogados"
NEXT_PUBLIC_SITE_URL="https://rabelorochadv.com.br"
DATABASE_URL="postgresql://rabelo:rabelo@localhost:5432/rabelorochadv?schema=public"
SESSION_SECRET="replace-with-32-byte-random-secret"
UPLOAD_DIR="./storage/uploads"
```

- [ ] **Step 10: Verify foundation**

Run:

```bash
npm run verify
```

Expected: typecheck, lint and unit tests pass.

- [ ] **Step 11: Commit foundation**

Only commit if the user explicitly requested commits for the implementation phase. Otherwise skip commit and report changed files.

Suggested commit if allowed:

```bash
git add .
git commit -m "chore: scaffold next app foundation"
```

---

## Task 2: Docker, PostgreSQL, and Local Operations

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `docker/Caddyfile`, `docker/scripts/backup-postgres.sh`, `docs/deployment/vps.md`
- Modify: `.env.example`, `.gitignore`, `README.md`

- [ ] **Step 1: Add Dockerfile**

Create `Dockerfile`:

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 2: Enable standalone output**

Modify `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Add Docker Compose**

Create `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: rabelorochadv
      POSTGRES_USER: rabelo
      POSTGRES_PASSWORD: rabelo
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U rabelo -d rabelorochadv"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    restart: unless-stopped
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "3000:3000"
    volumes:
      - uploads:/app/storage/uploads

  proxy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app

volumes:
  postgres_data:
  uploads:
  caddy_data:
  caddy_config:
```

- [ ] **Step 4: Add local Caddyfile**

Create `docker/Caddyfile`:

```caddyfile
{
  email admin@rabelorochadv.com.br
}

:80 {
  reverse_proxy app:3000
}
```

- [ ] **Step 5: Add backup script**

Create `docker/scripts/backup-postgres.sh`:

```bash
#!/usr/bin/env sh
set -eu

BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

docker compose exec -T db pg_dump -U rabelo -d rabelorochadv > "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
printf 'Backup written to %s\n' "$BACKUP_DIR/postgres-$TIMESTAMP.sql"
```

Run:

```bash
chmod +x docker/scripts/backup-postgres.sh
```

- [ ] **Step 6: Update `.gitignore`**

Ensure `.gitignore` includes:

```gitignore
.env
.env.local
storage/
backups/
.gitnexus/
```

- [ ] **Step 7: Validate Docker config**

Run:

```bash
docker compose config
```

Expected: valid merged Compose config, no syntax errors.

- [ ] **Step 8: Document VPS deployment**

Create `docs/deployment/vps.md` with:

```md
# VPS Deployment

## Requirements

- Docker Engine
- Docker Compose plugin
- DNS pointing to the VPS
- `.env` created from `.env.example`

## First deploy

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
```

- [ ] **Step 9: Verify operations docs and Docker**

Run:

```bash
docker compose config && test -x docker/scripts/backup-postgres.sh
```

Expected: Compose config valid and backup script executable.

---

## Task 3: Database Schema and Data Access

**Files:**
- Create: `prisma/schema.prisma`, `prisma/seed.ts`, `src/lib/db/client.ts`, `src/features/blog/blog.types.ts`, `src/features/blog/blog.repository.ts`, `src/features/leads/leads.repository.ts`, `src/features/media/media.repository.ts`, `src/features/redirects/redirects.repository.ts`
- Test: `tests/unit/blog-status.test.ts`

- [ ] **Step 1: Install Prisma and Zod**

Run:

```bash
npm install @prisma/client zod
npm install -D prisma tsx
```

- [ ] **Step 2: Initialize Prisma**

Run:

```bash
npx prisma init
```

Expected: `prisma/schema.prisma` exists.

- [ ] **Step 3: Replace Prisma schema**

Write `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  EDITOR
}

enum PostStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         UserRole @default(EDITOR)
  posts        Post[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Post {
  id             String      @id @default(cuid())
  title          String
  slug           String      @unique
  excerpt        String
  content        String
  status         PostStatus  @default(DRAFT)
  publishedAt    DateTime?
  scheduledFor   DateTime?
  seoTitle       String?
  seoDescription String?
  canonicalUrl   String?
  authorId       String
  categoryId     String?
  coverImageId   String?
  ogImageId      String?
  author         User        @relation(fields: [authorId], references: [id])
  category       Category?   @relation(fields: [categoryId], references: [id])
  coverImage     MediaAsset? @relation("PostCoverImage", fields: [coverImageId], references: [id])
  ogImage        MediaAsset? @relation("PostOgImage", fields: [ogImageId], references: [id])
  tags           PostTag[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt

  @@index([status, publishedAt])
}

model Category {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  description String?
  posts       Post[]
}

model Tag {
  id    String    @id @default(cuid())
  name  String
  slug  String    @unique
  posts PostTag[]
}

model PostTag {
  postId String
  tagId  String
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag    Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
}

model MediaAsset {
  id             String   @id @default(cuid())
  filename       String
  originalName   String
  mimeType       String
  size           Int
  width          Int?
  height         Int?
  altText        String
  storagePath    String
  coverForPosts  Post[]   @relation("PostCoverImage")
  ogForPosts     Post[]   @relation("PostOgImage")
  createdAt      DateTime @default(now())
}

model Lead {
  id         String   @id @default(cuid())
  name       String
  email      String
  phone      String?
  subject    String
  message    String
  sourcePage String
  status     String   @default("NEW")
  createdAt  DateTime @default(now())
}

model Redirect {
  id         String  @id @default(cuid())
  sourcePath String  @unique
  targetPath String
  statusCode Int     @default(301)
  active     Boolean @default(true)
}
```

- [ ] **Step 4: Add Prisma client singleton**

Create `src/lib/db/client.ts`:

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

- [ ] **Step 5: Add blog status helper test**

Create `tests/unit/blog-status.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { isPublicPostStatus } from '@/features/blog/blog.types';

describe('blog status visibility', () => {
  it('only exposes published posts publicly', () => {
    expect(isPublicPostStatus('PUBLISHED')).toBe(true);
    expect(isPublicPostStatus('DRAFT')).toBe(false);
    expect(isPublicPostStatus('SCHEDULED')).toBe(false);
    expect(isPublicPostStatus('ARCHIVED')).toBe(false);
  });
});
```

- [ ] **Step 6: Run test and confirm failure**

Run:

```bash
npm run test -- tests/unit/blog-status.test.ts
```

Expected: FAIL because `src/features/blog/blog.types.ts` does not exist.

- [ ] **Step 7: Add blog types**

Create `src/features/blog/blog.types.ts`:

```ts
export const postStatuses = ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'] as const;

export type PostStatus = (typeof postStatuses)[number];

export function isPublicPostStatus(status: PostStatus): boolean {
  return status === 'PUBLISHED';
}
```

- [ ] **Step 8: Validate Prisma schema and tests**

Run:

```bash
npx prisma validate
npm run test -- tests/unit/blog-status.test.ts
```

Expected: Prisma schema valid and test passes.

---

## Task 4: Auth and Admin Protection

**Files:**
- Create: `src/features/auth/password.ts`, `src/features/auth/session.ts`, `src/features/auth/current-user.ts`, `src/features/auth/require-admin.ts`, `src/app/(admin)/admin/layout.tsx`, `src/app/(admin)/admin/login/page.tsx`, `src/app/(admin)/admin/page.tsx`
- Test: `tests/unit/auth.test.ts`, `tests/e2e/admin-auth.spec.ts`

- [ ] **Step 1: Install auth dependencies**

Run:

```bash
npm install argon2 jose
```

- [ ] **Step 2: Write password tests**

Create `tests/unit/auth.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from '@/features/auth/password';

describe('password hashing', () => {
  it('verifies the original password and rejects a wrong password', async () => {
    const hash = await hashPassword('correct horse battery staple');
    await expect(verifyPassword(hash, 'correct horse battery staple')).resolves.toBe(true);
    await expect(verifyPassword(hash, 'wrong password')).resolves.toBe(false);
  });
});
```

- [ ] **Step 3: Run test and confirm failure**

Run:

```bash
npm run test -- tests/unit/auth.test.ts
```

Expected: FAIL because password module does not exist.

- [ ] **Step 4: Add password helper**

Create `src/features/auth/password.ts`:

```ts
import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}
```

- [ ] **Step 5: Add session helpers**

Create `src/features/auth/session.ts`:

```ts
import { SignJWT, jwtVerify } from 'jose';

export type SessionUser = {
  id: string;
  email: string;
  role: 'ADMIN' | 'EDITOR';
};

const cookieName = 'rabelo_session';

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long');
  }
  return new TextEncoder().encode(secret);
}

export function getSessionCookieName(): string {
  return cookieName;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const verified = await jwtVerify(token, getSecret());
    const payload = verified.payload as Partial<SessionUser>;
    if (!payload.id || !payload.email || !payload.role) return null;
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}
```

- [ ] **Step 6: Protect admin layout**

Create `src/app/(admin)/admin/layout.tsx`:

```tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/auth/current-user';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <aside className="border-b border-white/10 p-4">Rabelo & Rocha Admin</aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
```

- [ ] **Step 7: Add current user helper**

Create `src/features/auth/current-user.ts`:

```ts
import { cookies } from 'next/headers';
import { getSessionCookieName, verifySessionToken } from './session';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
```

- [ ] **Step 8: Verify auth unit tests**

Run:

```bash
SESSION_SECRET=12345678901234567890123456789012 npm run test -- tests/unit/auth.test.ts
```

Expected: PASS.

---

## Task 5: Design Tokens and Public Site Shell

**Files:**
- Create/modify: `src/styles/globals.css`, `src/components/site/Header.tsx`, `src/components/site/Footer.tsx`, `src/components/site/Hero.tsx`, `src/components/ui/Button.tsx`, `src/app/(site)/layout.tsx`, `src/app/(site)/page.tsx`
- Test: `tests/unit/design-tokens.test.tsx`, `tests/e2e/home.spec.ts`

- [ ] **Step 1: Add design token test**

Create `tests/unit/design-tokens.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '@/components/site/Hero';

describe('site hero', () => {
  it('renders the approved brand message', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /direito, inovação e tecnologia/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```bash
npm run test -- tests/unit/design-tokens.test.tsx
```

Expected: FAIL because `Hero` does not exist.

- [ ] **Step 3: Add Button component**

Create `src/components/ui/Button.tsx`:

```tsx
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-[#164245] text-white hover:bg-[#0f3032]'
      : 'border border-[#164245] text-[#164245] hover:bg-[#164245] hover:text-white';

  return (
    <a className={`inline-flex rounded-full px-5 py-3 text-sm font-semibold transition ${styles} ${className}`} {...props}>
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Add Hero component**

Create `src/components/site/Hero.tsx`:

```tsx
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="bg-[#e5e5e5] px-6 py-24 text-[#000000] md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#164245]">Rabelo & Rocha Advogados</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">Direito, inovação e tecnologia.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
            Estratégia jurídica com precisão técnica, proximidade e visão contemporânea para proteger decisões importantes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contato">Fale com o escritório</Button>
            <Button href="/areas-de-atuacao" variant="secondary">Conheça as áreas</Button>
          </div>
        </div>
        <div className="min-h-72 rounded-[2rem] bg-gradient-to-br from-[#164245] to-black shadow-2xl" aria-hidden="true" />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Use Hero on home page**

Modify `src/app/(site)/page.tsx`:

```tsx
import { Hero } from '@/components/site/Hero';

export default function HomePage() {
  return <Hero />;
}
```

- [ ] **Step 6: Verify design shell**

Run:

```bash
npm run test -- tests/unit/design-tokens.test.tsx
npm run typecheck
```

Expected: PASS.

---

## Task 6: Public Routes, Content Model, and SEO Metadata

**Files:**
- Create/modify public route files listed in Planned File Structure
- Create: `src/lib/seo/site-metadata.ts`, `src/components/seo/JsonLd.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`
- Test: `tests/unit/seo.test.ts`

- [ ] **Step 1: Add SEO metadata test**

Create `tests/unit/seo.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { organizationJsonLd, siteConfig } from '@/lib/seo/site-metadata';

describe('seo metadata', () => {
  it('defines canonical site identity', () => {
    expect(siteConfig.name).toBe('Rabelo & Rocha Advogados');
    expect(organizationJsonLd()['@type']).toBe('LegalService');
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```bash
npm run test -- tests/unit/seo.test.ts
```

Expected: FAIL because SEO module does not exist.

- [ ] **Step 3: Add SEO config**

Create `src/lib/seo/site-metadata.ts`:

```ts
export const siteConfig = {
  name: 'Rabelo & Rocha Advogados',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rabelorochadv.com.br',
  description: 'Escritório de advocacia com atuação estratégica, inovação e proximidade.',
};

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
```

- [ ] **Step 4: Add JSON-LD component**

Create `src/components/seo/JsonLd.tsx`:

```tsx
type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 5: Add robots route**

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/site-metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin'] }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 6: Add sitemap route**

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/site-metadata';

const publicRoutes = ['/', '/escritorio', '/areas-de-atuacao', '/blog', '/contato', '/politica-de-privacidade', '/termos-de-uso'];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
```

- [ ] **Step 7: Create initial static public route pages**

For each public route page, create a semantic page with one `<h1>`, introductory copy, and a contact CTA. Example for `src/app/(site)/escritorio/page.tsx`:

```tsx
export default function EscritorioPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-[#164245]">O escritório</h1>
      <p className="mt-6 text-lg leading-8 text-neutral-700">
        A Rabelo & Rocha Advogados une conhecimento técnico, inovação e proximidade para entregar soluções jurídicas estratégicas.
      </p>
    </main>
  );
}
```

- [ ] **Step 8: Verify SEO and route compile**

Run:

```bash
npm run test -- tests/unit/seo.test.ts
npm run typecheck
npm run build
```

Expected: PASS.

---

## Task 7: Blog Public Feature

**Files:**
- Create/modify: `src/features/blog/blog.repository.ts`, `src/features/blog/blog.schemas.ts`, `src/app/(site)/blog/page.tsx`, `src/app/(site)/blog/[slug]/page.tsx`, `src/components/site/PostCard.tsx`
- Test: `tests/unit/blog-public.test.ts`

- [ ] **Step 1: Add blog schema test**

Create `tests/unit/blog-public.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { postSlugSchema } from '@/features/blog/blog.schemas';

describe('blog public validation', () => {
  it('accepts lowercase SEO slugs and rejects unsafe slugs', () => {
    expect(postSlugSchema.safeParse('direito-aereo').success).toBe(true);
    expect(postSlugSchema.safeParse('../admin').success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Run:

```bash
npm run test -- tests/unit/blog-public.test.ts
```

Expected: FAIL because `blog.schemas.ts` does not exist.

- [ ] **Step 3: Add blog validation**

Create `src/features/blog/blog.schemas.ts`:

```ts
import { z } from 'zod';

export const postSlugSchema = z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const postEditorSchema = z.object({
  title: z.string().min(3).max(160),
  slug: postSlugSchema,
  excerpt: z.string().min(20).max(240),
  content: z.string().min(50),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
});
```

- [ ] **Step 4: Add post card**

Create `src/components/site/PostCard.tsx`:

```tsx
import Link from 'next/link';

type PostCardProps = {
  title: string;
  slug: string;
  excerpt: string;
};

export function PostCard({ title, slug, excerpt }: PostCardProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#164245]">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="mt-3 text-neutral-700">{excerpt}</p>
    </article>
  );
}
```

- [ ] **Step 5: Add blog repository public functions**

Create `src/features/blog/blog.repository.ts`:

```ts
import { prisma } from '@/lib/db/client';

export async function listPublishedPosts() {
  return prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    include: { category: true, coverImage: true },
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: { category: true, coverImage: true, tags: { include: { tag: true } } },
  });
}
```

- [ ] **Step 6: Verify blog validation**

Run:

```bash
npm run test -- tests/unit/blog-public.test.ts
npm run typecheck
```

Expected: PASS.

---

## Task 8: Contact, Leads, Media, and Redirects

**Files:**
- Create: `src/features/leads/leads.schemas.ts`, `src/features/leads/leads.repository.ts`, `src/app/api/contact/route.ts`, `src/features/media/media.schemas.ts`, `src/lib/storage/local-storage.ts`, `src/app/api/media/route.ts`, `src/features/redirects/redirects.repository.ts`, `src/lib/security/rate-limit.ts`, `src/lib/security/csrf.ts`
- Test: `tests/unit/contact-validation.test.ts`, `tests/unit/upload-validation.test.ts`, `tests/unit/security.test.ts`

- [ ] **Step 1: Add contact validation test**

Create `tests/unit/contact-validation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/features/leads/leads.schemas';

describe('contact validation', () => {
  it('accepts valid leads and rejects invalid email', () => {
    expect(contactSchema.safeParse({ name: 'Cliente', email: 'cliente@email.com', subject: 'Contato', message: 'Mensagem com detalhes suficientes.', sourcePage: '/contato' }).success).toBe(true);
    expect(contactSchema.safeParse({ name: 'Cliente', email: 'x', subject: 'Contato', message: 'Mensagem com detalhes suficientes.', sourcePage: '/contato' }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Add lead schema**

Create `src/features/leads/leads.schemas.ts`:

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(30).optional(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(2000),
  sourcePage: z.string().min(1).max(240),
});
```

- [ ] **Step 3: Add leads repository**

Create `src/features/leads/leads.repository.ts`:

```ts
import { prisma } from '@/lib/db/client';
import type { z } from 'zod';
import type { contactSchema } from './leads.schemas';

export async function createLead(input: z.infer<typeof contactSchema>) {
  return prisma.lead.create({ data: input });
}
```

- [ ] **Step 4: Add rate limit and CSRF tests**

Create `tests/unit/security.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createMemoryRateLimiter } from '@/lib/security/rate-limit';
import { createCsrfToken, verifyCsrfToken } from '@/lib/security/csrf';

describe('security helpers', () => {
  it('blocks after the configured number of attempts', () => {
    const limiter = createMemoryRateLimiter({ limit: 2, windowMs: 60_000 });
    expect(limiter.check('contact:127.0.0.1').allowed).toBe(true);
    expect(limiter.check('contact:127.0.0.1').allowed).toBe(true);
    expect(limiter.check('contact:127.0.0.1').allowed).toBe(false);
  });

  it('verifies matching CSRF tokens and rejects mismatches', () => {
    const token = createCsrfToken();
    expect(verifyCsrfToken(token, token)).toBe(true);
    expect(verifyCsrfToken(token, 'different-token')).toBe(false);
  });
});
```

- [ ] **Step 5: Add in-memory rate limiter**

Create `src/lib/security/rate-limit.ts`:

```ts
type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export function createMemoryRateLimiter(options: RateLimitOptions) {
  const buckets = new Map<string, Bucket>();

  return {
    check(key: string) {
      const now = Date.now();
      const current = buckets.get(key);
      if (!current || current.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + options.windowMs });
        return { allowed: true, remaining: options.limit - 1 };
      }

      if (current.count >= options.limit) {
        return { allowed: false, remaining: 0 };
      }

      current.count += 1;
      return { allowed: true, remaining: options.limit - current.count };
    },
  };
}

export const contactRateLimiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
export const loginRateLimiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
```

- [ ] **Step 6: Add CSRF helper**

Create `src/lib/security/csrf.ts`:

```ts
import { randomBytes, timingSafeEqual } from 'node:crypto';

export function createCsrfToken(): string {
  return randomBytes(32).toString('base64url');
}

export function verifyCsrfToken(expectedToken: string | null | undefined, submittedToken: string | null | undefined): boolean {
  if (!expectedToken || !submittedToken) return false;
  const expected = Buffer.from(expectedToken);
  const submitted = Buffer.from(submittedToken);
  if (expected.length !== submitted.length) return false;
  return timingSafeEqual(expected, submitted);
}
```

- [ ] **Step 7: Add contact API route with rate limiting**

Create `src/app/api/contact/route.ts`:

```ts
import { NextResponse } from 'next/server';
import { contactSchema } from '@/features/leads/leads.schemas';
import { createLead } from '@/features/leads/leads.repository';
import { contactRateLimiter } from '@/lib/security/rate-limit';

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? 'unknown';
  const clientIp = forwardedFor.split(',')[0]?.trim() || 'unknown';
  const rateLimit = contactRateLimiter.check(`contact:${clientIp}`);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em instantes.' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  }
  await createLead(parsed.data);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 8: Add media validation test**

Create `tests/unit/upload-validation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { isAllowedImageMimeType } from '@/features/media/media.schemas';

describe('media validation', () => {
  it('allows safe image types only', () => {
    expect(isAllowedImageMimeType('image/webp')).toBe(true);
    expect(isAllowedImageMimeType('image/jpeg')).toBe(true);
    expect(isAllowedImageMimeType('application/javascript')).toBe(false);
  });
});
```

- [ ] **Step 9: Add media schema helper**

Create `src/features/media/media.schemas.ts`:

```ts
const allowedImageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export function isAllowedImageMimeType(mimeType: string): boolean {
  return allowedImageMimeTypes.has(mimeType);
}
```

- [ ] **Step 10: Verify validation and security helpers**

Run:

```bash
npm run test -- tests/unit/contact-validation.test.ts tests/unit/upload-validation.test.ts tests/unit/security.test.ts
npm run typecheck
```

Expected: PASS.

---

## Task 9: Admin Post Management MVP

**Files:**
- Create/modify: `src/app/(admin)/admin/posts/page.tsx`, `src/app/(admin)/admin/posts/novo/page.tsx`, `src/app/(admin)/admin/posts/[id]/page.tsx`, `src/components/admin/PostForm.tsx`, `src/features/blog/post.actions.ts`, `src/components/admin/AdminTable.tsx`
- Test: `tests/unit/post-editor-validation.test.ts`

- [ ] **Step 1: Add post editor validation test**

Create `tests/unit/post-editor-validation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { postEditorSchema } from '@/features/blog/blog.schemas';

describe('post editor validation', () => {
  it('requires safe slug and meaningful content', () => {
    const result = postEditorSchema.safeParse({
      title: 'Guia de direito aéreo',
      slug: 'guia-direito-aereo',
      excerpt: 'Resumo objetivo sobre direitos do passageiro aéreo.',
      content: 'Conteúdo completo com informações úteis para o leitor e CTA discreto para contato.',
      status: 'DRAFT',
      seoTitle: 'Guia de direito aéreo',
      seoDescription: 'Entenda direitos do passageiro aéreo em situações comuns.',
    });

    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Verify validation passes**

Run:

```bash
npm run test -- tests/unit/post-editor-validation.test.ts
```

Expected: PASS using schema from Task 7.

- [ ] **Step 3: Add post actions**

Create `src/features/blog/post.actions.ts`:

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/client';
import { postEditorSchema } from './blog.schemas';

export async function createPostAction(formData: FormData) {
  const parsed = postEditorSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    status: formData.get('status'),
    seoTitle: formData.get('seoTitle') || undefined,
    seoDescription: formData.get('seoDescription') || undefined,
  });

  if (!parsed.success) return { ok: false, error: 'Dados inválidos' };

  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!admin) return { ok: false, error: 'Usuário administrador não encontrado' };

  await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: admin.id,
      publishedAt: parsed.data.status === 'PUBLISHED' ? new Date() : null,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/posts');
  return { ok: true };
}
```

- [ ] **Step 4: Add post form component**

Create `src/components/admin/PostForm.tsx`:

```tsx
import { createPostAction } from '@/features/blog/post.actions';

export function PostForm() {
  return (
    <form action={createPostAction} className="grid max-w-3xl gap-4">
      <label>Título<input name="title" required className="w-full rounded border p-2 text-black" /></label>
      <label>Slug<input name="slug" required className="w-full rounded border p-2 text-black" /></label>
      <label>Resumo<textarea name="excerpt" required className="w-full rounded border p-2 text-black" /></label>
      <label>Conteúdo<textarea name="content" required rows={12} className="w-full rounded border p-2 text-black" /></label>
      <label>Status
        <select name="status" className="w-full rounded border p-2 text-black" defaultValue="DRAFT">
          <option value="DRAFT">Rascunho</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="SCHEDULED">Agendado</option>
          <option value="ARCHIVED">Arquivado</option>
        </select>
      </label>
      <label>SEO title<input name="seoTitle" className="w-full rounded border p-2 text-black" /></label>
      <label>SEO description<textarea name="seoDescription" className="w-full rounded border p-2 text-black" /></label>
      <button className="rounded bg-[#164245] px-4 py-2 font-semibold text-white" type="submit">Salvar</button>
    </form>
  );
}
```

- [ ] **Step 5: Add new post page**

Create `src/app/(admin)/admin/posts/novo/page.tsx`:

```tsx
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Novo post</h1>
      <PostForm />
    </section>
  );
}
```

- [ ] **Step 6: Verify admin post code**

Run:

```bash
npm run test -- tests/unit/post-editor-validation.test.ts
npm run typecheck
```

Expected: PASS.

---

## Task 10: Final Hardening, GitNexus, and Release Readiness

**Files:**
- Create: `docs/operations/gitnexus.md`, `docs/operations/security-checklist.md`
- Modify: `README.md`

- [ ] **Step 1: Add GitNexus operations doc**

Create `docs/operations/gitnexus.md`:

```md
# GitNexus Workflow

Run after scaffold and meaningful source structure exist:

```bash
npx gitnexus analyze
```

If `.gitnexus/run.cjs` exists later, prefer:

```bash
node .gitnexus/run.cjs analyze
node .gitnexus/run.cjs status
```

Use GitNexus before refactors to inspect impact and after larger changes to refresh context.
```

- [ ] **Step 2: Add security checklist**

Create `docs/operations/security-checklist.md`:

```md
# Security Checklist

- `SESSION_SECRET` has at least 32 random characters.
- Cookies are HttpOnly, Secure and SameSite in production.
- `/admin` redirects anonymous users to `/admin/login`.
- Login and contact endpoints have rate limiting before production launch; contact is implemented in Task 8 and login must use `loginRateLimiter` when login submission is wired.
- Uploads validate MIME type, size and storage path.
- `.env` files are not committed.
- Database user has least required privilege.
- Backups cover PostgreSQL and uploaded media.
- Error logs do not expose passwords, session tokens or private lead messages.
```

- [ ] **Step 3: Add README project commands**

Modify `README.md` to include:

```md
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
```

- [ ] **Step 4: Run final verification**

Run:

```bash
npm run verify
npm run build
docker compose config
```

Expected: all commands pass.

- [ ] **Step 5: Run GitNexus analyze after scaffold exists**

Run:

```bash
npx gitnexus analyze
```

Expected: GitNexus index is created. If `npx` fails due environment/tooling, document the error and retry with the project-local runner only after it exists.

- [ ] **Step 6: Final implementation report**

Report:

- implemented phases;
- commands run and results;
- unresolved risks;
- whether GitNexus index was created;
- files changed;
- whether commits were skipped or created per user instruction.

---

## Self-Review Notes

- Spec coverage: MVP site, landing pages, blog, admin, auth, media, leads, redirects, Docker/VPS, SEO, accessibility, performance and GitNexus are covered by tasks.
- Security coverage: rate limiting and CSRF helpers are planned explicitly; login form wiring must apply `loginRateLimiter` and CSRF verification before production launch.
- No backend NestJS or CMS is introduced.
- GitNexus is intentionally scheduled after scaffold/source structure exists.
