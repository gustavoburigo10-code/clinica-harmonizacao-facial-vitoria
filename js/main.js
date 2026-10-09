/* ==========================================================================
   DRA. VITÓRIA CALDEIRA — JavaScript do site
   Suave, discreto e acessível. Sem bibliotecas e sem dependências.
   Tudo é verificado pela posição de rolagem (rAF), o que funciona também
   em abas em segundo plano, onde o IntersectionObserver é suspensa.
   1. Header com glassmorphism ao rolar
   2. Menu mobile
   3. Animações de entrada (fade-in / slide-up)
   4. Contadores da seção "Sobre"
   5. Parallax sutil
   6. Destaque do menu ativo
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var stats = Array.prototype.slice.call(document.querySelectorAll('.stat'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__list a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  var heroImg = document.querySelector('.hero__figure');
  var ctaBg = document.querySelector('.cta__bg');

  /* ---------------------------- 1. HEADER -------------------------------- */
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 40);
    revealCheck();
    statsCheck();
    activeCheck();
    parallax(y);
    ticking = false;
  }

  function requestTick() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  /* --------------------------- 2. MENU MOBILE ---------------------------- */
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) setMenu(false);
  });

  /* --------------------- 3. ANIMAÇÕES DE ENTRADA ------------------------- */
  function revealCheck() {
    if (!reveals.length) return;
    var vh = window.innerHeight;
    var pending = [];

    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.classList.contains('is-visible')) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92) pending.push(el);
    }
    pending.forEach(function (el) { el.classList.add('is-visible'); });
    reveals = reveals.filter(function (el) { return !el.classList.contains('is-visible'); });
  }

  /* ------------------------ 4. CONTADORES (Sobre) ------------------------ */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';

    if (reduced) { el.textContent = prefix + target + suffix; return; }

    var start = null;
    var duration = 1600;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  function statsCheck() {
    if (!stats.length) return;
    var vh = window.innerHeight;
    var pending = [];

    for (var i = 0; i < stats.length; i++) {
      var r = stats[i].getBoundingClientRect();
      if (r.top < vh * 0.9) pending.push(stats[i]);
    }
    pending.forEach(animateCount);
    stats = stats.filter(function (el) { return pending.indexOf(el) === -1; });
  }

  /* --------------------------- 5. PARALLAX ------------------------------- */
  function parallax(y) {
    if (reduced || window.innerWidth < 960) return;

    if (heroImg) {
      var offset = Math.max(-40, Math.min(y * 0.06, 40));
      heroImg.style.transform = 'translate3d(0,' + offset + 'px,0)';
    }

    if (ctaBg) {
      var rect = ctaBg.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        ctaBg.style.transform = 'translate3d(0,' + ((p - 0.5) * 34).toFixed(2) + 'px,0) scale(1.08)';
      }
    }
  }

  /* ------------------- 6. MENU ATIVO AO ROLAR ---------------------------- */
  function activeCheck() {
    if (!sections.length) return;
    var marker = window.innerHeight * 0.35;
    var current = sections[0];

    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= marker) current = sec;
    });

    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id);
    });
  }

  /* ------------------------------ INÍCIO --------------------------------- */
  onScroll();
  window.__siteReady = true;   /* sinaliza que a página está ativa */
})();
