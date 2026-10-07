const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.textContent = 'Menu';
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.textContent = open ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('header')) closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
// The contact section already has a WhatsApp CTA; keep the floating button
// out of the way of its form, especially on narrow screens.
const floatingContact = document.querySelector('.wa');
new IntersectionObserver(entries => {
  floatingContact.hidden = entries[0].isIntersecting;
}, { threshold: 0 }).observe(document.querySelector('#contact'));
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service').value = link.dataset.service;
  });
});
document.querySelector('#enquiry').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name;
  const message = form.elements.message;
  for (const field of [name, message]) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please enter a value.');
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = `Hi Skyline! My name is ${data.get('name').trim()}.\nBusiness: ${data.get('business').trim() || 'Not supplied'}\nService: ${data.get('service')}\n\n${data.get('message').trim()}`;
  window.location.assign('https://wa.me/27625142810?text=' + encodeURIComponent(text));
});
document.querySelectorAll('#enquiry input, #enquiry textarea').forEach(field => {
  field.addEventListener('input', () => field.setCustomValidity(''));
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => {
      const selected = other === button;
      other.classList.toggle('active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.querySelector('#service-count').textContent = `${count} services · ${button.textContent.trim()}`;
  });
});
