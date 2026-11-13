// Continuous archive ribbon. Wrapping, capped frame delta and exponential drag
// momentum adapted from React Bits ScrollVelocity by David Haz (2026).
// https://github.com/DavidHDev/react-bits/blob/main/src/content/TextAnimations/ScrollVelocity/ScrollVelocity.jsx
// MIT + Commons Clause; see THIRD_PARTY_NOTICES.md. Curved DOM layout is custom.
(() => {
  const root = document.querySelector('.hero-art');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  root.classList.add('archive-ribbon');
  root.setAttribute('role', 'region');
  root.setAttribute('aria-label', 'Moving archive gallery');
  root.innerHTML = '<div class="ribbon-toolbar"><span>From the archive</span><div class="ribbon-actions"><button class="ribbon-prev" aria-label="Previous archive story">&#8592;</button><button class="ribbon-pause">Pause motion</button><button class="ribbon-next" aria-label="Next archive story">&#8594;</button></div></div><div class="ribbon-stage"></div><p class="ribbon-hint">Drag to browse. Select an article to read more.</p><p class="ribbon-status sr-only" role="status"></p>';
  const stage = root.querySelector('.ribbon-stage');
  const pause = root.querySelector('.ribbon-pause');
  const wrap = (min, max, value) => ((value - min) % (max - min) + max - min) % (max - min) + min;
  let offset = 0, width = 260, step = 288, paused = false, visible = true, last = 0, momentum = 0;
  const drag = {active:false, x:0, lastTime:0, travel:0, pointer:null};
  const cards = Array.from({length:stories.length * 2}, (_, index) => {
    const story = stories[index % stories.length];
    const card = document.createElement('button');
    card.type = 'button'; card.className = 'ribbon-card'; card.dataset.story = index % stories.length;
    card.setAttribute('aria-label', 'Explore ' + story.name);
    if (index >= stories.length) card.tabIndex = -1;
    const img = document.createElement('img');
    img.src = story.image; img.alt = ''; img.draggable = false;
    const title = document.createElement('span'); title.className = 'ribbon-card-title'; title.textContent = story.name;
    card.append(img, title); stage.append(card);
    card.onclick = event => {if (event.detail === 0 || drag.travel < 6) openArtifact(index % stories.length);};
    card.onfocus = () => {
      if (card.matches(':focus-visible')) {paused = true; momentum = 0; offset = -index * step; paint(); updateControl();}
    };
    return card;
  });
  function updateControl() {
    pause.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion';
    pause.disabled = reduced.matches;
    pause.setAttribute('aria-pressed', String(paused || reduced.matches));
  }
  function paint() {
    const total = cards.length * step, half = stage.clientWidth / 2;
    cards.forEach((card, i) => {
      const x = wrap(-total / 2, total / 2, i * step + offset);
      const n = x / Math.max(half, 320);
      card.style.width = width + 'px';
      card.style.transform = `translateX(${x - width / 2}px) translateY(${n * n * 50}px) rotate(${n * 12}deg)`;
    });
  }
  function measure() {
    const oldStep = step;
    width = Math.max(220, Math.min(300, stage.clientWidth * .23)); step = width + 28;
    offset = offset / oldStep * step;
    paint();
  }
  function navigate(direction) {
    momentum = 0;
    offset = Math.round(offset / step) * step - direction * step;
    paint(); updateControl();
    const index = wrap(0, stories.length, -Math.round(offset / step));
    root.querySelector('.ribbon-status').textContent = stories[index].name;
  }
  pause.onclick = () => {paused = !paused; momentum = 0; updateControl();};
  root.querySelector('.ribbon-prev').onclick = () => navigate(-1);
  root.querySelector('.ribbon-next').onclick = () => navigate(1);
  stage.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); navigate(event.key === 'ArrowRight' ? 1 : -1);
    const index = wrap(0, stories.length, -Math.round(offset / step)); cards[index].focus();
  });
  stage.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag.active = true; drag.x = event.clientX; drag.lastTime = event.timeStamp; drag.travel = 0; drag.pointer = event.pointerId; momentum = 0;
    stage.classList.add('is-dragging');
    // Prevent mouse focus from shifting while taking hold of a moving card.
    if (event.pointerType === 'mouse') event.preventDefault();
  });
  stage.addEventListener('pointermove', event => {
    if (!drag.active || event.pointerId !== drag.pointer) return;
    const dx = event.clientX - drag.x, elapsed = Math.max(event.timeStamp - drag.lastTime, 1);
    drag.travel += Math.abs(dx); offset += dx;
    momentum = dx / elapsed * 1000;
    drag.x = event.clientX; drag.lastTime = event.timeStamp;
    if (drag.travel > 6 && !stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
    paint();
  });
  function release(event) {
    if (event.pointerId !== drag.pointer) return;
    drag.active = false; stage.classList.remove('is-dragging');
    if (event.type === 'pointercancel' || event.timeStamp - drag.lastTime > 90 || reduced.matches) momentum = 0;
    momentum = Math.max(-1600, Math.min(1600, momentum));
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
  }
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  new ResizeObserver(measure).observe(stage);
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting;}).observe(root);
  reduced.addEventListener('change', () => {momentum = 0; updateControl();});
  function frame(now) {
    const delta = Math.min(now - last, 64); last = now;
    const blocked = document.hidden || !visible || document.querySelector('dialog[open]:not(#persona-welcome)');
    if (!blocked && !drag.active && !reduced.matches && !paused) {
      offset += (-38 + momentum) * delta / 1000;
      momentum *= Math.exp(-delta / 420);
      if (Math.abs(momentum) < 4) momentum = 0;
      paint();
    }
    requestAnimationFrame(frame);
  }
  measure(); updateControl(); requestAnimationFrame(frame);
})();

// Reveal archive sections once as they enter the viewport.
const archiveReveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');archiveReveal.unobserve(entry.target);}});
}, {threshold:.1});
document.querySelectorAll('.collection-section .section-top,.object-card,.ask-section').forEach(el=>{el.classList.add('reveal-ready');archiveReveal.observe(el);});
