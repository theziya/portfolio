import{g as L,S as y,C as n}from"./constants-B-HSxjv-.js";const S=r=>{const e=r.target.innerText,t=document.createElement("textarea");t.width="1px",t.height="1px",t.background="transparents",t.value=e,document.body.append(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)},w=(r,e)=>{let t=-1;const a=r==null?0:r.length,i=new Array(a);for(;++t<a;)i[t]=e(r[t],t,r);return i};function x(r,e){return r instanceof window.HTMLElement?[e(r)]:w(r,e)}const j=r=>{{console.warn("[GA4] Warning: No Measurement ID provided. Tracking disabled.");return}},h=(r,e={})=>{typeof window.gtag=="function"?window.gtag("event",r,e):window.dataLayer&&window.dataLayer.push({event:r,...e})},M=document.querySelectorAll(".contact-scroll"),m=document.getElementById("js-footer");document.querySelector("[data-scroll-container]");const b=document.querySelector("button.email"),k=document.getElementById("js-theme-toggle"),_=document.querySelector(".to-copy span");L.registerPlugin(y);const q={scrollTo:r=>r&&r.scrollIntoView({behavior:"smooth"}),on:()=>{},update:()=>{},stop:()=>{},start:()=>{}};y.defaults({scroller:window});class T{constructor(e){this.locomotive=e,this.init().catch(t=>console.error("Initialization failed:",t))}async init(){this.heroTextAnimation(),this.homeIntro(),await this.initProfile(),await this.initProjects(),this.homeAnimations(),this.homeActions(),this.themeActions(),this.updateLinks(),this.initAvatarToggle(),j(),this.initAnalyticsEvents()}async initProfile(){var e,t;try{let i=await(await fetch("./profile-data.json")).text();i=i.replace(/\{\{CURRENT_COMPANY\}\}/g,n.CURRENT_COMPANY||"").replace(/\{\{ROLE\}\}/g,n.ROLE||"").replace(/\{\{NAME\}\}/g,n.NAME||"");const o=JSON.parse(i),l=document.querySelector(".hero__paragraph");l&&o.about&&(l.innerHTML=o.about.description);const d=document.querySelector(".home__content");d&&o.technical_approach&&(d.innerHTML=`
          <div class="pf-about__card-label">${o.technical_approach.title}</div>
          <p class="pf-about__card-text">${o.technical_approach.description}</p>
        `);const p=document.querySelector(".home__awards__table");p&&((e=o.technical_stack)!=null&&e.items)&&(p.innerHTML=o.technical_stack.items.map(s=>`<div class="skill-badge fade-up">${s}</div>`).join(""),p.querySelectorAll(".fade-up").forEach(s=>u.observe(s)));const c=document.querySelector(".home__awards__stack");if(c&&o.education){const s=o.education.items.map(f=>{var A;return`
          <div class="edu-item fade-up">
            <div class="edu-item__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="edu-item__content">
              <div class="edu-item__degree">${f.split("—")[0].trim()}</div>
              <div class="edu-item__institution">${((A=f.split("—")[1])==null?void 0:A.trim())||""}</div>
            </div>
          </div>
        `}).join(""),g=o.education.github?`<a href="${o.education.github.url}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm" style="margin-top:1rem;">${o.education.github.label} ↗</a>`:"";c.innerHTML=s+g,c.querySelectorAll(".fade-up").forEach(f=>u.observe(f))}const v=document.querySelector(".home__experience__container");v&&((t=o.experience)!=null&&t.items)&&(v.innerHTML=o.experience.items.map(s=>`
          <div class="pf-exp__card fade-up">
            <div class="pf-exp__header">
              <div>
                <h3 class="pf-exp__role">${s.role}</h3>
                <div class="pf-exp__company">
                  <span>${s.company}</span>
                  <span class="dot-sep"></span>
                  <span class="location">${s.location}</span>
                </div>
              </div>
              <div class="pf-exp__period-badge">
                <span class="live-dot"></span>
                <span>${s.period}</span>
              </div>
            </div>
            <p class="pf-exp__summary">${s.description}</p>
            <ul class="pf-exp__highlights">
              ${s.highlights.map(g=>`<li>${g}</li>`).join("")}
            </ul>
          </div>
        `).join(""),v.querySelectorAll(".fade-up").forEach(s=>u.observe(s)));const E=document.querySelector(".home__awards__ice");E&&o.professional_focus&&(E.innerHTML=`
          <div class="pf-about__card-label">${o.professional_focus.title}</div>
          <p class="pf-about__card-text">${o.professional_focus.description}</p>
        `),document.querySelectorAll(".contact-scroll").forEach(s=>{s.onclick=()=>m==null?void 0:m.scrollIntoView({behavior:"smooth"})})}catch(a){console.error("Failed to load profile data:",a)}}async initProjects(){try{let t=await(await fetch("./project-data.json")).text();t=t.replace(/\{\{CURRENT_COMPANY\}\}/g,n.CURRENT_COMPANY||"").replace(/\{\{ROLE\}\}/g,n.ROLE||"").replace(/\{\{NAME\}\}/g,n.NAME||"");const a=JSON.parse(t),i=document.querySelector("[data-projects-section-1]");if(!i)return;i.innerHTML=a.map((o,l)=>`
        <a href="/project.html?id=${o.id}" class="project-card fade-up" style="text-decoration:none;">
          <div class="project-card__header">
            <span class="project-card__num">${String(l+1).padStart(2,"0")}</span>
            <svg class="project-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </div>
          <div class="project-card__role">${o.role}</div>
          <h3 class="project-card__title">${o.title}</h3>
          <p class="project-card__desc">${o.description}</p>
          <div class="project-card__footer">
            <span class="project-card__deep-dive">
              Deep Dive
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </a>
      `).join(""),i.querySelectorAll(".fade-up").forEach(o=>u.observe(o)),y.refresh()}catch(e){console.error("Failed to load project data:",e)}}themeActions(){const e=localStorage.getItem("theme");e==="light"?document.documentElement.setAttribute("data-theme","light"):(document.documentElement.removeAttribute("data-theme"),e||localStorage.setItem("theme","dark")),k&&(k.onclick=()=>{document.documentElement.getAttribute("data-theme")==="light"?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})}homeActions(){x(M,e=>{e.onclick=()=>{m==null||m.scrollIntoView({behavior:"smooth"})}}),b&&b.addEventListener("click",e=>{S(e),_&&(_.textContent="copied!"),setTimeout(()=>{_&&(_.textContent="Click to copy")},2e3)})}initAvatarToggle(){const e=document.getElementById("js-photo-real"),t=document.getElementById("js-photo-avatar");if(!e||!t)return;let a=!1;setInterval(()=>{a=!a,a?(e.classList.remove("pf-hero__photo--active"),e.style.display="none",t.classList.add("pf-hero__photo--active"),t.style.display="block",t.style.opacity="1"):(t.classList.remove("pf-hero__photo--active"),t.style.display="none",t.style.opacity="0",e.classList.add("pf-hero__photo--active"),e.style.display="block")},4e3)}homeIntro(){document.querySelectorAll(".fade-up").forEach(t=>u.observe(t));const e=document.getElementById("js-nav");window.addEventListener("scroll",()=>{window.scrollY>30?e==null||e.classList.add("scrolled"):e==null||e.classList.remove("scrolled")},{passive:!0}),L.from(".pf-hero__inner",{duration:1,opacity:0,y:30,ease:"power3.out",delay:.2})}homeAnimations(){document.querySelectorAll(".fade-up").forEach(e=>u.observe(e))}updateLinks(){const e=document.getElementById("js-resume-link");e&&(e.href=n.RESUME_URL),document.title=`${n.NAME} — ${n.ROLE}`;const t=document.querySelector('meta[name="title"]');t&&t.setAttribute("content",`${n.NAME} — ${n.ROLE}`);const a=document.querySelector('meta[property="og:title"]');a&&a.setAttribute("content",`${n.NAME} — ${n.ROLE}`);const i=document.querySelector('meta[property="twitter:title"]');i&&i.setAttribute("content",`${n.NAME} — ${n.ROLE}`);const o=document.querySelector(".js-nav-name");o&&(o.innerHTML=`${n.NAME} <br> BANGALORE, INDIA`);const l=document.querySelector(".js-nav-role");l&&(l.innerHTML=`${n.ROLE_SPECIFIC} <br> Portfolio / 2024 — Present`);const d=document.querySelector(".js-marquee-email-link");d&&(d.href=`mailto:${n.EMAIL}?subject=Lets%20work%20together!&body=Hello%2C%20I%20think%20we%20need%20you%20to%20work%20on%2Fcollaborate%20this%20particular%20product...%20Reach%20out%20as%20soon%20as%20you%20can.`);const p=document.querySelector(".js-copy-email-btn");p&&(p.textContent=n.EMAIL),document.querySelectorAll(".js-footer-email-link").forEach(c=>{c.href=`mailto:${n.EMAIL}`}),document.querySelectorAll(".js-footer-github-link").forEach(c=>{c.href=n.GITHUB_URL}),document.querySelectorAll(".js-footer-linkedin-link").forEach(c=>{c.href=n.LINKEDIN_URL}),document.querySelectorAll("#js-resume-link, #js-resume-link-footer, #js-resume-link-contact").forEach(c=>{c.href=n.RESUME_URL}),document.querySelectorAll(".js-copyright-name").forEach(c=>{c.textContent=`© 2024 ${n.NAME}`}),document.querySelectorAll(".js-footer-phone-link").forEach(c=>{c.href=`tel:${n.PHONE}`}),document.querySelectorAll(".js-footer-phone-text").forEach(c=>{c.textContent=n.PHONE})}initAnalyticsEvents(){const e=document.getElementById("js-resume-link");e&&e.addEventListener("click",()=>{h("resume_download")}),document.querySelectorAll('a[href*="linkedin.com"]').forEach(o=>{o.addEventListener("click",()=>{h("linkedin_click")})}),document.querySelectorAll('a[href*="github.com"]').forEach(o=>{o.addEventListener("click",()=>{h("github_click")})}),setTimeout(()=>{h("engaged_session")},6e4);let i=!1;this.locomotive.on("scroll",o=>{if(i)return;const{scroll:l,limit:d}=o;d.y>0&&l.y/d.y>.7&&(h("scroll_depth",{depth:"70%"}),i=!0)})}heroTextAnimation(){}}const u=new IntersectionObserver(r=>{r.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),u.unobserve(e.target))})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});document.querySelectorAll(".fade-up").forEach(r=>u.observe(r));new T(q);
