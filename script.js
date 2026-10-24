const portfolioData = {
  name: 'Bhavani Sankar',
  heroSummary:
    'Professional headline placeholder. Replace this with your actual role and strengths once readable resume text is available.',
  about:
    'About summary placeholder. Replace with a short, authentic introduction based on verified resume details.',
  highlights: [
    'Current focus: Add your real specialization',
    'Preferred domain: Add your working domain',
    'Location/work mode: Add your preference'
  ],
  skills: [
    'Skill placeholder',
    'Framework placeholder',
    'Database placeholder',
    'Cloud/DevOps placeholder',
    'Tools placeholder',
    'Soft skill placeholder'
  ],
  projects: [
    {
      title: 'Project title 01',
      description: 'Short outcome-focused description placeholder. Replace with verified impact and scope.',
      tech: ['Tech 1', 'Tech 2', 'Tech 3'],
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Project title 02',
      description: 'Short outcome-focused description placeholder. Replace with verified impact and scope.',
      tech: ['Tech 1', 'Tech 2', 'Tech 3'],
      demoUrl: '#',
      codeUrl: '#'
    },
    {
      title: 'Project title 03',
      description: 'Short outcome-focused description placeholder. Replace with verified impact and scope.',
      tech: ['Tech 1', 'Tech 2', 'Tech 3'],
      demoUrl: '#',
      codeUrl: '#'
    }
  ],
  timeline: [
    {
      title: 'Experience placeholder',
      meta: 'Company / Institution • Year range placeholder',
      details: 'Add validated role responsibilities, impact, or education achievements here.'
    },
    {
      title: 'Education placeholder',
      meta: 'Degree / Program • Year range placeholder',
      details: 'Add verified coursework, projects, or distinctions here.'
    }
  ],
  certifications: [
    {
      title: 'Certification or achievement placeholder',
      details: 'Add issuing organization and date after verifying resume details.'
    },
    {
      title: 'Certification or achievement placeholder',
      details: 'Add issuing organization and date after verifying resume details.'
    }
  ]
};

const query = (selector) => document.querySelector(selector);
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }

  return element;
};

const renderHighlights = () => {
  const list = query('#highlights-list');
  if (!list) return;

  list.innerHTML = '';
  portfolioData.highlights.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.setAttribute('data-animate', '');
    list.appendChild(li);
  });
};

const renderSkills = () => {
  const list = query('#skills-list');
  if (!list) return;

  list.innerHTML = '';
  portfolioData.skills.forEach((skill) => {
    const chip = document.createElement('li');
    chip.textContent = skill;
    chip.setAttribute('data-animate', '');
    list.appendChild(chip);
  });
};

const renderProjects = () => {
  const container = query('#projects-grid');
  if (!container) return;

  container.innerHTML = '';
  portfolioData.projects.forEach((project) => {
    const article = createElement('article', 'project-card');
    article.setAttribute('data-animate', '');

    article.innerHTML = `
      <h3 class="card-title">${project.title}</h3>
      <p>${project.description}</p>
      <p class="project-meta">${project.tech.join(' • ')}</p>
      <div class="card-link-row">
        <a href="${project.demoUrl}" ${project.demoUrl === '#' ? '' : 'target="_blank" rel="noreferrer"'}>Live demo</a>
        <a href="${project.codeUrl}" ${project.codeUrl === '#' ? '' : 'target="_blank" rel="noreferrer"'}>Source code</a>
      </div>
    `;

    container.appendChild(article);
  });
};

const renderTimeline = () => {
  const list = query('#timeline-list');
  if (!list) return;

  list.innerHTML = '';
  portfolioData.timeline.forEach((entry) => {
    const item = createElement('li', 'timeline-item');
    item.setAttribute('data-animate', '');

    item.innerHTML = `
      <h3 class="card-title">${entry.title}</h3>
      <p class="timeline-meta">${entry.meta}</p>
      <p>${entry.details}</p>
    `;

    list.appendChild(item);
  });
};

const renderCertifications = () => {
  const container = query('#certifications-grid');
  if (!container) return;

  container.innerHTML = '';
  portfolioData.certifications.forEach((cert) => {
    const card = createElement('article', 'cert-card');
    card.setAttribute('data-animate', '');

    card.innerHTML = `
      <h3 class="card-title">${cert.title}</h3>
      <p>${cert.details}</p>
    `;

    container.appendChild(card);
  });
};

const hydrateText = () => {
  const heroSummary = query('#hero-summary');
  const aboutText = query('#about-text');
  if (heroSummary) heroSummary.textContent = portfolioData.heroSummary;
  if (aboutText) aboutText.textContent = portfolioData.about;
};

const setupNavigation = () => {
  const toggle = query('.menu-toggle');
  const menu = query('#primary-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    });
  });
};

const setupAnimations = () => {
  const animatedNodes = [...document.querySelectorAll('[data-animate]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    animatedNodes.forEach((node) => node.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedNodes.forEach((node) => observer.observe(node));
};

const setupFooterYear = () => {
  const target = query('#current-year');
  if (target) {
    target.textContent = String(new Date().getFullYear());
  }
};

const init = () => {
  hydrateText();
  renderHighlights();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderCertifications();
  setupNavigation();
  setupAnimations();
  setupFooterYear();
};

document.addEventListener('DOMContentLoaded', init);
