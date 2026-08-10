# Spec de Design — Modernização Rabelo & Rocha Advogados

Data: 2026-08-10  
Projeto: `rabelorochadv`  
Status: aprovado para planejamento técnico; não iniciar implementação antes do plano de execução.

## 1. Contexto e diagnóstico

O projeto moderniza o site da Rabelo & Rocha Advogados, hoje baseado em WordPress/HostGator, para uma aplicação institucional moderna com landing pages, blog e painel administrativo.

Problemas identificados no cenário atual:

- dependência de plugins e configurações manuais;
- risco de conflitos em atualizações;
- instabilidade de cache/layout;
- manutenção difícil para conteúdo e evolução técnica;
- performance mobile inconsistente;
- SEO dependente de plugins;
- pouca flexibilidade para funcionalidades próprias.

O PDF de modernização sugeria Next.js + Vercel + Supabase. A decisão aprovada para este projeto é diferente: **Next.js full-stack em VPS/Docker com PostgreSQL**, evitando dependência de Vercel/Supabase e mantendo controle operacional.

## 2. Objetivo do produto

Criar uma presença digital institucional que comunique:

- autoridade jurídica;
- inovação e tecnologia;
- sofisticação visual alinhada ao manual da marca;
- confiança para captação de leads;
- facilidade de publicação de artigos;
- base técnica segura, performática e sustentável.

## 3. Escopo do MVP

Inclui:

- site institucional;
- landing pages estratégicas;
- blog jurídico com SEO;
- painel `/admin`;
- autenticação segura;
- CRUD de posts;
- status editoriais `DRAFT`, `PUBLISHED`, `SCHEDULED`, `ARCHIVED`;
- gerenciamento básico de imagens;
- formulários de contato;
- sitemap, robots, canonical, OpenGraph e JSON-LD;
- deploy via Docker em VPS;
- PostgreSQL;
- documentação e validação com GitNexus após existir estrutura analisável.

Fora do MVP:

- CRM completo;
- automações jurídicas complexas;
- área do cliente;
- chatbot jurídico;
- múltiplos idiomas;
- app mobile;
- backend NestJS separado.

Esses itens ficam como fases futuras se houver necessidade real.

## 4. Abordagem aprovada

Abordagem escolhida: **Next.js full-stack em VPS/Docker**.

Alternativas avaliadas:

1. **Next.js full-stack em VPS/Docker** — aprovado. Menos partes móveis, bom SEO/performance, admin no mesmo projeto e deploy reproduzível.
2. **Next.js + API Node/NestJS separada** — rejeitado para MVP por excesso de boilerplate e custo operacional.
3. **Next.js + CMS headless** — alternativa válida, mas rejeitada para manter controle visual, editorial e técnico.

## 5. Arquitetura recomendada

A aplicação será um **monólito modular em Next.js**, com separação interna clara:

- `app/(site)` para páginas públicas;
- `app/(admin)` para painel administrativo;
- `app/api` ou Server Actions para operações controladas;
- camada de domínio para blog, usuários, mídia, redirects e leads;
- PostgreSQL como banco;
- ORM leve, preferencialmente Prisma ou Drizzle;
- autenticação por sessão segura;
- upload local em volume Docker no MVP, com caminho preparado para S3 compatível no futuro;
- Nginx ou Caddy como reverse proxy;
- Docker Compose para app, banco e proxy.

A arquitetura deve evitar overengineering, mas preservar limites internos suficientes para extração futura de backend/API se o produto crescer.

## 6. Marca e direção visual

A direção visual deve ser **institucional premium**, editorial e tecnológica, sem parecer template jurídico genérico.

Personalidade:

- sobriedade;
- precisão técnica;
- confiança;
- modernidade;
- proximidade;
- inovação jurídica.

Elementos extraídos do manual de marca:

- verde institucional `#164245`;
- preto `#000000`;
- off-white/cinza claro `#e5e5e5`;
- tipografia Cabinet Grotesk;
- uso de espaço negativo;
- geometria, perspectiva arquitetônica e sensação de tecnologia;
- conceito “Direito & Inovação & Tecnologia”.

A interface deve evitar clichês jurídicos, excesso de dourado e composição genérica.

## 7. Design system inicial

Paleta:

- verde institucional: `#164245`;
- preto: `#000000`;
- off-white/cinza claro: `#e5e5e5`;
- branco para respiro;
- tons derivados do verde para estados, bordas e fundos suaves.

Tipografia:

- Cabinet Grotesk para títulos, chamadas e interface;
- Bold/Semibold para headlines;
- Regular/Medium para textos e navegação;
- caso licenciamento/webfont seja inviável, escolher alternativa compatível e documentar a troca.

