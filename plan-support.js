// Contact progress stays in this page's memory. No account, storage, or upload.
export const CONTACT_STATUSES = [
  { value: 'no-answer', label: 'No answer yet' },
  { value: 'documents', label: 'They need documents' },
  { value: 'no-funding', label: 'No funding available' },
  { value: 'not-eligible', label: 'This program could not take me' },
  { value: 'appointment', label: 'Appointment booked' }
];

export function getContactAdvice(resource, status) {
  const fallback = resource.fallback || 'Ask Mission Basic Needs to help you find another appropriate contact.';
  const advice = {
    'no-answer': {
      title: 'Check the intake route, then try again.',
      body: 'Check the contact instructions and any listed hours. If leaving a message is safe, ask when and how to follow up. You can explore another contact while you wait.',
      question: 'Is this the right intake contact for this program? When should I expect a reply, and is there another way to reach the team?',
      fallback
    },
    documents: {
      title: 'Find out exactly what is still needed.',
      body: 'Ask for the program’s current checklist, any deadline, and a safe way to submit records. Use the preparation list below to track what you have or need help with.',
      question: 'Which items are still needed for my request? If I cannot get one, what alternatives can you accept, and can we start any part of the process now?'
    },
    'no-funding': {
      title: 'Ask for a specific referral.',
      body: 'Ask whether funding is paused, whether there is a date to check back, and which other program may fit. Confirm any new provider’s own screening and availability.',
      question: 'Is there another fund or agency I can contact? Can you help connect me, and should I check back with your program?',
      fallback
    },
    'not-eligible': {
      title: 'Ask which requirement did not fit.',
      body: 'Ask which specific program and rule the decision concerns, whether missing or corrected information can be reviewed, and which other route may fit your situation.',
      question: 'Can you explain why this program could not take my request? Is there a review process, or another program you can refer me to?',
      fallback
    },
    appointment: {
      title: 'Confirm the details before you go.',
      body: 'Confirm the date, time, location or call link, and who you will meet. Ask what to bring, how to reschedule, and about language or access support if needed. An appointment is a next step, not a promise of assistance.',
      question: 'What should I have ready for our appointment, where or how will we meet, and who should I contact if my plans change?'
    }
  };
  return advice[status] || null;
}

export function getPreparationItems(resource) {
  const guidanceItems = resource.documents?.length ? resource.documents : ['Ask the provider for its current preparation checklist.'];
  const items = guidanceItems.flatMap(text => /^HPS may request household IDs, a lease,/.test(text) ? [
    'Household IDs, if requested.',
    'A lease, if requested.',
    'Two months of income information, if requested.',
    'Recent bills, if requested.'
  ] : [text]);
  return items.map((text, index) => {
    const guidance = /^(ask|request|confirm|no\b|you can|do not|contact|check|keep|missing)\b/i.test(text.trim());
    let question;
    if (guidance) question = `Your guide mentions: “${text}” What should I prepare for my request, and can you help me work out the next step if I am unsure?`;
    else if (/\b(lease|rent|landlord|eviction)\b/i.test(text)) question = 'If I do not have this rental or housing record, which alternatives can you accept? Can you tell me how to request a copy and whether any part of intake can start now?';
    else if (/\b(income|pay|wage|benefit)\b/i.test(text)) question = 'If I do not have this income record or my income is irregular, how can I document my situation? Which alternatives can your program accept?';
    else if (/\b(ids?|identification|identity)\b/i.test(text)) question = 'If I do not have this identification, what alternatives can your program accept? Can you help me find out how to replace it?';
    else if (/\b(member|plan|insurance)\b/i.test(text)) question = 'If I cannot find my member or plan information, how can I confirm it with you safely? What do you need to look up my coverage?';
    else question = `Your guide lists: “${text}” If I do not have this, which alternatives can your program accept, and can any part of intake start while I gather it?`;
    return { index, text, guidance, question, helpLabel: guidance ? 'I need help with this' : 'I don’t have this' };
  });
}

