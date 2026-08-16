import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copyText } from "./utils/index";
import { mapEach } from "./utils/dom";
import { initGA, trackEvent } from "./utils/analytics";
import { CONSTANTS } from "./config/constants.js";

const toContactButtons = document.querySelectorAll(".contact-scroll");
const footer = document.getElementById("js-footer");
const scrollEl = document.querySelector("[data-scroll-container]");
const emailButton = document.querySelector("button.email");
const themeToggle = document.getElementById("js-theme-toggle");
const toCopyText = document.querySelector(".to-copy span");

gsap.registerPlugin(ScrollTrigger);

// Lightweight native scroll setup (no loconative for new design)
const scroll = {
  scrollTo: (el) => el && el.scrollIntoView({ behavior: "smooth" }),
  on: () => {},
  update: () => {},
  stop: () => {},
  start: () => {},
};

ScrollTrigger.defaults({
  scroller: window,
});

export default class Home {
  constructor(scroll) {
    this.locomotive = scroll;
    this.init().catch(err => console.error("Initialization failed:", err));
  }

  async init() {
    this.heroTextAnimation();
    this.homeIntro();

    await this.initProfile();
    await this.initProjects();
    this.homeAnimations(); // Must run after projects are injected

    this.homeActions();
    this.themeActions();
    this.updateLinks();
    this.initAvatarToggle();


    // Initialize Analytics
    initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);
    this.initAnalyticsEvents();
  }

  async initProfile() {
    try {
      const response = await fetch('./profile-data.json');
      let text = await response.text();
      text = text.replace(/\{\{CURRENT_COMPANY\}\}/g, CONSTANTS.CURRENT_COMPANY || '')
                 .replace(/\{\{ROLE\}\}/g, CONSTANTS.ROLE || '')
                 .replace(/\{\{NAME\}\}/g, CONSTANTS.NAME || '');
      const data = JSON.parse(text);

      // Hero about paragraph
      const aboutContainer = document.querySelector('.hero__paragraph');
      if (aboutContainer && data.about) {
        aboutContainer.innerHTML = data.about.description;
      }

      // Technical Approach card
      const techApproachContainer = document.querySelector('.home__content');
      if (techApproachContainer && data.technical_approach) {
        techApproachContainer.innerHTML = `
          <div class="pf-about__card-label">${data.technical_approach.title}</div>
          <p class="pf-about__card-text">${data.technical_approach.description}</p>
        `;
      }

      // Technical Stack — badges
      const techStackContainer = document.querySelector('.home__awards__table');
      if (techStackContainer && data.technical_stack?.items) {
        techStackContainer.innerHTML = data.technical_stack.items
          .map(item => `<div class="skill-badge fade-up">${item}</div>`).join('');
        // Trigger observer for new badges
        techStackContainer.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
      }

      // Education
      const eduContainer = document.querySelector('.home__awards__stack');
      if (eduContainer && data.education) {
        const eduItems = data.education.items.map(item => `
          <div class="edu-item fade-up">
            <div class="edu-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="edu-item__content">
              <div class="edu-item__degree">${item.split('—')[0].trim()}</div>
              <div class="edu-item__institution">${item.split('—')[1]?.trim() || ''}</div>
            </div>
          </div>
        `).join('');

        const githubLink = data.education.github
          ? `<a href="${data.education.github.url}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm" style="margin-top:1rem;">${data.education.github.label} ↗</a>`
          : '';

        eduContainer.innerHTML = eduItems + githubLink;
        eduContainer.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
      }

      // Work Experience
      const expContainer = document.querySelector('.home__experience__container');
      if (expContainer && data.experience?.items) {
        expContainer.innerHTML = data.experience.items.map(item => `
          <div class="pf-exp__card fade-up">
            <div class="pf-exp__header">
              <div>
                <h3 class="pf-exp__role">${item.role}</h3>
                <div class="pf-exp__company">
                  <span>${item.company}</span>
                  <span class="dot-sep"></span>
                  <span class="location">${item.location}</span>
                </div>
              </div>
              <div class="pf-exp__period-badge">
                <span class="live-dot"></span>
                <span>${item.period}</span>
              </div>
            </div>
            <p class="pf-exp__summary">${item.description}</p>
            <ul class="pf-exp__highlights">
              ${item.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `).join('');
        expContainer.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
      }

      // Professional Focus
      const focusContainer = document.querySelector('.home__awards__ice');
      if (focusContainer && data.professional_focus) {
        focusContainer.innerHTML = `
          <div class="pf-about__card-label">${data.professional_focus.title}</div>
          <p class="pf-about__card-text">${data.professional_focus.description}</p>
        `;
      }

      // Re-init contact buttons after dynamic content
      document.querySelectorAll(".contact-scroll").forEach(button => {
        button.onclick = () => footer?.scrollIntoView({ behavior: "smooth" });
      });

    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  }

  async initProjects() {
    try {
      const response = await fetch('./project-data.json');
      let text = await response.text();
      text = text.replace(/\{\{CURRENT_COMPANY\}\}/g, CONSTANTS.CURRENT_COMPANY || '')
                 .replace(/\{\{ROLE\}\}/g, CONSTANTS.ROLE || '')
                 .replace(/\{\{NAME\}\}/g, CONSTANTS.NAME || '');
      const projects = JSON.parse(text);

      const gridContainer = document.querySelector('[data-projects-section-1]');
      if (!gridContainer) return;

      gridContainer.innerHTML = projects.map((project, index) => `
        <a href="/project.html?id=${project.id}" class="project-card fade-up" style="text-decoration:none;">
          <div class="project-card__header">
            <span class="project-card__num">${String(index + 1).padStart(2, '0')}</span>
            <svg class="project-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </div>
          <div class="project-card__role">${project.role}</div>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <div class="project-card__footer">
            <span class="project-card__deep-dive">
              Deep Dive
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>
      `).join('');

      // Animate new cards
      gridContainer.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

      ScrollTrigger.refresh();

    } catch (error) {
      console.error("Failed to load project data:", error);
    }
  }


  themeActions() {
    // Initialize theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    
    if (storedTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme"); // Default is dark in SCSS
      if (!storedTheme) localStorage.setItem("theme", "dark");
    }

    if (themeToggle) {
      themeToggle.onclick = () => {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        if (isLight) {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        }
      };
    }
  }

  homeActions() {
    mapEach(toContactButtons, (button) => {
      button.onclick = () => {
        footer?.scrollIntoView({ behavior: "smooth" });
      };
    });

    if (emailButton) {
      emailButton.addEventListener("click", (e) => {
        copyText(e);
        if (toCopyText) toCopyText.textContent = "copied!";

        setTimeout(() => {
          if (toCopyText) toCopyText.textContent = "Click to copy";
        }, 2000);
      });
    }
  }

  initAvatarToggle() {
    const realPhoto = document.getElementById('js-photo-real');
    const avatarPhoto = document.getElementById('js-photo-avatar');
    if (!realPhoto || !avatarPhoto) return;

    let showingAvatar = false;

    setInterval(() => {
      showingAvatar = !showingAvatar;

      if (showingAvatar) {
        realPhoto.classList.remove('pf-hero__photo--active');
        realPhoto.style.display = 'none';
        avatarPhoto.classList.add('pf-hero__photo--active');
        avatarPhoto.style.display = 'block';
        avatarPhoto.style.opacity = '1';
      } else {
        avatarPhoto.classList.remove('pf-hero__photo--active');
        avatarPhoto.style.display = 'none';
        avatarPhoto.style.opacity = '0';
        realPhoto.classList.add('pf-hero__photo--active');
        realPhoto.style.display = 'block';
      }
    }, 4000);
  }

  homeIntro() {

    // Fade-up animation via IntersectionObserver (defined globally)
    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // Nav scroll behavior
    const nav = document.getElementById('js-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Hero fade-in
    gsap.from('.pf-hero__inner', {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  homeAnimations() {
    // All animations handled by IntersectionObserver in homeIntro
    // Re-observe any newly added elements
    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
  }


  updateLinks() {
    const resumeLink = document.getElementById('js-resume-link');
    if (resumeLink) {
      resumeLink.href = CONSTANTS.RESUME_URL;
    }

    // Update document title and metadata
    document.title = `${CONSTANTS.NAME} — ${CONSTANTS.ROLE}`;

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', `${CONSTANTS.NAME} — ${CONSTANTS.ROLE}`);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${CONSTANTS.NAME} — ${CONSTANTS.ROLE}`);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', `${CONSTANTS.NAME} — ${CONSTANTS.ROLE}`);

    // Update navigation elements
    const navName = document.querySelector('.js-nav-name');
    if (navName) {
      navName.innerHTML = `${CONSTANTS.NAME} <br> BANGALORE, INDIA`;
    }

    const navRole = document.querySelector('.js-nav-role');
    if (navRole) {
      navRole.innerHTML = `${CONSTANTS.ROLE_SPECIFIC} <br> Portfolio / 2024 — Present`;
    }

    // Update marquee email link
    const marqueeEmailLink = document.querySelector('.js-marquee-email-link');
    if (marqueeEmailLink) {
      marqueeEmailLink.href = `mailto:${CONSTANTS.EMAIL}?subject=Lets%20work%20together!&body=Hello%2C%20I%20think%20we%20need%20you%20to%20work%20on%2Fcollaborate%20this%20particular%20product...%20Reach%20out%20as%20soon%20as%20you%20can.`;
    }

    // Update copy email button
    const copyEmailBtn = document.querySelector('.js-copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.textContent = CONSTANTS.EMAIL;
    }

    // Update footer & page email links
    document.querySelectorAll('.js-footer-email-link').forEach(el => {
      el.href = `mailto:${CONSTANTS.EMAIL}`;
    });

    // Update footer & page github links
    document.querySelectorAll('.js-footer-github-link').forEach(el => {
      el.href = CONSTANTS.GITHUB_URL;
    });

    // Update footer & page linkedin links
    document.querySelectorAll('.js-footer-linkedin-link').forEach(el => {
      el.href = CONSTANTS.LINKEDIN_URL;
    });

    // Update all resume links
    document.querySelectorAll('#js-resume-link, #js-resume-link-footer, #js-resume-link-contact').forEach(el => {
      el.href = CONSTANTS.RESUME_URL;
    });

    // Update copyright
    document.querySelectorAll('.js-copyright-name').forEach(el => {
      el.textContent = `© 2024 ${CONSTANTS.NAME}`;
    });

    // Update footer phone link
    document.querySelectorAll('.js-footer-phone-link').forEach(el => {
      el.href = `tel:${CONSTANTS.PHONE}`;
    });

    document.querySelectorAll('.js-footer-phone-text').forEach(el => {
      el.textContent = CONSTANTS.PHONE;
    });
  }

  initAnalyticsEvents() {
    // 1. Resume Download
    const resumeLink = document.getElementById('js-resume-link');
    if (resumeLink) {
      resumeLink.addEventListener('click', () => {
        trackEvent('resume_download');
      });
    }

    // 2. Social Media Clicks (GitHub & LinkedIn)
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('linkedin_click');
      });
    });

    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
      link.addEventListener('click', () => {
        trackEvent('github_click');
      });
    });

    // 3. Engaged Session (> 60 seconds)
    setTimeout(() => {
      trackEvent('engaged_session');
    }, 60000);

    // 4. Scroll Depth (> 70%)
    let scrollTracked = false;
    this.locomotive.on("scroll", (args) => {
      if (scrollTracked) return;

      const { scroll, limit } = args;
      if (limit.y > 0) {
        const percentage = scroll.y / limit.y;
        if (percentage > 0.7) {
          trackEvent('scroll_depth', { depth: '70%' });
          scrollTracked = true;
        }
      }
    });
  }

  heroTextAnimation() {
    // No legacy hero text dash animation in new design
  }
}

// ── Global IntersectionObserver for .fade-up elements ──────
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Observe all initial fade-up elements
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

new Home(scroll);
