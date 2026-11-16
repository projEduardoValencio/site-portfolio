import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './style.css';

window.gsap = gsap;
(()=>{
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover)').matches;
const $ = (s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const hasG = typeof gsap!=='undefined';
if(hasG) gsap.registerPlugin(ScrollTrigger);

/* ---------- smooth scroll ---------- */
let lenis=null;
if(!reduce && typeof Lenis!=='undefined'){
  lenis=new Lenis({lerp:.09,smoothWheel:true});
  if(hasG){ lenis.on('scroll',e=>{ScrollTrigger.update();}); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
  else { const r=t=>{lenis.raf(t);requestAnimationFrame(r)};requestAnimationFrame(r); }
  lenis.stop();
}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=$(a.getAttribute('href')); if(!t) return; e.preventDefault();
  setTimeout(()=>{ lenis? lenis.scrollTo(t,{duration:1.4,offset:-10}) : t.scrollIntoView({behavior:'smooth'}); },document.body.classList.contains('menu-open')?0:0);
}));

/* ---------- nav state, indicator, menu, dock ---------- */
const nav=$('.nav'), dock=$('#dock'), burger=$('#burger'), ind=$('#navInd');
const navLinks=$$('.nav__links a');
function moveInd(a){ if(!a){ind.style.opacity=0;return;} ind.style.opacity=1; ind.style.width=a.offsetWidth+'px'; ind.style.transform=`translateX(${a.offsetLeft}px)`; }
let activeLink=null;
navLinks.forEach(a=>{a.addEventListener('pointerenter',()=>moveInd(a))});
$('.nav__links').addEventListener('pointerleave',()=>moveInd(activeLink));
function onScroll(y){
  nav.classList.toggle('is-scrolled',y>40);
  const c=$('#contato').getBoundingClientRect().top;
  dock.classList.toggle('show',y>innerHeight*.8 && c>innerHeight*.9);
  // scroll spy
  let cur=null; const mid=innerHeight*.4;
  navLinks.forEach(a=>{const sec=$(a.getAttribute('href')); if(!sec) return; const r=sec.getBoundingClientRect(); if(r.top<=mid && r.bottom>mid) cur=a;});
  if(cur!==activeLink){ navLinks.forEach(a=>a.classList.toggle('active',a===cur)); activeLink=cur; moveInd(cur); }
}
addEventListener('scroll',()=>onScroll(scrollY),{passive:true});
addEventListener('resize',()=>moveInd(activeLink));
function setMenu(open){
  document.body.classList.toggle('menu-open',open);
  burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',LANG==='pt'?(open?'Fechar menu':'Abrir menu'):(open?'Close menu':'Open menu'));$('#menu').setAttribute('aria-hidden',!open);
  if(lenis){open?lenis.stop():lenis.start()} else document.body.style.overflow=open?'hidden':'';
}
burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
$$('#menu a[href^="#"]').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))setMenu(false)});


