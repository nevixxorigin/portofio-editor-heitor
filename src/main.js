import './style.css';
import { I18N } from './i18n/translations.js';
document.documentElement.classList.remove('no-js');
/* ===== CONFIGURAÇÃO — preencha aqui ===== */
const PROJECTS = [              // id = código do YouTube Short; textos ficam em I18N (w1t, w1d...)
  {id:"PIsGUFEudyY",k:"w1"},
  {id:"C-EqdDqquIs",k:"w2"},
  {id:"ZQDsfL-jm-Y",k:"w3"},
  {id:"l8xv7g_a4gI",k:"w4"}
];
const CONTACTS = {whatsapp:"5533997655446",linkedin:"",instagram:"https://www.instagram.com/hxneves/",email:""};
/* ======================================== */
const DEFAULT_LANG='pt',KEY='hn-lang';
let lang=DEFAULT_LANG;
try{const sv=localStorage.getItem(KEY);if(sv&&I18N[sv])lang=sv}catch(e){}
const t=k=>(I18N[lang]&&I18N[lang][k])||I18N[DEFAULT_LANG][k]||k;
function applyLang(l){
  lang=l;try{localStorage.setItem(KEY,l)}catch(e){}
  document.documentElement.lang=l==='en'?'en':'pt-BR';
  document.title=t('meta_title');
  const md=document.querySelector('meta[name=description]');if(md)md.content=t('meta_desc');
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
  document.querySelectorAll('[data-i18n-html]').forEach(e=>e.innerHTML=t(e.dataset.i18nHtml));
  document.querySelectorAll('[data-i18n-aria]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-alt]').forEach(e=>e.setAttribute('alt',t(e.dataset.i18nAlt)));
  document.querySelectorAll('[data-wk]').forEach(e=>{const n=t(e.dataset.wk+'t');
    if(e.tagName==='BUTTON')e.setAttribute('aria-label',t('play')+' '+n);
    else if(e.tagName==='IMG')e.alt=t('cover')+' '+n;
    else if(e.tagName==='IFRAME')e.title=n});
  document.querySelectorAll('.lang button').forEach(b=>{const on=b.dataset.l===l;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
}
const grid=document.getElementById('grid');
PROJECTS.forEach((p,i)=>{
  const w=document.createElement('article');w.className='work rv';
  const n=String(i+1).padStart(2,'0');
  w.innerHTML=`<div class="wh"><small>${n} —</small><h3 data-i18n="${p.k}t"></h3></div><div class="slot"></div><p class="wd" data-i18n="${p.k}d"></p>`;
  const slot=w.querySelector('.slot');
  const b=document.createElement('button');b.type='button';b.className='card';b.dataset.wk=p.k;
  b.innerHTML=`<img loading="lazy" width="360" height="640" alt="" data-wk="${p.k}" src="https://i.ytimg.com/vi/${p.id}/oar2.jpg"><span class="play" aria-hidden="true">▶</span>`;
  b.querySelector('img').onerror=e=>{const im=e.target;if(im.dataset.f){im.remove()}else{im.dataset.f=1;im.src=`https://i.ytimg.com/vi/${p.id}/hqdefault.jpg`}};
  b.onclick=()=>{const f=document.createElement('iframe');f.className='card playing';f.dataset.wk=p.k;f.src=`https://www.youtube.com/embed/${p.id}?autoplay=1&rel=0&playsinline=1`;f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;f.title=t(p.k+'t');slot.replaceChildren(f)};
  slot.appendChild(b);grid.appendChild(w);
});
const shot=document.getElementById('shot'),si=shot.querySelector('img');
const miss=()=>shot.classList.add('missing');
si.addEventListener('error',miss);if(si.complete&&!si.naturalWidth)miss();
const cl=document.getElementById('comuLogo'),ci=cl.querySelector('img');
ci.addEventListener('error',()=>cl.classList.add('missing'));if(ci.complete&&!ci.naturalWidth)cl.classList.add('missing');
/* contatos */
const L=document.getElementById('links'),C=CONTACTS,out=[];
if(C.whatsapp)out.push(['cta_wa','https://wa.me/'+C.whatsapp]);
if(C.email)out.push(['c_email','mailto:'+C.email]);
if(C.linkedin)out.push(['c_linkedin',C.linkedin]);
if(out.length)L.innerHTML=out.map((o,i)=>`<a class="btn ${i?'s':'p'}" href="${o[1]}" target="_blank" rel="noopener" data-i18n="${o[0]}"></a>`).join('');
else L.innerHTML='<p style="color:var(--tx2);font-size:14px" data-i18n="no_contacts"></p>';
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.l)));
applyLang(lang);
/* reveal + nav + parallax */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)});
const links=[...document.querySelectorAll('nav a')],secs=['inicio','trabalhos','sobre','conquistas','contato'].map(id=>document.getElementById(id));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>so.observe(s));
const st=document.getElementById('stage');
if(matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches)addEventListener('pointermove',e=>{st.style.setProperty('--px',((e.clientX/innerWidth-.5)*-14)+'px');st.style.setProperty('--py',((e.clientY/innerHeight-.5)*-10)+'px')},{passive:true});
