// Skyline Marketing privacy-light analytics. Uses the public Supabase publishable key and a restricted RPC only.
(() => {
  const cfg = window.SKYLINE_SUPABASE;
  if (!cfg?.url || !cfg?.key) return;
  const rpc = cfg.url + "/rest/v1/rpc/insert_event";
  let sid = sessionStorage.getItem("skyline_sid");
  if (!sid) { sid = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2); sessionStorage.setItem("skyline_sid", sid); }
  const device = matchMedia("(max-width: 767px)").matches ? "mobile" : matchMedia("(max-width: 1024px)").matches ? "tablet" : "desktop";
  const send = (event, meta = {}) => fetch(rpc, {
    method:"POST", keepalive:true,
    headers:{apikey:cfg.key,"Content-Type":"application/json"},
    body:JSON.stringify({p_event_name:event,p_path:location.pathname,p_referrer:document.referrer||null,p_session_id:sid,p_device_type:device,p_metadata:meta})
  }).catch(()=>{});
  send("page_view");
  document.addEventListener("click", e => {
    const el=e.target.closest("a,button"); if(!el) return;
    const href=el.getAttribute("href")||"";
    let event="cta_click";
    if(href.includes("wa.me")) event="whatsapp_click";
    else if(href.startsWith("mailto:")) event="email_click";
    else if(href.startsWith("tel:")) event="phone_click";
    else if(el.dataset.service) event="service_click";
    send(event,{label:(el.textContent||"").trim().slice(0,120),service:el.dataset.service||null});
  });
  document.querySelector("#enquiry")?.addEventListener("submit",()=>send("lead_submit",{service:document.querySelector("#service")?.value||null}));
})();
