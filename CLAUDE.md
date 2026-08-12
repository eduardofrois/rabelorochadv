# CLAUDE.md — Contexto de IA do Projeto

## Resumo

Projeto: modernização do site **Rabelo & Rocha Advogados**.

Objetivo: construir uma aplicação institucional moderna com landing pages, blog jurídico, painel administrativo, PostgreSQL, SEO forte, segurança, acessibilidade, performance e deploy em VPS/Docker.

## Documentos principais

- Spec aprovada: `docs/superpowers/specs/2026-08-10-rabelorochadv-design.md`
- Plano aprovado: `docs/superpowers/plans/2026-08-10-rabelorochadv-implementation.md`
- Contexto para agentes: `AGENTS.md`

## Decisões da sessão

- Usar Next.js full-stack em vez de WordPress.
- Usar VPS/Docker/PostgreSQL em vez de Vercel/Supabase.
- Evitar backend separado no MVP.
- Evitar CMS headless no MVP.
- Priorizar site institucional, landing pages, blog, admin, leads, mídia, redirects e SEO.
- Preparar GitNexus para análise, documentação e impacto.

## Direção técnica

- Next.js App Router.
- React.
- TypeScript.
- PostgreSQL.
- Prisma ou Drizzle, com preferência final definida no plano de execução.
- Tailwind CSS.
- Vitest e Playwright.
- Docker Compose.
- Sessões seguras por cookie.
- Markdown/MDX controlado para conteúdo editorial no MVP.

## Direção visual

- Institucional premium.
- Editorial e tecnológico.
- Verde `#164245`, preto `#000000`, off-white `#e5e5e5`.
- Cabinet Grotesk quando viável.
- Geometria, perspectiva arquitetônica, espaço negativo e conceito “Direito & Inovação & Tecnologia”.

## Regras para próximos agentes

- Não implementar antes de ler spec e plano.
- Não ampliar escopo sem autorização.
- Não adicionar CRM, área do cliente, chatbot, NestJS, multi-idioma ou app mobile no MVP.
- Manter performance, SEO, acessibilidade e segurança como critérios de aceite.
- Validar com testes e comandos reais antes de afirmar conclusão.
- Quando houver código suficiente, rodar GitNexus e consultar impacto antes de refactors.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **rabelorochadv** (124 symbols, 110 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/rabelorochadv/context` | Codebase overview, check index freshness |
| `gitnexus://repo/rabelorochadv/clusters` | All functional areas |
| `gitnexus://repo/rabelorochadv/processes` | All execution flows |
| `gitnexus://repo/rabelorochadv/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