Componentes públicos sugeridos:

- hero institucional com frase forte e CTA;
- seções editoriais com espaço negativo;
- cards de áreas de atuação;
- blocos de autoridade/credenciais;
- seção “Direito, Inovação e Tecnologia”;
- listagem de artigos;
- cards de artigos;
- formulário de contato;
- footer institucional completo;
- breadcrumbs em páginas internas;
- componentes de SEO para artigos e áreas.

Componentes administrativos:

- login;
- layout admin com navegação simples;
- tabela/listagem de posts;
- editor de post;
- upload/seleção de imagem;
- status editorial;
- preview antes de publicar.

Referências de UI como OriginKit, Skiper UI e Cult UI devem inspirar movimento, composição e acabamento, sem cópia direta.

## 8. UX mobile-first

Prioridades:

- leitura confortável em celular;
- CTAs claros;
- navegação simples;
- performance alta;
- menus sem excesso;
- formulários curtos;
- artigos com boa legibilidade;
- estados de foco e interação acessíveis.

## 9. Mapa de rotas

Rotas públicas do MVP:

- `/` — home institucional;
- `/escritorio` — história, posicionamento, diferenciais e equipe;
- `/areas-de-atuacao` — visão geral das áreas;
- `/areas-de-atuacao/[slug]` — página individual de cada área;
- `/blog` — listagem de artigos;
- `/blog/[slug]` — artigo individual;
- `/contato` — contato, endereço, canais e formulário;
- `/politica-de-privacidade` — LGPD e uso de dados;
- `/termos-de-uso` — termos gerais, se aplicável.

Landing pages específicas:

- usar rotas dedicadas como `/aereo`, `/transito`, `/direito-previdenciario` quando houver SEO forte e intenção comercial clara;
- usar `/lp/[slug]` apenas para campanhas mais temporárias ou menos estratégicas.

Rotas administrativas:

- `/admin/login`;
- `/admin`;
- `/admin/posts`;
- `/admin/posts/novo`;
- `/admin/posts/[id]`;
- `/admin/midia`;
- `/admin/leads`;
- `/admin/configuracoes`, se necessário no MVP.

## 10. Blog e estratégia editorial

O blog será ativo de SEO, não apenas seção de notícias.

Cada post deve ter:

- título;
- slug;
- resumo;
- conteúdo;
- imagem destacada;
- autor;
- categoria;
- tags;
- status `DRAFT`, `PUBLISHED`, `SCHEDULED`, `ARCHIVED`;
- data de publicação;
- meta title;
- meta description;
- canonical opcional;
- OpenGraph image.

Pilares editoriais:

- dúvidas jurídicas frequentes;
- áreas de atuação;
- mudanças legais;
- guias práticos;
- conteúdo institucional de autoridade;
- artigos que conectem direito, inovação e tecnologia.

Estrutura recomendada de artigo:

- introdução objetiva;
- subtítulos descritivos;
- respostas diretas;
- CTA discreto para contato;
- FAQ quando fizer sentido;
- schema apropriado.

## 11. SEO técnico

O projeto deve incluir:

- `sitemap.xml` dinâmico;
- `robots.txt`;
- canonical por página;
- OpenGraph/Twitter cards;
- JSON-LD para organização, artigo, breadcrumbs e FAQ quando aplicável;
- URLs amigáveis;
- redirects da migração WordPress;
- headings semânticos;
- imagens otimizadas;
- performance mobile;
- páginas de área com conteúdo único, não genérico.

## 12. Modelo de dados inicial

### User

- id;
- name;
- email;
- passwordHash;
- role: `ADMIN` ou `EDITOR`;
- createdAt;
- updatedAt.

### Post

- id;
- title;
- slug;
- excerpt;
- content;
- coverImageId;
- authorId;
- categoryId;
- status: `DRAFT`, `PUBLISHED`, `SCHEDULED`, `ARCHIVED`;
- publishedAt;
- scheduledFor;
- seoTitle;
- seoDescription;
- canonicalUrl;
- ogImageId;
- createdAt;
- updatedAt.

### Category

- id;
- name;
- slug;
- description.

### Tag

- id;
- name;
- slug.

### PostTag

- postId;
- tagId.

### MediaAsset

- id;
- filename;
- originalName;
- mimeType;
- size;
- width;
- height;
- altText;
- storagePath;
- createdAt.

### Lead

- id;
- name;
- email;
- phone;
- subject;
- message;
- sourcePage;
- status;
- createdAt.

### Redirect

- id;
- sourcePath;
- targetPath;
- statusCode;
- active.

## 13. Admin MVP

