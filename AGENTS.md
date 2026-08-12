# AGENTS.md — Rabelo & Rocha Advogados

## Contexto do projeto

Este repositório moderniza o site da **Rabelo & Rocha Advogados**. O objetivo é substituir o WordPress/HostGator atual por uma aplicação institucional moderna com site público, landing pages, blog jurídico, painel administrativo, PostgreSQL e deploy em VPS/Docker.

Antes de qualquer scaffold ou implementação, a sessão definiu e aprovou:

- spec de design: `docs/superpowers/specs/2026-08-10-rabelorochadv-design.md`;
- plano de implementação: `docs/superpowers/plans/2026-08-10-rabelorochadv-implementation.md`.

Nenhuma implementação deve começar sem seguir o plano aprovado.

## Decisões aprovadas

- Stack principal: **Next.js full-stack + React + TypeScript + PostgreSQL**.
- Arquitetura: monólito modular em Next.js App Router.
- Deploy alvo: **VPS com Docker Compose**, não Vercel/Supabase.
- Backend NestJS separado: fora do MVP.
- CMS headless: fora do MVP.
- Admin em `/admin` com autenticação segura.
- Blog com status `DRAFT`, `PUBLISHED`, `SCHEDULED`, `ARCHIVED`.
- Upload local via volume Docker no MVP, com caminho preparado para S3 compatível no futuro.
- GitNexus deve ser usado para indexação, análise de impacto e contexto técnico conforme o projeto ganhar estrutura.

## Direção de marca e UX

O site deve comunicar autoridade jurídica, inovação, sofisticação, confiança e proximidade.

Manual de marca observado na sessão:

- verde institucional: `#164245`;
- preto: `#000000`;
- off-white/cinza claro: `#e5e5e5`;
- tipografia principal: Cabinet Grotesk;
- linguagem visual com espaço negativo, geometria, perspectiva arquitetônica e conceito “Direito & Inovação & Tecnologia”.

Evitar:

- template jurídico genérico;
- dourado/clichês visuais jurídicos;
- excesso de dependências;
- animações ou componentes que prejudiquem performance e acessibilidade.

## Escopo do MVP

Inclui:

- site institucional;
- landing pages estratégicas;
- blog jurídico com SEO;
- painel administrativo;
- autenticação;
- CRUD de posts;
- gerenciamento básico de mídia;
- formulários de contato/leads;
- redirects de migração WordPress;
- sitemap, robots, canonical, OpenGraph e JSON-LD;
- Docker local e preparação para VPS.

Fora do MVP:

- CRM completo;
- área do cliente;
- chatbot;
- app mobile;
- múltiplos idiomas;
- automações jurídicas complexas.

## Rotas planejadas

Públicas:

- `/`;
- `/escritorio`;
- `/areas-de-atuacao`;
- `/areas-de-atuacao/[slug]`;
- `/blog`;
- `/blog/[slug]`;
- `/contato`;
- `/politica-de-privacidade`;
- `/termos-de-uso`.

Landing pages estratégicas podem usar rotas dedicadas como `/aereo`, `/transito` e `/direito-previdenciario` quando houver intenção comercial e SEO forte.

Admin:

- `/admin/login`;
- `/admin`;
- `/admin/posts`;
- `/admin/posts/novo`;
- `/admin/posts/[id]`;
- `/admin/midia`;
- `/admin/leads`;
- `/admin/configuracoes`, se necessário.

## Modelo de dados aprovado

Entidades iniciais:

- `User`;
- `Post`;
- `Category`;
- `Tag`;
- `PostTag`;
- `MediaAsset`;
- `Lead`;
- `Redirect`.

Ver detalhes de campos na spec aprovada.

## Segurança mínima obrigatória

- Hash de senha moderno.
- Sessões seguras com cookie `HttpOnly`, `Secure`, `SameSite`.
- Proteção de `/admin`.
- Validação server-side.
- Rate limiting para login e contato.
- CSRF onde houver mutações via formulário/cookie.
- Sanitização/renderização segura de conteúdo do blog.
- Validação de upload por tipo, tamanho e nome.
- Variáveis de ambiente fora do repositório.
- Backups de banco e mídia.
- Princípio de menor privilégio no banco.

## Workflow obrigatório para agentes

1. Leia primeiro:
   - `docs/superpowers/specs/2026-08-10-rabelorochadv-design.md`;
   - `docs/superpowers/plans/2026-08-10-rabelorochadv-implementation.md`.
2. Não faça scaffold ou código fora do plano aprovado sem nova autorização.
3. Siga TDD quando implementar tarefas do plano.
4. Verifique proporcionalmente cada etapa antes de declarar conclusão.
5. Use GitNexus após existir estrutura analisável e antes de refactors relevantes.
6. Não commite sem pedido explícito do usuário.

## GitNexus

Comandos esperados no projeto:

```bash
npx gitnexus analyze
```

Depois que o runner local existir:

```bash
node .gitnexus/run.cjs analyze
node .gitnexus/run.cjs status
```

Uso previsto:

- mapear contexto e símbolos do projeto;
- analisar impacto antes de mudanças estruturais;
- apoiar revisão técnica;
- manter arquivos de contexto para agentes atualizados.

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
