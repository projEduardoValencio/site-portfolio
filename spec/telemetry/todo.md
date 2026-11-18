# Todo: telemetria (Umami + PostHog)

Cada tarefa é atômica e tem um **Teste** que prova que ficou pronta. Ver contexto em `plan.md`.

## A. Fundação
- [x] **A1** Criar `src/lib/telemetry.js` com `track(name, props)` e `startTelemetry()`.
  - Guardas: `import.meta.env.PROD`, hostname ∈ `VITE_TELEMETRY_DOMAINS`, `navigator.doNotTrack !== '1'`.
  - Fila (máx. 50) até os destinos carregarem; descarrega ao carregar.
  - Falha de um destino não afeta o outro nem o site (`try/catch`).
  - **Teste:** `npm run build` passa; com domínios vazios, `startTelemetry()` não cria nenhum `<script>` nem import dinâmico.
- [x] **A2** Atualizar `.env.example` com as 4 variáveis (sem valores reais de chave).
  - **Teste:** `cat .env.example` lista `VITE_TELEMETRY_DOMAINS`, `VITE_UMAMI_WEBSITE_ID`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`.

## B. Correção do PostHog
- [x] **B1** Reescrever `src/lib/posthog.js` como `loadPostHog()` (import dinâmico de `posthog-js`).
  - **Teste:** `dist/` tem o `posthog-js` num chunk separado, fora do bundle de entrada.
- [x] **B2** Config: `persistence: 'memory'`, `autocapture: false`, `disable_session_recording: true`, `disable_surveys: true`, `capture_exceptions: true`, `person_profiles: 'identified_only'`.
  - **Teste:** `grep -n "persistence\|autocapture\|disable_session_recording" src/lib/posthog.js` mostra os três; navegador: 0 cookies e nenhuma chave `ph_*` no `localStorage`.
- [x] **B3** Remover o `throw` em dev e o `posthogLog` (e os 2 usos em `main.js`); sem chave, o PostHog simplesmente não carrega.
  - **Teste:** `npm run dev` sobe sem `.env`; `grep -rn posthogLog src` não retorna nada.
- [x] **B4** Migrar as 4 features (`contact.js`, `carousel.js`, `experience.js`, `i18n.js`) de `posthog.capture` + `isPostHogEnabled` para `track()`.
  - **Teste:** `grep -rn "posthog" src --include=*.js -l` retorna só `src/lib/posthog.js` e `src/lib/telemetry.js`; build passa.

## C. Umami
- [x] **C1** Criar `src/lib/umami.js` com `loadUmami()`: injeta `<script defer src="https://cloud.umami.is/script.js">` com `data-website-id`, `data-domains` e `data-do-not-track="true"`; resolve quando `window.umami` existir.
  - **Teste (navegador):** request para `cloud.umami.is/script.js` só depois da intro; sem cookies.
- [x] **C2** Ligar `loadUmami()` e `loadPostHog()` em `startTelemetry()` e enviar cada `track()` aos dois destinos.
  - **Teste (navegador):** um clique em "Copy email" gera `email_copied` nos dois destinos (aba Network).

## D. Integração no site
- [x] **D1** Chamar `startTelemetry()` em `main.js` depois da intro (`playIntro().then`), sem alterar a ordem de boot existente.
  - **Teste:** nenhuma request de telemetria enquanto o preloader está ativo.
- [x] **D2** Adicionar `data-section="…"` às 9 seções de `index.html` (`hero`, `manifesto`, `stats`, `work`, `experience`, `about`, `certifications`, `stack`, `contact`).
  - **Teste:** `grep -c data-section index.html` = 9; build gera `/` e `/pt/` com os 9.

## E. Engajamento (`src/features/engagement.js`)
- [x] **E1** `section_viewed`: `IntersectionObserver` com faixa central (`rootMargin: -45% 0 -45% 0`), uma vez por seção.
  - **Teste:** rolar a página inteira dispara 9 eventos, sem repetição ao voltar.
- [x] **E2** `section_time`: acumula o tempo visível por seção, pausa com a aba oculta, envia em `visibilitychange→hidden` e `pagehide`; só seções com ≥2 s.
  - **Teste:** ficar ~5 s numa seção e trocar de aba envia `section_time` com `seconds` ≈ 5.
- [x] **E3** `scroll_depth`: marcos 25/50/75/100, um disparo por marco.
  - **Teste:** rolar até o fim dispara exatamente 4 eventos.
- [x] **E4** `nav_clicked`: links `#âncora` em `.nav`, `#menu` e `#dock`, exceto `[data-contact]`.
  - **Teste:** clicar "Experience" no nav envia `target=#experiencia`, `area=nav`; "Let's talk" idem com `#contato`; WhatsApp do menu **não** gera `nav_clicked`.
- [x] **E5** `outbound_click`: links para outro domínio, exceto `[data-contact]`; `destination` = host + caminho, sem query/hash.
  - **Teste:** LinkedIn e GitHub geram o evento; e-mail e WhatsApp não.
- [x] **E6** Chamar `initEngagement()` em `main.js`.
  - **Teste:** build passa; eventos E1–E5 chegam.

## F. Privacidade
- [x] **F1** Linha curta no rodapé: medição anônima, sem cookies (chave i18n em `index.html` e `src/i18n/pt.js`).
  - **Teste:** `npm run build` passa (falha se as chaves divergirem); texto aparece em `/` e `/pt/`.
- [x] **F2** Auditoria de payload: nenhum evento leva e-mail, telefone ou `href` de contato.
  - **Teste (navegador):** clicar e-mail/WhatsApp e inspecionar o payload no Network dos dois serviços.

## G. Deploy
- [x] **G1** `deploy.yml`: bloco `env:` no passo `npm run build` com as 4 variáveis lidas de `secrets.*`.
  - **Teste:** `grep -n "VITE_" .github/workflows/deploy.yml` mostra as 4.
- [x] **G2** README: seção curta "Telemetry" (variáveis, o que é medido, como desligar).
  - **Teste:** leitura.
- [ ] **G3** (você) Criar as 4 variáveis em *Settings → Secrets and variables → Actions → Secrets*.

## H. Verificação final
- [x] **H1** `npm run build` limpo; gerar também com as variáveis de teste.
- [x] **H2** Greps estáticos: nada de `posthog.capture` fora de `src/lib`, `autocapture` só como `false`, ID do Umami só vindo de env.
- [x] **H3** Checklist manual do `plan.md` (cookies, rede, eventos, DNT, domínio). Feito com Chrome real via Playwright (Umami interceptado/stub para não poluir seu painel; PostHog com chave falsa interceptada). Resultado: 0 cookies, só `ev-lang` e `ev-intro-seen` (do próprio site), 0 erros, payload sem e-mail/telefone/href, DNT e domínio fora da lista = nenhuma request.
- [ ] **H4** (você, depois do deploy) Conferir eventos nos painéis do Umami e do PostHog.
