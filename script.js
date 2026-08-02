/**
 * Portfolio - Interactive Features
 * Author: Feng Qiang
 * Vanilla JS - no dependencies
 */

(function () {
  'use strict';

  // ===== Navigation scroll effect =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ===== Mobile nav toggle =====
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
    });
  });

  // ===== Scroll reveal animation =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add fade-in class to elements
  const revealElements = document.querySelectorAll(
    '.section-header, .about-text, .about-stats, .stat-card, ' +
    '.skill-category, .project-card, .timeline-item, .contact-card'
  );

  revealElements.forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ===== Animated stat counters =====
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNums.forEach(function (stat) {
      const rawText = stat.textContent;
      const targetNum = parseInt(rawText, 10);
      if (isNaN(targetNum)) return;

      const suffix = rawText.replace(/\d+/g, '').trim();
      let current = 0;
      const duration = 1200;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(eased * targetNum);
        stat.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          stat.textContent = targetNum + suffix;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger when about section is visible
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStats();
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    aboutObserver.observe(aboutSection);
  }

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70; // nav height
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Active nav link on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(function (item) {
      item.style.color = '';
      if (item.getAttribute('href') === '#' + current) {
        item.style.color = 'var(--text-primary)';
      }
    });
  });

  // ===== Project card hover effect =====
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      const visual = card.querySelector('.project-visual');
      if (visual) {
        visual.style.borderColor = 'var(--accent-blue)';
      }
    });

    card.addEventListener('mouseleave', function () {
      const visual = card.querySelector('.project-visual');
      if (visual) {
        visual.style.borderColor = '';
      }
    });
  });

  // ===== Console output (for fun) =====
  console.log(
    '%c👋 Hi there!',
    'font-size: 24px; font-weight: bold; color: #58a6ff;'
  );
  console.log(
    '%cInterested in working together? Drop me a line at 352579170@qq.com',
    'font-size: 14px; color: #8b949e;'
  );
  console.log(
    '%cBuilt with vanilla HTML/CSS/JS — no frameworks, no build tools.',
    'font-size: 12px; color: #6e7681;'
  );

})();
