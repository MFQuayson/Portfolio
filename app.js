'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('.menu-toggle');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); $('#navigation').classList.remove('open'); menu.textContent = 'Menu'; }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('#navigation').classList.toggle('open', open); menu.textContent = open ? 'Close' : 'Menu'; });
$$('#navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
function wireTabs(container) {
  const tabs = $$('[role="tab"]', container);
  function select(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      panel.hidden = !selected; panel.tabIndex = 0;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next]); tabs[next].focus(); }
    });
  });
  select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
}
wireTabs($('.studio-tabs')); wireTabs($('.strategy-tabs'));
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .06 });
  $$('.reveal').forEach(element => observer.observe(element));
  document.body.classList.add('motion-ready');
}
let scrollFrame = false;
function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('.scroll-progress').style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`; scrollFrame = false;
}
window.addEventListener('scroll', () => { if (!scrollFrame) { requestAnimationFrame(scrollProgress); scrollFrame = true; } }, { passive: true });
window.addEventListener('resize', scrollProgress); scrollProgress();
const projects = $$('.project');
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(project => { project.hidden = button.dataset.filter !== 'all' && !project.dataset.category.split(' ').includes(button.dataset.filter); if (!project.hidden) project.classList.add('visible'); });
  const count = projects.filter(project => !project.hidden).length;
  $('#gallery-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
}));
const filmTrack = $('#film-track');
const motionBehavior = () => reducedMotion.matches || document.body.classList.contains('motion-paused') ? 'auto' : 'smooth';
function filmStatus() {
  const max = filmTrack.scrollWidth - filmTrack.clientWidth;
  $('#previous-film').disabled = filmTrack.scrollLeft < 8;
  $('#next-film').disabled = max < 8 || filmTrack.scrollLeft >= max - 8;
}
function moveFilm(direction) {
  const first = $('.film-card', filmTrack);
  const gap = parseFloat(getComputedStyle(filmTrack).gap) || 18;
  filmTrack.scrollBy({ left: (first.getBoundingClientRect().width + gap) * direction, behavior: motionBehavior() });
}
$('#previous-film').addEventListener('click', () => moveFilm(-1));
$('#next-film').addEventListener('click', () => moveFilm(1));
filmTrack.addEventListener('scroll', filmStatus, { passive: true });
filmTrack.addEventListener('keydown', event => { if (event.target === filmTrack && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); moveFilm(event.key === 'ArrowRight' ? 1 : -1); } });
window.addEventListener('resize', filmStatus); window.addEventListener('load', filmStatus); filmStatus();
const stories = {
  invest: {
    title: 'Invest Africa 54', category: 'US based brand / Investment & real estate', role: 'Marketing Team Lead · July 2024 to March 2025', image: 'assets/invest.webp', alt: 'Invest Africa 54 education creative explaining fractional ownership', asset: 'assets/invest.webp', film: 'invest',
    sections: [['The business challenge', 'Help people understand a complex investment model, build confidence and move from interest to a more informed conversation.'], ['What I owned', 'Led SEO and content direction, landing page optimisation, paid acquisition and investor communication. Created proposals and marketing decks, launched and managed a podcast, and coordinated designers, content creators and sales teams.'], ['What moved', 'Website traffic grew by 35% through SEO and landing page work. Proposals and decks supported more than $1.5M in projected deals. That figure represents pipeline value.'], ['The work you can see', 'Educational social creative and a short investment campaign video. The brand is US based; my role contributed to its digital marketing and investor storytelling.']]
  },
  hotel: {
    title: 'Chateau Nana Willine', category: 'Hospitality / Ghana', role: 'Digital Marketing Team Lead · 2024–2025', image: 'assets/hotel.webp', alt: 'Chateau Nana Willine December booking campaign creative', asset: 'assets/hotel.webp', film: 'hotel',
    sections: [['The opportunity', 'People book when they can picture themselves there. The task was to make the hotel experience tangible, with a clear path from discovery to reservation.'], ['What I owned', 'Website updates, SEO, digital positioning and content. Coordinated local and international paid campaigns and seasonal promotions around tourism demand.'], ['How the work showed up', 'A seasonal booking creative paired with a hospitality reel. The room, the setting and the reason to visit work together, rather than leaving the offer to carry the whole story.']]
  },
  oasis: {
    title: 'Oasis Beach Resort', category: 'Rebranding / Hospitality / Cape Coast', role: 'Project Lead · Rebranding & Digital Positioning · 2024–2025', image: 'assets/oasis-brand-photo.jpg', alt: 'Guest room shown on the Oasis Beach Resort website', brand: { logo: 'assets/oasis-logo.png', name: 'Oasis Beach Resort', note: 'Current brand identity and resort image from the official website.', instagram: 'https://www.instagram.com/oasisbeachresort/', website: 'https://www.theoasisbeachresort.com/' }, concept: ['Oasis is changing.', 'Follow our journey.'], conceptNote: 'Campaign direction from my Oasis rebranding materials. This panel is a strategy excerpt.',
    sections: [['The place behind the project', 'A beach resort in Cape Coast, Ghana, bringing accommodation, dining and coastal experiences into one destination.'], ['The brand problem', 'A resort in transformation needs more than new visuals. Guests and the community need to understand what is changing and why the place still matters.'], ['What I owned', 'Led rebranding and digital positioning, including an identity refresh and campaign direction rooted in heritage, community and the resort’s next chapter.'], ['The story system', 'My campaign concept connects Cape Coast’s history, the people around the resort, daily experiences and the transformation itself. The documentary outline, “The Journey to the New OASIS,” turns that direction into a longer narrative.'], ['Beyond the feed', 'The materials connect reels, stories, room tours, broadcast updates and segmented email communication for tour operators and individual guests. QR and link journeys create routes into that communication.'], ['The distinction', 'These are excerpts from the concept and storyline materials. Proposed scenes and interview prompts are planning work, rather than completed production or quoted testimonials.']]
  },
  cg: {
    title: 'CG Dispo', category: 'Local services / Ghana', role: 'Social Media & Marketing Lead · July to December 2025', image: 'assets/cg.webp', alt: 'CG Dispo cleaning service promotional creative', asset: 'assets/cg.webp', film: 'laundry',
    sections: [['From launch', 'Build a recognisable digital presence for a service business and make the offer understandable enough for people to enquire.'], ['What I owned', 'Brand positioning, content direction and paid advertising. Brought service education, practical proof and promotional messaging into one presence.'], ['What moved', 'Recorded 45% growth in engagement during the role, as documented in my campaign examples and master CV.'], ['The visible work', 'A promotional post and a reel showing a couch cleaning service in action. The process itself gives the content a concrete story to tell.']]
  },
  formica: {
    title: 'Formica Agency', category: 'Education & careers / Content & growth', role: 'Marketing Team Lead · October 2024 to October 2025', image: 'assets/formica.webp', alt: 'Formica brand introduction creative', asset: 'assets/formica.webp', film: 'formica',
    sections: [['The audience', 'People looking for opportunities bring ambition, uncertainty and very familiar frustrations. Useful content needs to recognise all three.'], ['What I owned', 'Social strategy, creative content and posting systems, media buying, website updates and analytics. Connected the brand introduction with content people could relate to.'], ['What moved', 'Social engagement increased by 45% through creative content strategy and consistent posting, as recorded in my CV.'], ['The creative range', 'The introduction post explains the brand. The job search reel uses a human hook and humour. Different formats, with the same audience in mind.']]
  },
  aesthetics: {
    title: 'Vintage Aesthetics by MaDell', category: 'United Kingdom / Aesthetics / Social strategy', role: 'Social Media Strategist · June 2023 to March 2024', brand: { logo: 'assets/vintage-logo.png', name: 'Vintage Aesthetics by MaDell', note: 'Current brand logo from the official website.', instagram: 'https://www.instagram.com/vintageaestheticsbymadell/', website: 'https://www.vaestheticsbymadell.co.uk/' }, concept: ['Trust comes before', 'the booking.'], conceptNote: 'Education, positioning and storytelling, with more than 50% engagement growth during my role.', conceptClass: 'concept-aesthetics',
    sections: [['The brand', 'An aesthetics clinic and training business based in Enfield, London. Its offer spans aesthetic treatments, skin and beauty services, and practitioner education.'], ['My work at Vintage · UK', 'Social Media Strategist, June 2023 to March 2024. Used education and storytelling to support a premium clinic position and consultation interest. Engagement increased by more than 50%.'], ['MPN Aesthetics Clinic · Nigeria', 'Social Media Manager, October 2023 to January 2024. Managed content and paid optimisation. Engagement increased by 20% and followers by 15% within three months.'], ['The shared thinking', 'A clinic’s digital presence has to help people understand the service, see the brand consistently and feel comfortable taking the next step. The work connects audience education with consideration.'], ['The evidence', 'These figures and roles are recorded in my CV and campaign examples. The current logo provides brand context. My role and engagement results refer to the period shown above.']]
  },
  xie: {
    title: 'Xie Trails', category: 'Travel / Brand identity sample', role: 'Selected identity applications from my portfolio archive', image: 'assets/xie.webp', alt: 'Xie Trails identity applied to a tote bag, shirt and cap', asset: 'assets/xie.webp',
    sections: [['Beyond a logo', 'The mark, palette and repeating pattern carry the travel identity into a tote, shirt and cap.'], ['The story', '“Every trail tells a story” connects the visual expression with the experience of travel. The identity remains recognisable across physical applications.'], ['Why it belongs here', 'A brand has to hold together wherever people meet it. This portfolio sample shows that thinking beyond a single social post.']]
  },
  deck: {
    title: 'Dexwin', category: 'Technology / Strategy presentation sample', role: 'Market strategy & brand positioning', image: 'assets/strategy-cover.jpg', alt: 'Dexwin market strategy and brand positioning presentation cover', asset: 'assets/strategy-sample.pdf', assetLabel: 'Open the strategy presentation',
    sections: [['The brief', 'A sample roadmap for a technology business serving Ghana, West Africa and international buyers.'], ['Inside the deck', 'Customer segments, pain points, competition, positioning, messaging pillars, digital acquisition, sales enablement and growth measures.'], ['What it demonstrates', 'How audience insight, a commercial position and a practical acquisition plan can connect. The initiatives in the deck are strategic recommendations, rather than reported outcomes.']]
  }
};
const films = {
  hotel: { title: 'Chateau Nana Willine', category: 'Hospitality / Selected brand reel', source: 'assets/hotelFilm.mp4', poster: 'assets/hotelFilm.jpg', description: 'A hospitality reel from my portfolio archive, connecting the setting and hotel experience with the brand’s digital presentation.' },
  formica: { title: 'Job hunting. We’ve been there.', category: 'Formica / Relatable social content', source: 'assets/formica-reel.mp4', poster: 'assets/reel-poster.jpg', description: 'A short social video that turns familiar job search frustrations into a relatable hook.' },
  invest: { title: 'Invest Africa 54', category: 'US based brand / Investment campaign', source: 'assets/investFilm.mp4', poster: 'assets/investFilm.jpg', description: 'A short investment campaign video from my portfolio collection. It is presented as an example of marketing work.' },
  laundry: { title: 'Show the work. Earn the trust.', category: 'CG Dispo / Service content', source: 'assets/laundryFilm.mp4', poster: 'assets/laundryFilm.jpg', description: 'A couch cleaning service reel. The process gives the audience something practical to see and understand.' },
  travel: { title: 'Some stories need a sunset.', category: 'Personal work / Travel & atmosphere', source: 'assets/travelFilm.mp4', poster: 'assets/travelFilm.jpg', description: 'A personal travel film from my creative archive. A different pace, with atmosphere carrying the story.' },
  human: { title: 'The human in the story.', category: 'Personal work / Reflection', source: 'assets/humanFilm.mp4', poster: 'assets/humanFilm.jpg', description: 'Personal storytelling from my archive, included to show the voice and person beyond client campaigns.' }
};
const projectDialog = $('#project-dialog');
const filmDialog = $('#film-dialog');
const enquiryDialog = $('#enquiry-dialog');
const player = $('#film-player');
let projectTrigger, filmTrigger, enquiryTrigger;
let enquiryType = 'project';
function syncModalBody() { document.body.classList.toggle('dialog-open', projectDialog.open || filmDialog.open || enquiryDialog.open); }
function openFilm(key, trigger) {
  const film = films[key]; if (!film) return;
  filmTrigger = trigger;
  $('#film-dialog-title').textContent = film.title; $('#film-dialog-category').textContent = film.category;
  $('#film-description').textContent = film.description; $('#film-download').href = film.source;
  player.src = film.source; player.poster = film.poster; player.setAttribute('aria-label', film.title);
  filmDialog.showModal(); syncModalBody();
  // The visitor requested playback. Respect browsers that still require the native play button.
  player.play().catch(() => {});
}
$$('[data-film]').forEach(button => button.addEventListener('click', () => openFilm(button.dataset.film, button)));
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  const story = stories[button.dataset.project]; if (!story) return;
  projectTrigger = button;
  $('#dialog-title').textContent = story.title; $('#dialog-category').textContent = story.category; $('#dialog-role').textContent = story.role;
  const brand = $('#dialog-brand'); brand.hidden = !story.brand;
  if (story.brand) {
    $('#dialog-brand-logo').src = story.brand.logo; $('#dialog-brand-logo').alt = `${story.brand.name} logo`;
    $('#dialog-brand-note').textContent = story.brand.note;
    const links = $('#dialog-brand-links'); links.replaceChildren();
    [['Instagram', story.brand.instagram], ['Brand website', story.brand.website]].forEach(([label, url]) => { const link = document.createElement('a'); link.textContent = label; link.href = url; link.target = '_blank'; link.rel = 'noopener'; links.append(link); });
  }
  const image = $('#dialog-image'), concept = $('#dialog-concept'), asset = $('#dialog-asset');
  image.hidden = !story.image; concept.hidden = !story.concept; asset.hidden = !story.asset;
  if (story.image) { image.src = story.image; image.alt = story.alt; }
  concept.className = story.conceptClass || ''; concept.replaceChildren();
  if (story.concept) {
    story.concept.forEach(line => { const text = document.createElement('div'); text.textContent = line; concept.append(text); });
    const note = document.createElement('small'); note.textContent = story.conceptNote; concept.append(note);
  }
  if (story.asset) { asset.href = story.asset; asset.textContent = story.assetLabel || 'View original sample'; }
  const body = $('#dialog-story'); body.replaceChildren();
  story.sections.forEach(([heading, copy]) => { const h3 = document.createElement('h3'), p = document.createElement('p'); h3.textContent = heading; p.textContent = copy; body.append(h3, p); });
  const filmButton = $('#dialog-film'); filmButton.hidden = !story.film; filmButton.dataset.filmKey = story.film || '';
  projectDialog.showModal(); projectDialog.scrollTop = 0; syncModalBody();
}));
$('#dialog-film').addEventListener('click', event => { const key = event.currentTarget.dataset.filmKey; projectDialog.close(); openFilm(key, projectTrigger); });
$('#dialog-close').addEventListener('click', () => projectDialog.close());
$('#film-close').addEventListener('click', () => filmDialog.close());
$('#dialog-contact').addEventListener('click', () => projectDialog.close());
[projectDialog, filmDialog, enquiryDialog].forEach(dialog => dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); }));
projectDialog.addEventListener('close', () => { syncModalBody(); if (!filmDialog.open) projectTrigger?.focus({ preventScroll: true }); });
filmDialog.addEventListener('close', () => { player.pause(); player.removeAttribute('src'); player.load(); syncModalBody(); filmTrigger?.focus({ preventScroll: true }); });
function updateEnquiryDraft() {
  const subject = enquiryType === 'role' ? 'A role worth talking about' : 'Let’s talk about a project';
  const name = $('#enquiry-name').value.trim(), company = $('#enquiry-company').value.trim(), message = $('#enquiry-message').value.trim();
  const body = ['Hi Mcloyd,', '', message || (enquiryType === 'role' ? 'I would like to discuss a role with you.' : 'I would like to discuss a project with you.'), '', company ? `Brand or organisation: ${company}` : '', name ? `From: ${name}` : ''].filter((line, index, lines) => line || (index > 0 && lines[index - 1])).join('\n');
  $('#enquiry-email').href = `mailto:mquayson582@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = new URL('https://mail.google.com/mail/');
  gmail.search = new URLSearchParams({ view: 'cm', fs: '1', to: 'mquayson582@gmail.com', su: subject, body }).toString();
  $('#enquiry-gmail').href = gmail.href;
  $('#email-link').href = `mailto:mquayson582@gmail.com?subject=${encodeURIComponent(subject)}`;
}
function openEnquiry(type, trigger) {
  enquiryType = type === 'role' ? 'role' : 'project'; enquiryTrigger = trigger;
  $$('[data-contact]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.contact === enquiryType)));
  const role = enquiryType === 'role';
  $('#enquiry-title').textContent = role ? 'A team. A role. A little more possibility.' : 'Let’s build something worth noticing.';
  $('#enquiry-message-label').textContent = role ? 'Tell me about the opportunity' : 'What are we making happen?';
  $('#enquiry-message').placeholder = role ? 'The role, the team, the location, and what you need someone to bring.' : 'The idea, the challenge, the timing. Start anywhere.';
  updateEnquiryDraft(); enquiryDialog.showModal(); enquiryDialog.scrollTop = 0; syncModalBody();
}
$$('[data-contact]').forEach(button => button.addEventListener('click', () => openEnquiry(button.dataset.contact, button)));
$('#email-link').addEventListener('click', event => { event.preventDefault(); openEnquiry(enquiryType, event.currentTarget); });
['#enquiry-name', '#enquiry-company', '#enquiry-message'].forEach(selector => $(selector).addEventListener('input', updateEnquiryDraft));
$('#enquiry-close').addEventListener('click', () => enquiryDialog.close());
enquiryDialog.addEventListener('close', () => { syncModalBody(); enquiryTrigger?.focus({ preventScroll: true }); });
const motionButton = $('#motion-toggle');
function updateMotionControl() {
  if (reducedMotion.matches) { motionButton.textContent = 'Reduced motion'; motionButton.disabled = true; motionButton.setAttribute('aria-pressed', 'true'); $$('.reveal').forEach(item => item.classList.add('visible')); }
  else { motionButton.disabled = false; const paused = document.body.classList.contains('motion-paused'); motionButton.textContent = paused ? 'Resume motion' : 'Pause motion'; motionButton.setAttribute('aria-pressed', String(paused)); }
}
motionButton.addEventListener('click', () => { const paused = document.body.classList.toggle('motion-paused'); document.documentElement.classList.toggle('motion-paused', paused); updateMotionControl(); });
reducedMotion.addEventListener('change', updateMotionControl); updateMotionControl();
