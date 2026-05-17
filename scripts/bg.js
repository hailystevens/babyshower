// scripts/bg.js
// Generates background orbs, bubbles, sparkles, and fish-school elements
// Keeps ordering consistent with existing CSS nth-child rules.

(function () {
  function make(parentSelector, tag, className, count, contents) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    for (let i = 0; i < count; i++) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (typeof contents === 'function') el.innerHTML = contents(i);
      else if (contents != null) el.innerHTML = contents;
      parent.appendChild(el);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Orbs (5)
    make('.bg-orbs', 'div', 'orb', 5);

    // Bubbles (10)
    make('.bubbles', 'div', 'bubble', 10);

    // Sparks (8)
    make('.sparkles', 'div', 'spark', 8);

    // Fish school (7) — keep same emoji sequence as before
    const fishEmojis = ['🐠','🐟','🐡','🐠','🐟','🐡','🐠'];
    make('.fish-school', 'span', 'fish', fishEmojis.length, (i) => fishEmojis[i]);

    // Small enhancement: randomly stagger animation-duration slightly for each fish/bubble
    document.querySelectorAll('.fish').forEach((el, idx) => {
      const base = parseFloat(getComputedStyle(el).animationDuration) || 18;
      const extra = (Math.random() * 8) - 4; // -4..+4s
      el.style.animationDuration = Math.max(8, base + extra) + 's';
      el.style.animationDelay = (Math.random() * -12) + 's';
    });

    document.querySelectorAll('.bubble').forEach((el) => {
      el.style.animationDuration = (8 + Math.random() * 18) + 's';
      el.style.animationDelay = (-Math.random() * 12) + 's';
      el.style.left = (5 + Math.random() * 90) + '%';
    });

    // Slightly jitter orb animation durations
    document.querySelectorAll('.orb').forEach((el, i) => {
      el.style.animationDuration = (18 + i * 4 + Math.random() * 8) + 's';
      el.style.top = el.style.top || '';
    });
  });
})();
