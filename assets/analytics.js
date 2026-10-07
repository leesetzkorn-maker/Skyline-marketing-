// Skyline analytics event hooks.
// Configure window.SKYLINE_ANALYTICS_ENDPOINT to a secure collector endpoint before deployment.
// No fake metrics are generated; if no endpoint is configured, events are ignored.
(() => {
  const endpoint = window.SKYLINE_ANALYTICS_ENDPOINT;
  const send = (event, meta = {}) => {
    if (!endpoint) return;
    const payload = JSON.stringify({
      event,
      path: location.pathname,
      referrer: document.referrer || null,
      ts: new Date().toISOString(),
      meta
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
    } else {
      fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    }
  };
  send('page_view');
  document.addEventListener('click', e => {
    const a = e.target.closest('a,button');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    let event = 'cta_click';
    if (href.includes('wa.me')) event = 'whatsapp_click';
    else if (href.startsWith('mailto:')) event = 'email_click';
    else if (href.startsWith('tel:')) event = 'phone_click';
    else if (a.dataset.service) event = 'service_click';
    send(event, { label: (a.textContent || '').trim().slice(0, 120), service: a.dataset.service || null });
  });
  document.querySelector('#enquiry')?.addEventListener('submit', () => send('lead_submit', {
    service: document.querySelector('#service')?.value || null
  }));
})();
