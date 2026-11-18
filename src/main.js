import './styles/index.css';
import { posthogLog } from './lib/posthog.js';
import { $, reduceMotion } from './lib/env.js';
import { initI18n, redirectToPreferredLanguage } from './features/i18n.js';
import { initClock } from './features/clock.js';
import { initMarquee } from './features/marquee.js';
import { initSmoothScroll, unlockScroll } from './features/smooth-scroll.js';
import { initNav } from './features/nav.js';
import { initCursor } from './features/cursor.js';
import { initCarousel } from './features/carousel.js';
import { initTilt } from './features/tilt.js';
import { initMagnetic } from './features/magnetic.js';
import { initContact } from './features/contact.js';
import { initExperience } from './features/experience.js';
import { initManifesto } from './features/manifesto.js';
import { initScrollEffects } from './features/scroll-fx.js';
import { playIntro } from './features/intro.js';
import { playHeroEntrance } from './features/hero.js';

function boot() {
  posthogLog.info('portfolio boot started', { locale: document.documentElement.lang });

  // Everything interactive is wired up behind the preloader...
  initI18n();
  initClock();
  initMarquee();
  initSmoothScroll();
  initNav();
  initCursor();
  initCarousel();
  initTilt($('#badge'), { rotateY: 14, rotateX: 12 });
  initTilt($('#win'), { rotateY: 18, rotateX: 14, area: $('#win').parentElement });
  initMagnetic();
  initContact();
  initExperience();

  // ...then the page animates in once the preloader hands over.
  playIntro().then(() => {
    document.body.classList.remove('is-loading');
    unlockScroll();
    playHeroEntrance();
    if (!reduceMotion) {
      initManifesto();
      initScrollEffects();
    }
    posthogLog.info('portfolio interactive experience ready', { reduced_motion: reduceMotion });
  });
}

if (!redirectToPreferredLanguage()) boot();