/* ---------- i18n (EN default, PT toggle) ---------- */
const PT={"[EV] — portfolio 2026": "[EV] — portfólio 2026", "secure handshake…": "handshake seguro…", "> establishing TLS connection": "&gt; estabelecendo conexão TLS", "> verifying integrity": "&gt; verificando integridade", "> loading .NET · Java · Angular": "&gt; carregando .NET · Java · Angular", "> applying security policy": "&gt; aplicando política de segurança", "> access granted_": "&gt; acesso concedido_", "Work": "Trabalho", "Experience": "Experiência", "About": "Sobre", "Let's talk ↗": "Vamos conversar <span>↗</span>", "Work 02": "Trabalho <small>02</small>", "Experience 03": "Experiência <small>03</small>", "About 04": "Sobre <small>04</small>", "Contact 07": "Contato <small>07</small>", "Available for Application Security roles": "<i></i>Disponível para Application Security", "from code to vulnerability — and back.": "do código à vulnerabilidade — e de volta.", "Four years shipping production systems — from real-time home brokers to ERPs moving off COBOL. Now I bring a builder's eye to application security.": "Quatro anos entregando sistemas em produção — de home brokers em tempo real a ERPs saindo do COBOL. Agora levo esse olhar de quem constrói para a <strong>segurança de aplicações</strong>.", "Scroll": "<i></i>Role", "(01) — The shift": "(01) — A virada", "lower infrastructure cost for a cloud application, redesigned with AWS-recommended services — without giving up resilience or security.": "de custo de infraestrutura em uma aplicação cloud, redesenhada com serviços recomendados pela AWS — sem abrir mão de resiliência e segurança.", "years": "anos", "writing software that runs in production across fintech, ERP and consulting.": "escrevendo software que roda em produção, em fintech, ERP e consultoria.", "more actionable insights from a BI layer that unified ERP modules into reports and dashboards.": "mais insights acionáveis com um BI que integrou os módulos do ERP em relatórios e dashboards.", "CompTIA Security+ — the formal foundation for my move into Application Security.": "CompTIA Security+ — a base formal para a transição para Application Security.", "Selectedwork": "Prova de<br><span class=\"tech\">trabalho</span>", "(02) — Selected projects": "(02) — Projetos selecionados", "Drag or use the arrows": "Arraste ou use as setas", "Real-time": "Tempo real", "Modernization": "Modernização", "In progress": "Em andamento", "Cloud architecture at −70% cost": "Arquitetura cloud com −70% de custo", "I redesigned an application's architecture with AWS-recommended services, cutting infrastructure costs by over 70% while keeping it resilient and secure.": "Redesenhei a arquitetura de uma aplicação com serviços recomendados pela AWS, cortando mais de 70% do custo de infraestrutura e mantendo resiliência e segurança.", "AppSec lensFewer exposed parts, same protection: a leaner architecture is also a smaller attack surface.": "<b>Lente AppSec</b>Menos peças expostas, mesma proteção: arquitetura enxuta também é superfície de ataque menor.", "Architecture": "Arquitetura", "Cost": "Custo", "Real-time Home Broker": "Home Broker em tempo real", "I refactored a Home Broker dashboard in AngularJS and C# .NET, fixing bottlenecks in transaction updates: wrongly triggered hooks and unnecessary SignalR connections.": "Refatorei o dashboard de um Home Broker em AngularJS e C# .NET, corrigindo gargalos nas atualizações de transações: hooks disparados indevidamente e conexões SignalR desnecessárias.", "AppSec lensPersistent connections and financial data demand fine-grained control over who subscribes to what.": "<b>Lente AppSec</b>Conexões persistentes e dados financeiros pedem controle fino de quem assina o quê.", "From COBOL to the web": "Do COBOL para a web", "I migrated legacy COBOL programs to web applications (Angular, React and Vue on the front end; .NET C# and Spring on the back end), deployed on Linux and automated with Bash. I also built a BI layer that unified the ERP modules.": "Migrei programas legados em COBOL para aplicações web (Angular, React e Vue no front; .NET C# e Spring no back), com deploy em Linux e automação via Bash. Também montei um BI que integrou os módulos do ERP.", "AppSec lensEvery modernized legacy system gains a new attack surface — mapping it is part of the migration.": "<b>Lente AppSec</b>Todo legado modernizado ganha uma nova superfície de ataque — mapear isso faz parte da migração.", "Next chapter: AppSec": "Próximo capítulo: AppSec", "Hands-on, documented study of the OWASP Top 10, threat modeling and CI/CD pipeline security, applied to the kind of systems I already build: .NET/Java APIs and Angular/React front ends.": "Estudo prático e documentado de OWASP Top 10, modelagem de ameaças e segurança em pipelines CI/CD, aplicado sobre o tipo de sistema que eu já construo: APIs .NET/Java e front-ends Angular/React.", "GoalBridge development and security: fix at the source, not just report.": "<b>Objetivo</b>Unir desenvolvimento e segurança: corrigir na origem, não só reportar.", "Side projects": "Projetos pessoais", "React Portfolio & Flutter GIF Client": "Portfólio React &amp; GIF Client em Flutter", "A portfolio designed in Figma and built with React + TypeScript, i18n and animations, plus a Flutter/Dart app consuming the public GIPHY API.": "Portfólio desenhado no Figma e desenvolvido em React + TypeScript com i18n e animações, e um app Flutter/Dart que consome a API pública do GIPHY.", "Portfolio ↗": "Portfólio ↗", "(03) — Where I built": "(03) — Onde construí", "Hover for the security lens": "Passe o mouse para a lente de segurança", "09/2024 — present": "09/2024 — hoje", "New features and system optimization with C# .NET, Java Spring and Angular. Automated tests to keep releases stable, in agile teams spanning engineering, design and product.": "Novas features e otimização de sistemas com C# .NET, Java Spring e Angular. Testes automatizados para dar estabilidade às entregas, em times ágeis com desenvolvimento, design e produto.", "Security lensAutomated tests are the first line of defense against regressions — security ones included.": "<b>Lente de segurança</b>Testes automatizados são a primeira linha contra regressões — inclusive as de segurança.", "ERP development and migration of COBOL programs to the web (Angular, React, Vue / .NET and Spring). Linux deployments, Bash automation and a BI layer that unified ERP modules, with +25% actionable insights.": "Desenvolvimento de ERP e migração de programas COBOL para web (Angular, React, Vue / .NET e Spring). Deploy em Linux, automação com Bash e um BI que integrou os módulos do ERP, com +25% de insights acionáveis.", "Security lensLinux, scripts and business data: I learned hands-on what needs protecting in a management system.": "<b>Lente de segurança</b>Linux, scripts e dados de negócio: aprendi na prática o que precisa ser protegido em um sistema de gestão.", "Web applications for investment-market influencers, a Home Broker refactor (AngularJS + C# .NET) and an AWS architecture redesign at −70% cost.": "Aplicações web para influenciadores do mercado de investimentos, refatoração de Home Broker (AngularJS + C# .NET) e redesenho de arquitetura AWS com −70% de custo.", "Security lensFintech puts money, real time and cloud in the same equation — a great place to start thinking about risk.": "<b>Lente de segurança</b>Fintech coloca dinheiro, tempo real e cloud na mesma equação — ótimo lugar para começar a pensar em risco.", "(04) — About": "(04) — Sobre", "A developer shaped in the field. Security by choice.": "Desenvolvedor por formação de campo. <span class=\"tech\">Segurança</span> por escolha.", "I started in mechanical engineering at UNESP, moved into software and I'm now studying Computer Science. Along the way I wrote C#, Java, TypeScript, Python and even lived alongside COBOL — always close to production, CI/CD and the cloud.": "Comecei pela engenharia mecânica na UNESP, migrei para o software e hoje curso Ciência da Computação. Nesse caminho escrevi C#, Java, TypeScript, Python e até convivi com COBOL — sempre com o pé em produção, CI/CD e cloud.", "Curiosity about security was always there. With CompTIA Security+ it became a direction: I want to work as an Application Security Engineer, helping teams build secure software from the very first commit — because I know what it's like on the other side of the code review.": "A curiosidade por segurança sempre esteve lá. Com a <strong>CompTIA Security+</strong>, ela virou direção: quero atuar como <strong>Application Security Engineer</strong>, ajudando times a construir software seguro desde o primeiro commit — porque eu sei como é estar do outro lado do code review.", "EducationComputer Science — UNISAGRADO": "<span>Formação</span>Ciência da Computação — UNISAGRADO", "BeforeMechanical Engineering — UNESP": "<span>Antes</span>Engenharia Mecânica — UNESP", "LanguagesPortuguese (native) · English B2": "<span>Idiomas</span>Português nativo · Inglês B2", "Based inSão Paulo, Brazil · remote": "<span>Base</span>São Paulo, Brasil · remoto", "(05) — Certification": "(05) — Certificação", "Threats, vulnerabilities, secure architecture, operations and risk management — the foundation that connects my development experience to AppSec work.": "Fundamentos de ameaças, vulnerabilidades, arquitetura segura, operações e gestão de risco — a base que conecta minha experiência em desenvolvimento ao trabalho de AppSec.", "Also": "Também", "AWS cloud certification, put into practice cutting infrastructure costs at NT Capital.": "Certificação em cloud AWS, colocada em prática na redução de custo de infraestrutura na NT Capital.", "Studying now": "Estudando agora", "Security-focused code review, SAST/DAST and CI/CD pipeline security.": "Revisão de código com foco em segurança, SAST/DAST e segurança em pipelines CI/CD.", "Toolkit": "Ferramentas", "Two sides of the same code": "Dois lados do mesmo código", "I build with": "Construo com", "Development": "Desenvolvimento", "Current focus": "Foco atual", "Application security": "Segurança de aplicações", "CI/CD security": "Segurança em CI/CD", "Authentication & Authorization": "Autenticação &amp; Autorização", "Risk management": "Gestão de risco", "Areas I'm going deeper into right now, backed by Security+ and by experience building the very systems they protect.": "Áreas em que estou aprofundando agora, apoiado pela Security+ e pela experiência construindo os sistemas que elas protegem.", "(07) — Contact · Open to Application Security roles": "(07) — Contato · Aberto a vagas de Application Security", "Let's": "Vamos", "talk ↗": "<span class=\"tech\">conversar</span> ↗", "Design & code by Eduardo · images generated with Higgsfield": "Design &amp; código por Eduardo · imagens geradas com Higgsfield", "Back to top ↑": "Voltar ao topo ↑", "Email copied": "E-mail copiado"};
const PT_ATTR=[["img[src=\"assets/cover-cloud.webp\"]", "alt", "Servidores cromados desinflando, simbolizando redução de custo"], ["img[src=\"assets/cover-broker.webp\"]", "alt", "Gráfico de candles de gelatina verde com partículas de dados"], ["img[src=\"assets/cover-legacy.webp\"]", "alt", "Cartão perfurado e terminal antigo se transformando em janela de navegador"], ["img[src=\"assets/cover-appsec.webp\"]", "alt", "Lupa cromada encontrando um bug dentro de blocos de código"], ["img[src=\"assets/cover-side.webp\"]", "alt", "Smartphone e janela de vidro com interface abstrata"], ["#pimg", "alt", "Retrato de Eduardo Valencio"], ["#prev", "aria-label", "Anterior"], ["#next", "aria-label", "Próximo"], ["#carousel", "data-cursor", "Arraste"], [".nav__links", "aria-label", "Seções"], [".menu__links", "aria-label", "Menu"]];
const MAN={en:"I spent the last few years on the builder's side: APIs that move money, real-time dashboards, legacy systems becoming web apps. That's where I learned where software tends to give way — and that's exactly where I want to work now.",pt:"Passei os últimos anos do lado de quem constrói: APIs que movimentam dinheiro, dashboards em tempo real, sistemas legados virando web. Foi ali que aprendi onde o software costuma ceder — e é exatamente ali que quero trabalhar agora."};
const META={en:{title:'Eduardo Valencio — Secure by design',desc:'Eduardo Valencio — full-stack engineer (.NET, Java, Angular) moving into Application Security. CompTIA Security+.'},
            pt:{title:'Eduardo Valencio — Secure by design',desc:'Eduardo Valencio — engenheiro full-stack (.NET, Java, Angular) em transição para Application Security. CompTIA Security+.'}};
