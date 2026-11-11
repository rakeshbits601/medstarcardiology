'use strict';

const form = document.querySelector('#callback-form');
const nameInput = form.elements.namedItem('name');
const phoneInput = form.elements.namedItem('phone');
const phoneError = document.querySelector('#phone-error');
const formResult = document.querySelector('#form-result');
const submitButton = form.querySelector('button[type="submit"]');
const formNote = document.querySelector('#form-note');
const endpoint = form.dataset.endpoint;
const hospitalWhatsApp = 'https://wa.me/919281443956';

function emitInteraction(action) {
  document.dispatchEvent(new CustomEvent('medstar:booking-interaction', {
    detail: { action }
  }));
}

function showPhoneError(message) {
  phoneError.textContent = message;
  phoneError.hidden = !message;
  if (message) phoneInput.setAttribute('aria-invalid', 'true');
  else phoneInput.removeAttribute('aria-invalid');
}

function showResult(message, isError = false) {
  formResult.textContent = message;
  formResult.toggleAttribute('data-error', isError);
  formResult.hidden = false;
  formResult.focus();
}

if (endpoint) {
  submitButton.firstChild.textContent = 'Request a callback ';
  formNote.firstChild.textContent = 'Medstar can use these details to contact you about your visit. ';
}
submitButton.disabled = false;

nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
phoneInput.addEventListener('input', () => showPhoneError(''));

document.addEventListener('click', (event) => {
  const control = event.target.closest('[data-action]');
  if (control) emitInteraction(control.dataset.action);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formResult.hidden = true;
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.setCustomValidity('Enter your name.');
    nameInput.reportValidity();
    return;
  }

  const nationalNumber = phoneInput.value.replace(/[\s()-]/g, '').replace(/^(?:\+91|0091|91)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(nationalNumber)) {
    showPhoneError('Enter a valid 10-digit Indian mobile number.');
    phoneInput.focus();
    return;
  }

  const mobile = '+91' + nationalNumber;
  if (!endpoint) {
    const message = 'Hello Medstar, please call me to arrange a cardiology consultation.\nName: ' + name + '\nCallback number: ' + mobile;
    emitInteraction('callback_whatsapp_open');
    window.location.assign(hospitalWhatsApp + '?text=' + encodeURIComponent(message));
    return;
  }

  submitButton.disabled = true;
  form.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      redirect: 'error',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mobile, department: 'cardiology' }),
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok || (await response.json()).accepted !== true) throw new Error('Request not acknowledged');
    form.reset();
    emitInteraction('callback_request_accepted');
    showResult('Request received. Medstar will contact you to confirm appointment availability.');
  } catch {
    showResult('We couldn’t confirm your request. Try again or use the phone or WhatsApp option above.', true);
  } finally {
    form.removeAttribute('aria-busy');
    submitButton.disabled = false;
  }
});
