// scripts/bg.js
// Generates background orbs, bubbles, sparkles, and fish-school elements
// Moves per-element decorative configuration into JavaScript.

(function () {
  const orbConfigs = [
    { width: '340px', height: '340px', background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(210,250,255,0.95) 20%, rgba(91,229,255,0.55) 52%, transparent 100%)', top: '-100px', left: '-80px', animationDuration: '22s', animationDelay: '0s' },
    { width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(210,255,245,0.98) 0%, rgba(77,242,190,0.78) 28%, rgba(40,170,255,0.24) 65%, transparent 100%)', top: '28%', right: '-60px', animationDuration: '18s', animationDelay: '-6s' },
    { width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(132,255,214,0.9) 18%, rgba(97,229,255,0.5) 58%, transparent 100%)', bottom: '10%', left: '18%', animationDuration: '26s', animationDelay: '-12s' },
    { width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(235,245,255,0.95) 0%, rgba(145,200,255,0.9) 24%, rgba(70,120,255,0.34) 60%, transparent 100%)', bottom: '-70px', right: '12%', animationDuration: '30s', animationDelay: '-4s' },
    { width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(140,245,255,0.82) 24%, rgba(72,190,255,0.34) 62%, transparent 100%)', top: '55%', left: '5%', animationDuration: '15s', animationDelay: '-9s' },
  ];
  const bubbleConfigs = [
    { width: '28px', height: '28px' },
    { width: '18px', height: '18px' },
    { width: '42px', height: '42px' },
    { width: '14px', height: '14px' },
    { width: '34px', height: '34px' },
    { width: '22px', height: '22px' },
    { width: '50px', height: '50px' },
    { width: '16px', height: '16px' },
    { width: '36px', height: '36px' },
    { width: '24px', height: '24px' },
  ];
  const sparkConfigs = [
    { width: '4px', height: '4px', top: '8%', left: '10%', animationDuration: '3.2s', animationDelay: '0s' },
    { width: '3px', height: '3px', top: '18%', left: '70%', animationDuration: '2.5s', animationDelay: '-1s' },
    { width: '5px', height: '5px', top: '40%', left: '88%', animationDuration: '4.0s', animationDelay: '-0.5s' },
    { width: '3px', height: '3px', top: '65%', left: '22%', animationDuration: '3.6s', animationDelay: '-2s' },
    { width: '4px', height: '4px', top: '80%', left: '55%', animationDuration: '2.8s', animationDelay: '-1.5s' },
    { width: '3px', height: '3px', top: '30%', left: '45%', animationDuration: '3.0s', animationDelay: '-0.8s' },
    { width: '5px', height: '5px', top: '55%', left: '5%', animationDuration: '4.4s', animationDelay: '-3s' },
    { width: '3px', height: '3px', top: '90%', left: '80%', animationDuration: '2.2s', animationDelay: '-0.3s' },
  ];
  const fishConfigs = [
    { emoji: '🐠', top: '18%', left: '-8%', fontSize: '2.2rem', animationDuration: '24s', animationDelay: '0s' },
    { emoji: '🐟', top: '30%', left: '-10%', fontSize: '1.8rem', animationDuration: '17s', animationDelay: '-7s' },
    { emoji: '🐡', top: '42%', left: '-12%', fontSize: '2.4rem', animationDuration: '22s', animationDelay: '-2s' },
    { emoji: '🐠', top: '58%', left: '-8%', fontSize: '1.7rem', animationDuration: '19s', animationDelay: '-10s' },
    { emoji: '🐟', top: '72%', left: '-14%', fontSize: '2.1rem', animationDuration: '26s', animationDelay: '-4s' },
    { emoji: '🐡', top: '80%', left: '-6%', fontSize: '1.5rem', animationDuration: '16s', animationDelay: '-12s' },
    { emoji: '🐠', top: '10%', left: '-10%', fontSize: '1.9rem', animationDuration: '20s', animationDelay: '-15s' },
  ];

  function make(parentSelector, tag, className, count, contents) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return [];
    const items = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (typeof contents === 'function') el.textContent = contents(i);
      else if (contents != null) el.textContent = contents;
      parent.appendChild(el);
      items.push(el);
    }
    return items;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const orbs = make('.bg-orbs', 'div', 'orb', orbConfigs.length);
    const bubbles = make('.bubbles', 'div', 'bubble', bubbleConfigs.length);
    const sparks = make('.sparkles', 'div', 'spark', sparkConfigs.length);
    const fish = make('.fish-school', 'span', 'fish', fishConfigs.length, (i) => fishConfigs[i].emoji);

    orbs.forEach((el, i) => Object.assign(el.style, orbConfigs[i]));
    bubbles.forEach((el, i) => Object.assign(el.style, bubbleConfigs[i]));
    sparks.forEach((el, i) => Object.assign(el.style, sparkConfigs[i]));
    fish.forEach((el, i) => Object.assign(el.style, fishConfigs[i]));

    // Small enhancement: randomly stagger animation-duration slightly for each fish/bubble
    fish.forEach((el) => {
      const base = parseFloat(getComputedStyle(el).animationDuration) || 18;
      const extra = (Math.random() * 8) - 4; // -4..+4s
      el.style.animationDuration = Math.max(8, base + extra) + 's';
      el.style.animationDelay = (Math.random() * -12) + 's';
    });

    bubbles.forEach((el) => {
      el.style.animationDuration = (8 + Math.random() * 18) + 's';
      el.style.animationDelay = (-Math.random() * 12) + 's';
      el.style.left = (5 + Math.random() * 90) + '%';
    });

    // Slightly jitter orb animation durations
    orbs.forEach((el, i) => {
      el.style.animationDuration = (18 + i * 4 + Math.random() * 8) + 's';
    });
  });
})();