let LANG='en', manSplit=false, manProg=0, manWs=[];
const i18n=[];
const norm=t=>t.replace(/\s+/g,' ').trim();
function renderManifesto(){
  const p=$('#manifesto'); if(!p) return;
  if(!manSplit){ p.textContent=MAN[LANG]; return; }
  p.innerHTML=MAN[LANG].split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');
  manWs=$$('.w',p); paintManifesto();
}
function paintManifesto(){ const k=manProg*manWs.length; manWs.forEach((w,i)=>w.style.opacity=i<k?1:.14); }
function initI18n(){
  for(const el of $$('body *')){
    if(el.closest('script,style,#manifesto')) continue;
    const k=norm(el.textContent); if(!k||!(k in PT)) continue;
    if([...el.children].some(c=>norm(c.textContent)===k)) continue;
    i18n.push({el,en:el.innerHTML,pt:PT[k]});
  }
  PT_ATTR.forEach(([sel,attr,pt])=>$$(sel).forEach(el=>i18n.push({el,attr,en:el.getAttribute(attr),pt})));
  $$('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.l)));
}
function setLang(l){
  if(l!=='pt') l='en'; LANG=l;
  i18n.forEach(e=>{ if(e.attr) e.el.setAttribute(e.attr,e[l]); else e.el.innerHTML=e[l]; });
  document.documentElement.lang= l==='pt'?'pt-BR':'en';
  document.title=META[l].title; const md=$('meta[name="description"]'); if(md) md.setAttribute('content',META[l].desc);
  $$('.lang button').forEach(b=>{const on=b.dataset.l===l; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on)});
  $$('[data-scramble]').forEach(a=>a._label=a.textContent);
  burger.setAttribute('aria-label',l==='pt'?'Abrir menu':'Open menu');
  renderManifesto();
  try{localStorage.setItem('ev-lang',l)}catch(e){}
  requestAnimationFrame(()=>{ moveInd(activeLink); if(hasG) ScrollTrigger.refresh(); });
}