O painel deve ser simples, seguro e focado em publicação:

- login;
- dashboard básico;
- listar posts;
- criar/editar post;
- alterar status editorial;
- agendar publicação;
- fazer upload de imagem;
- editar alt text;
- visualizar leads;
- gerenciar redirects de migração.

O editor deve começar como **Markdown/MDX controlado** ou rich text leve. A recomendação inicial é Markdown/MDX controlado por simplicidade, segurança e previsibilidade.

## 14. Segurança

Requisitos mínimos:

- hash de senha com algoritmo moderno;
- sessões seguras com cookies `HttpOnly`, `Secure`, `SameSite`;
- proteção das rotas `/admin`;
- validação server-side em formulários;
- rate limiting para login e contato;
- CSRF onde houver mutações via formulário/cookie;
- sanitização/renderização segura do conteúdo do blog;
- upload com validação de tipo, tamanho e nome;
- logs de erro sem expor dados sensíveis;
- variáveis de ambiente fora do repositório;
- backups de banco e mídia;
- princípio de menor privilégio para usuário do banco.

LGPD e contato:

- consentimento ou aviso de privacidade nos formulários;
- política de privacidade clara;
- coleta mínima de dados;
- registro de origem da página;
- proteção contra spam.

## 15. Estrutura de diretórios sugerida

```txt
src/
  app/
    (site)/
    (admin)/
    api/
  components/
    site/
    admin/
    ui/
    seo/
  features/
    blog/
    media/
    leads/
    auth/
    redirects/
  lib/
    db/
    auth/
    security/
    seo/
    storage/
    validation/
  styles/
  content/
prisma/ ou drizzle/
public/
docs/
docker/
```

A separação por `features` mantém limites de domínio e reduz acoplamento.

## 16. Docker, VPS e operação

Ambiente recomendado:

- `app`: Next.js;
- `db`: PostgreSQL;
- `proxy`: Caddy ou Nginx;
- volume persistente para banco;
- volume persistente para uploads, se armazenamento local;
- `.env` por ambiente;
- scripts de backup;
- healthcheck;
- logs;
- deploy reproduzível.

Produção:

- HTTPS obrigatório;
- domínio e redirects configurados;
- backup automatizado de banco e mídia;
- rollback documentado;
- atualização controlada;
- monitoramento básico.

## 17. Performance

Metas iniciais:

- Lighthouse alto em mobile;
- LCP otimizado;
- imagens responsivas;
- fontes carregadas com estratégia clara;
- CSS enxuto;
- componentes client-side apenas quando necessário;
- páginas públicas majoritariamente server-rendered/static;
- evitar dependências pesadas.

## 18. Acessibilidade

Requisitos:

- HTML semântico;
- contraste adequado;
- navegação por teclado;
- labels em formulários;
- estados de foco visíveis;
- textos alternativos em imagens;
- hierarquia correta de headings;
- testes básicos com Lighthouse/axe quando possível.

## 19. GitNexus

Como o repositório ainda está praticamente vazio, GitNexus deve entrar depois que houver documentação/estrutura inicial.

Fluxo previsto:

1. criar spec e plano;
2. criar scaffold aprovado;
3. rodar `npx gitnexus analyze` ou `node .gitnexus/run.cjs analyze` se o runner local existir;
4. usar GitNexus para entender rotas e símbolos, analisar impacto antes de refactors, validar dependências entre módulos e apoiar revisão técnica.

## 20. Roadmap

### Fase 0 — Spec e plano

- documento de visão;
- stack final;
- validações;
- roadmap;
- critérios de aceite.

### Fase 1 — Fundação

- Next.js;
- TypeScript;
- lint/test;
- Docker local;
- banco;
- estrutura base;
- design tokens.

### Fase 2 — Site público

- home;
- escritório;
- áreas;
- contato;
- SEO base;
- layout responsivo.

### Fase 3 — Blog

- modelo de posts;
- listagem;
- detalhe;
- categorias/tags;
- SEO de artigos.

### Fase 4 — Admin

- auth;
- CRUD posts;
- upload de mídia;
- leads;
- redirects.

### Fase 5 — Produção

- deploy VPS;
- SSL;
- backups;
- redirects WordPress;
- performance;
- hardening.

## 21. Critérios de aceite da spec

Esta spec está pronta para orientar o plano de implementação quando:

- a abordagem Next.js full-stack em VPS/Docker estiver mantida;
- o MVP continuar limitado a site, landing pages, blog, admin, leads, mídia e redirects;
- o backend separado continuar fora do MVP;
- as decisões de marca seguirem o manual visual;
- as próximas etapas forem detalhadas em plano de implementação antes de qualquer scaffold/código.
