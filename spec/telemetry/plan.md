# Telemetria do portfólio (Umami + PostHog, sem cookies)

## Objetivo
Saber quantas pessoas acessam o site, de onde vêm, o que clicam e o que ficam mais tempo lendo, **sem cookies e sem banner de consentimento**, ao menor custo (R$ 0).

## Decisões já tomadas
- **Umami Cloud**: painel do dia a dia (visitas, origem, país, dispositivo, idioma, eventos-chave). Cookieless por padrão.
- **PostHog Cloud (região EUA, projeto já criado)**: análise de eventos, funis e exceções. Configurado **sem persistência** (`persistence: 'memory'`).
- Consequência aceita: no PostHog, quem volta outro dia conta como visitante novo. "Quantas pessoas" se lê no Umami.
- Sem gravação de sessão, sem autocaptura, sem logs do PostHog.
- Website ID do Umami: `505cfd74-90f5-4429-b14f-4258da037de9` (público por natureza, vai no HTML final de qualquer forma).

## Estado atual (o PR #1 do wizard do PostHog)
Problemas a corrigir:
1. Grava cookie e `localStorage` (falta `persistence: 'memory'`).
2. Autocaptura ligada: o `href` real de `mailto:`/`wa.me` (e-mail e telefone) pode ir para o PostHog no clique.
3. `deploy.yml` não passa as variáveis ao build: em produção o PostHog fica desligado sem aviso.
4. `npm run dev` quebra sem `.env` (`throw` no topo do módulo).
5. Gravação de sessão pode ligar pela configuração do projeto.
6. SDK no bundle principal (pesa antes do preloader).
7. Sem guarda de domínio nem de Do Not Track.
8. Logs `posthogLog` inúteis.

## Arquitetura
```
src/lib/telemetry.js   track(name, props): único ponto de entrada. Guardas, fila e envio aos dois destinos.
src/lib/posthog.js     loadPostHog(): import dinâmico + init sem persistência.
src/lib/umami.js       loadUmami(): injeta o script do Umami e devolve o track.
src/features/engagement.js   seção vista, tempo por seção, scroll, cliques de navegação e links externos.
```
- O resto do site só conhece `track()`. Nenhuma feature importa `posthog-js`.
- `startTelemetry()` roda **depois da intro** (em `main.js`). Eventos disparados antes ficam numa fila curta e são descarregados quando os destinos carregam.
- A telemetria só liga quando **todas** as condições valem: build de produção, hostname dentro de `VITE_TELEMETRY_DOMAINS`, Do Not Track desligado. Caso contrário, `track()` não faz nada.

## Configuração (variáveis de build)
| Variável | Exemplo | Obrigatória |
|---|---|---|
| `VITE_TELEMETRY_DOMAINS` | `www.eduardovalencio.com.br,eduardovalencio.com.br` | Sim (vazia = telemetria desligada) |
| `VITE_UMAMI_WEBSITE_ID` | `505cfd74-…` | Não (sem ela, o Umami não carrega) |
| `VITE_POSTHOG_KEY` | `phc_…` | Não (sem ela, o PostHog não carrega) |
| `VITE_POSTHOG_HOST` | `https://us.i.posthog.com` | Não |

No GitHub: *Settings → Secrets and variables → Actions → Secrets* (não são segredos). Localmente: `.env` (ignorado pelo git).

## Eventos
| Evento | Quando | Propriedades |
|---|---|---|
| (pageview) | Automático nos dois serviços | — |
| `section_viewed` | 1ª vez que a seção cruza a faixa central da tela | `section` |
| `section_time` | Ao esconder/fechar a aba, por seção com ≥2 s | `section`, `seconds` |
| `scroll_depth` | Marcos 25/50/75/100% | `percent` |
| `nav_clicked` | Link `#âncora` no menu, nav ou dock | `target`, `area` |
| `outbound_click` | Link para outro domínio (LinkedIn, GitHub…) | `destination` (host + caminho, sem query) |
| `contact_link_opened` | E-mail / WhatsApp (já existe) | `contact_method` |
| `email_copied` | Botão copiar e-mail (já existe) | `copy_succeeded` |
| `work_carousel_navigated` | Carrossel (já existe) | `work_index`, `interaction_method` |
| `experience_detail_opened` | Acordeão (já existe) | `experience_position` |
| `language_selected` | Troca de idioma (já existe) | `selected_language` |

Uma seção conta como "em leitura" enquanto cruza uma faixa fina no meio da tela (funciona com seções altas no celular e só uma fica ativa por vez). Seções (`data-section` no HTML): `hero`, `manifesto`, `stats`, `work`, `experience`, `about`, `certifications`, `stack`, `contact`.

Regra de privacidade: nenhuma propriedade contém e-mail, telefone, IP, texto digitado ou URL com query/hash.

## Estratégia de testes
Não há framework de testes no projeto, e a lógica nova depende do navegador. Três camadas:
1. **Build** (`npm run build`): passa; o build falha se `pt.js` e o HTML divergirem (cobre o aviso de privacidade).
2. **Estático**: `grep` no código e no `dist/` (ver o `todo.md`): nenhuma chamada a `posthog.capture` fora de `src/lib/`, nenhum `autocapture` ligado, scripts do Umami só com o ID e os domínios corretos.
3. **Navegador real** (checklist abaixo): cookies/storage, rede e eventos.

### Checklist manual no navegador
Rodar `VITE_TELEMETRY_DOMAINS=localhost VITE_UMAMI_WEBSITE_ID=… VITE_POSTHOG_KEY=… VITE_POSTHOG_HOST=… npm run build && npm run preview` e abrir `http://localhost:4173`:
- [ ] DevTools → Application: **nenhum cookie** e **nenhuma chave de `localStorage`** de `ph_*` ou `umami*` (só `ev-lang`, que é do próprio site).
- [ ] Network: 1 request para `cloud.umami.is/script.js` e envios para o Umami; request(s) para o host do PostHog. Nada antes do fim da intro.
- [ ] Rolar a página: `section_viewed` por seção e `scroll_depth` nos 4 marcos.
- [ ] Trocar de aba por 5 s e voltar: `section_time` enviado ao esconder.
- [ ] Clicar em e-mail, WhatsApp, copiar e-mail, LinkedIn, GitHub: eventos corretos e **sem `href`/telefone/e-mail** no payload.
- [ ] Carrossel, acordeão, troca de idioma: eventos corretos.
- [ ] Com Do Not Track ligado: nenhuma request de telemetria.
- [ ] Com `VITE_TELEMETRY_DOMAINS` sem o hostname: nenhuma request.
- [ ] Umami e PostHog mostram os eventos nos painéis (feito depois do deploy).

## Fora de escopo
- Proxy próprio contra bloqueadores (avaliar só se os números ficarem baixos).
- Gravação de sessão e heatmaps.
- Migrar o PostHog para a região UE.
- Corrigir o `npm audit` (não vem desta mudança).
- Upload de source maps.

## Pendências suas
1. Criar as variáveis no GitHub (tabela acima).
2. Confirmar quais domínios entram em `VITE_TELEMETRY_DOMAINS` (o `github.io` também, ou só o domínio próprio?).
3. Passar a chave `phc_…` e o host do PostHog, se quiser testar localmente.
4. Depois do deploy: conferir os painéis dos dois serviços.