/* ---------- clock ---------- */
const clock=$('#clock');
const tick=()=>{try{clock.textContent='São Paulo — '+new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour12:false})}catch(e){}};
tick(); setInterval(tick,1000);

/* ---------- marquee ---------- */
const dev=['C# .NET','Java Spring','Angular','React','TypeScript','AWS','Docker','PostgreSQL','Linux'];
const sec=['OWASP Top 10','Threat Modeling','Secure SDLC','SAST / DAST','Security+'];
const star='<svg class="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"/></svg>';
let items=''; dev.forEach((d,i)=>{items+=`<span class="marquee__item">${d}${star}</span>`; if(sec[i]) items+=`<span class="marquee__item sec">${sec[i]}${star}</span>`;});
$('#marq').innerHTML=items+items;

/* ---------- cursor ---------- */
const cur=$('.cursor'), labWrap=$('.cursor-wrap-label'), lab=$('.cursor__label');
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
if(fine){
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
  const loop=()=>{cx+=(mx-cx)*.2;cy+=(my-cy)*.2;cur.style.transform=`translate(${mx}px,${my}px)`;labWrap.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop)};loop();
  $$('[data-hover],a,button').forEach(el=>{el.addEventListener('pointerenter',()=>cur.classList.add('is-hover'));el.addEventListener('pointerleave',()=>cur.classList.remove('is-hover'))});
  $$('[data-cursor]').forEach(el=>{
    el.addEventListener('pointerenter',()=>{lab.textContent=el.dataset.cursor;cur.classList.add('is-label');lab.style.transform='translate(-50%,-50%) scale(1)'});
    el.addEventListener('pointerleave',()=>{cur.classList.remove('is-label');lab.style.transform=''});
  });
}

