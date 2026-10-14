/* =====================================================================
   FIELD NOTEBOOK — shared runtime for BOTH worlds.
   body[data-world="artist|analyst"] + body[data-page="<file>"].
   Builds the world's own nav, world-switch pill, eclipse; wires reveals +
   mobile menu. Artist = warm paper (light default); Analyst = dashboard (dark default).
   ===================================================================== */
(function(){
  const root=document.documentElement, body=document.body;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=(s,c=document)=>c.querySelector(s);
  const ic=id=>`<svg class="ic"><use href="#${id}"/></svg>`;
  const world=body.dataset.world==='analyst'?'analyst':'artist';
  const page=body.dataset.page||'index.html';

  const SOCIAL={
    linkedin:'https://www.linkedin.com/in/tuhinbhattacharya28',
    instagram:'https://instagram.com/_threads_of_karma_',
    email:'mailto:tuhin.bhattacharya25b@gim.ac.in'
  };
  const WORLDS={
    artist:{home:'/artist/', other:'analyst', label:'Artist', otherLabel:'Analyst', otherIcon:'i-chart',
      nav:[['index.html','Home'],['gallery.html','Gallery'],['sound.html','Sound'],['matchday.html','Matchday'],
           ['notes.html','Field Notes'],['about.html','About'],['contact.html','Contact']]},
    analyst:{home:'/analyst/', other:'artist', label:'Analyst', otherLabel:'Artist', otherIcon:'i-camera',
      nav:[['index.html','Home'],['skills.html','Skills'],['work.html','Case Studies'],['journey.html','Journey'],
           ['dashboard.html','Dashboard'],['resume.html','Résumé'],['contact.html','Contact']]}
  };
  const W=WORLDS[world];

  // data-mode mirrors world (accent + any inline mode-swap); remember world for the hero
  root.dataset.mode=world;
  try{localStorage.setItem('nb-world',world)}catch(e){}
  // theme: stored wins; else analyst defaults dark, artist light
  try{const t=localStorage.getItem('nb-theme'); root.dataset.theme = t || (world==='analyst'?'dark':'light');}catch(e){ root.dataset.theme = world==='analyst'?'dark':'light'; }

  function injectSprite(){
    return fetch('/assets/sprite.svg').then(r=>r.text()).then(svg=>{
      const d=document.createElement('div'); d.className='sprite'; d.innerHTML=svg;
      body.insertBefore(d, body.firstChild);
    }).catch(()=>{});
  }

  function buildChrome(){
    const nav=document.createElement('header'); nav.className='nav';
    nav.innerHTML=
      `<a class="brand" href="${W.home}">Tuhin B. <b>·</b> <span class="v">${W.label} Notebook</span></a>
       <nav class="links" id="navlinks">`+
         W.nav.map(([h,l])=>`<a href="${h}"${h===page?' aria-current="page"':''}>${l}</a>`).join('')+
       `</nav>
       <div class="tools">
         <a class="wswitch" href="/${W.other}/" aria-label="switch to ${W.otherLabel} world">${ic(W.otherIcon)}<span>to <b>${W.otherLabel}</b></span></a>
         <button class="eclipse" id="eclipse" aria-label="toggle light / dark">
           <svg viewBox="0 0 30 30" aria-hidden="true">
             <g><line class="ray" x1="15" y1="0" x2="15" y2="4"/><line class="ray" x1="15" y1="26" x2="15" y2="30"/>
               <line class="ray" x1="0" y1="15" x2="4" y2="15"/><line class="ray" x1="26" y1="15" x2="30" y2="15"/>
               <line class="ray" x1="4.4" y1="4.4" x2="7.2" y2="7.2"/><line class="ray" x1="22.8" y1="22.8" x2="25.6" y2="25.6"/>
               <line class="ray" x1="25.6" y1="4.4" x2="22.8" y2="7.2"/><line class="ray" x1="7.2" y1="22.8" x2="4.4" y2="25.6"/></g>
             <clipPath id="tdisc"><circle cx="15" cy="15" r="9"/></clipPath>
             <g clip-path="url(#tdisc)"><circle class="core" cx="15" cy="15" r="9"/><circle class="cut" cx="15" cy="15" r="9"/></g>
           </svg>
         </button>
         <button class="menu-btn" id="menubtn" aria-label="menu">${ic('i-menu')}</button>
       </div>`;
    body.insertBefore(nav, body.firstChild);

    if(!$('.foot') && body.dataset.foot!=='none'){
      const f=document.createElement('footer'); f.className='foot';
      f.innerHTML=
        `<div>© ${new Date().getFullYear()} Tuhin Bhattacharya — Goa, IST · ${W.label}</div>
         <div class="cols">
           <a href="${SOCIAL.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
           <a href="${SOCIAL.instagram}" target="_blank" rel="noopener">Instagram</a>
           <a href="${SOCIAL.email}">Email</a>
           <a href="/${W.other}/">${W.otherLabel} side →</a>
         </div>`;
      body.appendChild(f);
    }
  }

  function wire(){
    const setTheme=t=>{ root.dataset.theme=t; try{localStorage.setItem('nb-theme',t)}catch(e){} };
    $('#eclipse')?.addEventListener('click',()=>{
      const n=root.dataset.theme==='dark'?'light':'dark', r=$('#eclipse').getBoundingClientRect();
      root.style.setProperty('--cx',(r.left+r.width/2)+'px'); root.style.setProperty('--cy',(r.top+r.height/2)+'px');
      if(document.startViewTransition && !reduce) document.startViewTransition(()=>setTheme(n)); else setTheme(n);
    });
    const links=$('#navlinks'), mb=$('#menubtn');
    mb?.addEventListener('click',()=>links.classList.toggle('open'));
    links?.addEventListener('click',e=>{ if(e.target.tagName==='A') links.classList.remove('open'); });
  }

  function reveals(){
    const els=[...document.querySelectorAll('[data-rise]')];
    if(reduce || !('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
    const io=new IntersectionObserver(ents=>ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }),
      {rootMargin:'0px 0px -8% 0px', threshold:.12});
    els.forEach(e=>io.observe(e));
  }

  const vt=document.createElement('style');
  vt.textContent=
    `::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
     ::view-transition-new(root){clip-path:circle(0% at var(--cx,92%) var(--cy,6%));animation:ecIn .6s var(--ease) forwards}
     @keyframes ecIn{to{clip-path:circle(150% at var(--cx,92%) var(--cy,6%))}}`;
  document.head.appendChild(vt);

  injectSprite().then(()=>{ buildChrome(); wire(); reveals(); });
})();