export function createPlanSupport({ esc, find, onUpdate = () => {} }) {
  const progress = new Map();
  const get = id => {
    if (!progress.has(id)) progress.set(id, { status: '', ready: new Set(), missing: new Set() });
    return progress.get(id);
  };
  const statusLabel = value => CONTACT_STATUSES.find(s => s.value === value)?.label || 'Choose an update';
  const countLabel = (record, total) => `${record.ready.size} of ${total} checked`;

  function adviceMarkup(resource, status) {
    const advice = getContactAdvice(resource, status);
    if (!advice) return '<p class="plan-support-hint">Choose what happened to see a next action for this contact.</p>';
    return `<div class="contact-advice"><h4>${esc(advice.title)}</h4><p>${esc(advice.body)}</p><p class="contact-question"><strong>You can ask</strong> “${esc(advice.question)}”</p>${advice.fallback ? `<p class="contact-alternative"><strong>Another route to ask about:</strong> ${esc(advice.fallback)}</p>` : ''}<div class="contact-advice-actions">${status === 'documents' || status === 'appointment' ? `<button class="text-button" type="button" data-plan-open-prep="${esc(resource.id)}">Open my preparation list ↓</button>` : `<button class="text-button" type="button" data-detail="${esc(resource.id)}">Review contact details ↗</button><button class="text-button" type="button" data-page="directory">Explore other contacts →</button>`}</div></div>`;
  }

  function render(resource) {
    const record = get(resource.id);
    const items = getPreparationItems(resource);
    const key = `plan-${encodeURIComponent(resource.id)}`;
    return `<div class="plan-support" data-plan-resource="${esc(resource.id)}"><details class="contact-progress" ${record.status ? 'open' : ''}><summary><span>After you reach out</span><span class="plan-support-count" data-contact-summary>${esc(statusLabel(record.status))}</span></summary><div class="plan-support-body"><label class="contact-status-label" for="${esc(key)}-status">What happened with this contact?</label><select id="${esc(key)}-status" data-contact-status="${esc(resource.id)}"><option value="" ${!record.status ? 'selected' : ''}>Choose an update</option>${CONTACT_STATUSES.map(s => `<option value="${s.value}" ${record.status === s.value ? 'selected' : ''}>${esc(s.label)}</option>`).join('')}</select><div data-contact-advice aria-live="polite" aria-atomic="true">${adviceMarkup(resource, record.status)}</div></div></details><details class="contact-preparation"><summary><span>Prepare for this contact</span><span class="plan-support-count" data-preparation-count>${countLabel(record, items.length)}</span></summary><div class="plan-support-body"><p class="plan-support-hint">A starting checklist from this contact’s guidance. Confirm which items apply to you. Check an item when it is ready or clarified; you can ask for help before you have everything.</p><ul class="preparation-list">${items.map(item => `<li data-prep-row="${item.index}"><div class="preparation-item"><label><input type="checkbox" data-prep-ready="${esc(resource.id)}" data-prep-index="${item.index}" ${record.ready.has(item.index) ? 'checked' : ''}><span>${esc(item.text)}</span></label><button type="button" class="prep-help-button" data-prep-missing="${esc(resource.id)}" data-prep-index="${item.index}" aria-pressed="${record.missing.has(item.index)}" aria-controls="${esc(key)}-help-${item.index}">${record.missing.has(item.index) ? 'Help needed ✓' : esc(item.helpLabel)}</button></div><div class="preparation-question" id="${esc(key)}-help-${item.index}" data-prep-help ${record.missing.has(item.index) ? '' : 'hidden'}><strong>A question for the provider</strong><p>“${esc(item.question)}”</p><span>The provider confirms which alternatives are accepted.</span></div></li>`).join('')}</ul><p class="plan-support-hint preparation-privacy">Only checkmarks and choices are kept here, until you refresh or close the page. No documents are uploaded.</p></div></details></div>`;
  }

  function updatePreparation(root, resource, record) {
    if (!root) return;
    const items = getPreparationItems(resource);
    root.querySelector('[data-preparation-count]').textContent = countLabel(record, items.length);
    for (const item of items) {
      const row = root.querySelector(`[data-prep-row="${item.index}"]`);
      if (!row) continue;
      const missing = record.missing.has(item.index);
      row.querySelector('[data-prep-ready]').checked = record.ready.has(item.index);
      const button = row.querySelector('[data-prep-missing]');
      button.setAttribute('aria-pressed', String(missing));
      button.textContent = missing ? 'Help needed ✓' : item.helpLabel;
      row.querySelector('[data-prep-help]').hidden = !missing;
    }
  }

  function handleClick(button) {
    if (!button?.hasAttribute) return false;
    if (button.hasAttribute('data-plan-open-prep')) {
      const root = button.closest('[data-plan-resource]');
      const details = root?.querySelector('.contact-preparation');
      if (details) {
        details.open = true;
        details.querySelector('summary').focus();
      }
      return true;
    }
    if (!button.hasAttribute('data-prep-missing')) return false;
    const resource = find(button.dataset.prepMissing);
    const index = Number(button.dataset.prepIndex);
    if (!resource || !Number.isInteger(index) || !getPreparationItems(resource)[index]) return true;
    const record = get(resource.id);
    if (record.missing.has(index)) record.missing.delete(index);
    else { record.missing.add(index); record.ready.delete(index); }
    updatePreparation(button.closest('[data-plan-resource]'), resource, record);
    onUpdate(resource.id);
    return true;
  }

  function handleChange(target) {
    if (!target?.hasAttribute) return false;
    if (target.hasAttribute('data-contact-status')) {
      const resource = find(target.dataset.contactStatus);
      if (!resource || (target.value && !CONTACT_STATUSES.some(s => s.value === target.value))) return true;
      const record = get(resource.id);
      record.status = target.value;
      const root = target.closest('[data-plan-resource]');
      if (root) {
        root.querySelector('[data-contact-summary]').textContent = statusLabel(record.status);
        root.querySelector('[data-contact-advice]').innerHTML = adviceMarkup(resource, record.status);
      }
      onUpdate(resource.id);
      return true;
    }
    if (!target.hasAttribute('data-prep-ready')) return false;
    const resource = find(target.dataset.prepReady);
    const index = Number(target.dataset.prepIndex);
    if (!resource || !Number.isInteger(index) || !getPreparationItems(resource)[index]) return true;
    const record = get(resource.id);
    if (target.checked) { record.ready.add(index); record.missing.delete(index); }
    else record.ready.delete(index);
    updatePreparation(target.closest('[data-plan-resource]'), resource, record);
    onUpdate(resource.id);
    return true;
  }

  function text(resource) {
    const record = get(resource.id);
    const advice = getContactAdvice(resource, record.status);
    const lines = ['CONTACT UPDATE: ' + (record.status ? statusLabel(record.status) : 'Not recorded')];
    if (advice) lines.push(advice.title, advice.body, 'You can ask: ' + advice.question, ...(advice.fallback ? ['Another route to ask about: ' + advice.fallback] : []));
    lines.push('PREPARATION TO CONFIRM WITH THIS CONTACT:');
    for (const item of getPreparationItems(resource)) {
      lines.push(`${record.ready.has(item.index) ? '[x]' : '[ ]'} ${item.text}${record.missing.has(item.index) ? ' — HELP NEEDED' : ''}`);
      if (record.missing.has(item.index)) lines.push('Ask: ' + item.question);
    }
    return lines.join('\n');
  }

  return { render, handleClick, handleChange, text, reset: () => progress.clear(), remove: id => progress.delete(id) };
}