/* ---------- scramble nav ---------- */
const glyphs='!<>-_\\/[]{}—=+*^?#01';
$$('[data-scramble]').forEach(el=>{
  el._label=el.textContent; let raf;
  el.addEventListener('pointerenter',()=>{
    const orig=el._label; let f=0; cancelAnimationFrame(raf);
    const run=()=>{ el.textContent=orig.split('').map((c,i)=> i< f/2 ? orig[i] : glyphs[Math.random()*glyphs.length|0]).join(''); f++; if(f/2<=orig.length) raf=requestAnimationFrame(run); else el.textContent=orig; };
    run();
  });
});

/* ---------- typed whoami ---------- */
const typed=$('#typed'), target='application_security_engineer';
function typeIt(){ let i=0; const t=setInterval(()=>{typed.textContent=target.slice(0,++i); if(i>=target.length) clearInterval(t)},45); }

/* ---------- preloader ---------- */
function scrambleTo(el,text,dur=600){
  const start=performance.now(); const G='!<>-_/[]{}=+*^?#01ABCDEF';
  const run=t=>{const k=Math.min(1,(t-start)/dur); const n=Math.floor(k*text.length);
    el.textContent=text.slice(0,n)+text.slice(n).replace(/[^ ]/g,()=>G[Math.random()*G.length|0]);
    if(k<1) requestAnimationFrame(run); else el.textContent=text;};
  requestAnimationFrame(run);
}
function intro(done){
  const count=$('#count'), bar=$('#lbar'), lines=$$('#llog > div');
  if(reduce||!hasG){ $('#loader').remove(); done(); return; }
  const o={v:0};
  const tl=gsap.timeline();
  tl.timeScale(innerWidth<820?1.3:1);
  tl.call(()=>scrambleTo($('#lname'),'Eduardo Valencio',1400),null,0);
  tl.to(o,{v:100,duration:2.6,ease:'power2.inOut',onUpdate(){count.textContent=String(Math.round(o.v)).padStart(3,'0');bar.style.width=o.v+'%'}},0);
  lines.forEach((l,i)=>tl.to(l,{opacity:1,y:0,duration:.35,ease:'expo.out'},.15+i*.5));
  tl.to('#llog, .loader__name, .loader__top',{opacity:0,duration:.3},2.75);
  tl.to('#loader',{yPercent:-100,duration:1.05,ease:'expo.inOut'},2.9);
  tl.add(done,3.2);
}

