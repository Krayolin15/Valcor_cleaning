(() => {
  const config = window.OBSIDIAN_CONFIG || {};
  const clean = value => String(value || '').trim();
  const validEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const setStatus = (form,text,type='success') => {
    const status = form.querySelector('[data-form-status]'); if(!status) return;
    status.textContent = text; status.className = `form-status is-visible ${type==='error'?'form-status--error':''}`;
  };
  const markInvalid = (field,invalid) => {field.setAttribute('aria-invalid',String(invalid));};
  const validate = form => {
    let okay = true;
    form.querySelectorAll('[required]').forEach(field=>{
      let valid = field.type === 'checkbox' ? field.checked : !!clean(field.value);
      if(field.type==='email' && valid) valid = validEmail(clean(field.value));
      markInvalid(field,!valid); if(!valid) okay=false;
    });
    const phone = form.querySelector('[name="phone"]');
    if(phone && clean(phone.value) && clean(phone.value).replace(/\D/g,'').length < 7){markInvalid(phone,true);okay=false;}
    return okay;
  };
  const values = form => Object.fromEntries(new FormData(form).entries());
  const enquiryText = data => [
    'OBSIDIAN CLEANING — WEBSITE ENQUIRY','',
    `Name: ${clean(data.firstName)} ${clean(data.lastName)}`,
    `Company: ${clean(data.company) || 'Not provided'}`,
    `Email: ${clean(data.email)}`,
    `Telephone: ${clean(data.phone)}`,
    `Preferred contact: ${clean(data.contactMethod)}`,
    '',`Service: ${clean(data.service)}`,
    `Property type: ${clean(data.propertyType)}`,
    `Location: ${clean(data.location)}`,
    `Approximate size: ${clean(data.size)}`,
    `Frequency: ${clean(data.frequency)}`,
    `Preferred start date: ${clean(data.startDate) || 'Not specified'}`,
    `Washroom equipment arrangement: ${clean(data.equipmentOption) || 'Not specified'}`,
    `Operating hours / access: ${clean(data.accessHours) || 'Not specified'}`,
    '',`Requirements: ${clean(data.message)}`
  ].join('\n');
  const deliver = (form,data,text) => {
    const number = clean(config.whatsappNumber).replace(/\D/g,'');
    const email = clean(config.email);
    if(number){
      const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
      window.open(url,'_blank','noopener,noreferrer');
      setStatus(form,'Your enquiry has been prepared in WhatsApp. Please review the message and press Send in WhatsApp to submit it.');
    } else if(email){
      const subject = encodeURIComponent(`Obsidian Cleaning enquiry — ${data.service || data.subject || 'Website enquiry'}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(text)}`;
      setStatus(form,'Your email app should open with the enquiry prepared. Please review and send the email to complete your enquiry.');
    } else {
      setStatus(form,'The form is valid, but Obsidian’s WhatsApp number and email address have not yet been configured. Your enquiry has not been sent. Please add the verified contact details in js/config.js before publishing.','error');
      if(navigator.clipboard?.writeText){navigator.clipboard.writeText(text).then(()=>setStatus(form,'Your enquiry is valid and has been copied to your clipboard. It has not been sent because Obsidian’s WhatsApp number and email are not configured yet. Add the verified details in js/config.js before publishing.','error')).catch(()=>{});}
    }
  };
  document.querySelectorAll('[data-enquiry-form]').forEach(form=>{
    form.querySelectorAll('input,select,textarea').forEach(field=>field.addEventListener('input',()=>markInvalid(field,false)));
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!validate(form)){setStatus(form,'Please check the highlighted fields and complete all required information.','error');form.querySelector('[aria-invalid="true"]')?.focus();return;}
      const data=values(form); deliver(form,data,enquiryText(data));
    });
  });
  document.querySelectorAll('[data-contact-form]').forEach(form=>{
    form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>markInvalid(field,false)));
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!validate(form)){setStatus(form,'Please check the highlighted fields and complete all required information.','error');form.querySelector('[aria-invalid="true"]')?.focus();return;}
      const data=values(form); const text=['OBSIDIAN CLEANING — CONTACT ENQUIRY','',`Name: ${data.name}`,`Email: ${data.email}`,`Telephone: ${data.phone||'Not provided'}`,`Subject: ${data.subject}`,'',`Message: ${data.message}`].join('\n');
      deliver(form,data,text);
    });
  });
})();