/* ---------- carousel ---------- */
function initCarousel(){
  const car=$('#carousel'),track=$('#track'),cards=$$('.card',track),n=cards.length;
  const cc=$('#ccount'),prog=$('#cprog');
  let x=0,tx=0,down=false,sx=0,st=0,moved=0,vel=0,lastX=0;
  const max=()=>Math.max(0,track.scrollWidth-car.clientWidth+parseFloat(getComputedStyle(car).paddingLeft)*2);
  const step=()=>cards[0].offsetWidth+parseFloat(getComputedStyle(track).gap);
  const clamp=v=>Math.min(0,Math.max(-max(),v));
  const idx=()=>Math.min(n-1,Math.round(-tx/step()));
  const update=()=>{const i=idx();cc.textContent=String(i+1).padStart(2,'0')+' / '+String(n).padStart(2,'0');prog.style.width=((-tx/(max()||1))*80+20)+'%'};
  car.addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;down=true;moved=0;sx=e.clientX;st=tx;lastX=e.clientX;car.classList.add('is-drag');car.setPointerCapture(e.pointerId)});
  car.addEventListener('pointermove',e=>{if(!down)return;const d=e.clientX-sx;moved=Math.abs(d);vel=e.clientX-lastX;lastX=e.clientX;tx=st+d;const m=-max();if(tx>0)tx*=.35;if(tx<m)tx=m+(tx-m)*.35;update()});
  const end=()=>{if(!down)return;down=false;car.classList.remove('is-drag');tx=clamp(tx+vel*12);tx=clamp(-Math.round(-tx/step())*step());update()};
  car.addEventListener('pointerup',end);car.addEventListener('pointercancel',end);
  car.addEventListener('click',e=>{if(moved>6){e.preventDefault();e.stopPropagation()}},true);
  $('#next').onclick=()=>{tx=clamp(-(idx()+1)*step());update()};
  $('#prev').onclick=()=>{tx=clamp(-(idx()-1)*step());update()};
  car.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();tx=clamp(tx-e.deltaX);update()}},{passive:false});
  const loop=()=>{x+=(tx-x)*(down?.35:.09);track.style.transform=`translate3d(${x}px,0,0)`;
    cards.forEach((c,i)=>{const r=c.getBoundingClientRect();const off=(r.left+r.width/2-innerWidth/2)/innerWidth;const img=c.querySelector('img');img.style.transform=`scale(1.12) translateX(${off*-6}%)`});
    requestAnimationFrame(loop)};
  loop(); update(); addEventListener('resize',()=>{tx=clamp(tx);update()});
}

/* ---------- badge tilt ---------- */
function initTilt(){
  const b=$('#badge'); if(!fine||reduce) return;
  b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;b.style.transform=`rotateY(${(px-.5)*14}deg) rotateX(${(.5-py)*12}deg)`;b.style.setProperty('--gx',px*100+'%');b.style.setProperty('--gy',py*100+'%')});
  b.addEventListener('pointerleave',()=>{b.style.transform=''});
}

/* ---------- terminal window tilt ---------- */
function initWin(){
  const w=$('#win'); if(!w||!fine||reduce) return;
  w.parentElement.addEventListener('pointermove',e=>{const r=w.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;w.classList.add('is-tilt');w.style.transform=`rotateY(${(px-.5)*18}deg) rotateX(${(.5-py)*14}deg)`;w.style.setProperty('--gx',px*100+'%');w.style.setProperty('--gy',py*100+'%')});
  w.parentElement.addEventListener('pointerleave',()=>{w.classList.remove('is-tilt');w.style.transform=''});
}

/* ---------- magnetic ---------- */
function initMagnetic(){
  if(!fine||reduce) return;
  $$('.magnetic').forEach(m=>{
    m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
    m.addEventListener('pointerleave',()=>{m.style.transition='transform .6s cubic-bezier(.2,1.6,.4,1)';m.style.transform='';setTimeout(()=>m.style.transition='',600)});
  });
}

/* ---------- copy email ---------- */
$('#copy').addEventListener('click',async()=>{
  const t=$('#toast');
  try{await navigator.clipboard.writeText('eduardo.valencio.santos@gmail.com');t.textContent=LANG==='pt'?'E-mail copiado ✓':'Email copied ✓'}catch(e){t.textContent='eduardo.valencio.santos@gmail.com'}
  t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);
});

/* ---------- xp touch toggle ---------- */
$$('.xp__row').forEach(r=>r.addEventListener('click',()=>r.classList.toggle('open')));

/* ---------- scroll animations ---------- */
function initScroll(){
  if(!hasG||reduce){ $$('.rv').forEach(e=>{e.style.opacity=1;e.style.transform='none'}); return; }
  // reveals
  $$('.rv').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
  // manifesto word scrub
  const p=$('#manifesto'); manSplit=true; renderManifesto();
  ScrollTrigger.create({trigger:p,start:'top 80%',end:'bottom 45%',scrub:true,onUpdate:s=>{manProg=s.progress;paintManifesto()}});
  // counters
  $$('[data-count]').forEach(el=>{const o={v:0};gsap.to(o,{v:+el.dataset.count,duration:1.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'},onUpdate(){el.textContent=Math.round(o.v)}})});
  // light zone colour switch
  ScrollTrigger.create({trigger:'#lightzone',start:'top 55%',end:'bottom 45%',toggleClass:{targets:document.body,className:'is-light'}});
  // hero title parallax out
  gsap.to('.hero__title',{yPercent:-18,opacity:.25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  // portrait parallax
  gsap.fromTo('#pimg',{yPercent:-8},{yPercent:4,ease:'none',scrollTrigger:{trigger:'.portrait',start:'top bottom',end:'bottom top',scrub:true}});
  // contact title lines
  gsap.from('.contact__big .line>span',{yPercent:110,duration:1.2,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:'.contact__big',start:'top 85%'}});
  // card stagger
  gsap.from('.card',{x:120,opacity:0,duration:1.2,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:'#carousel',start:'top 85%'}});
}

/* ---------- boot ---------- */
function start(){
  document.body.classList.remove('is-loading');
  lenis&&lenis.start();
  if(hasG&&!reduce){
    gsap.from('.hero__title .line>span',{yPercent:115,duration:1.3,ease:'expo.out',stagger:.1});
    gsap.from('.hero__kicker span',{y:20,opacity:0,duration:.9,ease:'expo.out',stagger:.06,delay:.2});
    gsap.to('.hero .rv',{opacity:1,y:0,duration:1.1,ease:'expo.out',stagger:.08,delay:.4});
    gsap.from('.hero__meta > *',{y:-14,opacity:0,duration:1,ease:'expo.out',stagger:.08,delay:.35});
    gsap.from('.nav__bar',{y:-30,opacity:0,duration:1,ease:'expo.out',delay:.3});
  }
  setTimeout(typeIt,900);
  initScroll();
}
initI18n(); (()=>{let l='en';try{l=localStorage.getItem('ev-lang')||'en'}catch(e){} if(l==='pt') setLang('pt');})();
initCarousel(); initTilt(); initWin(); initMagnetic();
intro(start);
})();
