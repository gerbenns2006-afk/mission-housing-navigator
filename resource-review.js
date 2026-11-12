// Review metadata describes the source check, never current funding or capacity.
const DAY = 86_400_000;
const CORRECTIONS = 'https://github.com/gerbenns2006-afk/mission-housing-navigator/issues/new';
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function sourceDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function reviewInfo(resource, { now = new Date() } = {}) {
  const date = sourceDate(resource?.checked);
  const current = new Date(now);
  const today = Number.isFinite(current.getTime()) ? Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()) : NaN;
  if (!date || !Number.isFinite(today) || date.getTime() > today) {
    return { checked: null, label: 'Source review date unavailable', overdue: false };
  }
  const label = `Source reviewed ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`;
  return { checked: resource.checked, label, overdue: today - date.getTime() > 90 * DAY };
}

function officialUrl(resource) {
  for (const value of [resource?.url, ...(resource?.sources || []).map(source => source.url)]) {
    try {
      const url = new URL(value);
      if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
    } catch { /* Skip missing or unsupported URLs. */ }
  }
  return '';
}

// Accept only public listing fields. Never pass student answers or plan state here.
export function correctionUrl(resource) {
  const query = new URLSearchParams({
    template: 'resource-correction.yml',
    title: `Listing correction: ${String(resource?.name || 'Housing resource').slice(0, 160)}`,
    resource: `${resource?.name || 'Housing resource'} (${resource?.id || 'unknown'})`,
    source: officialUrl(resource)
  });
  return `${CORRECTIONS}?${query}`;
}

export function resourceReview(resource, options) {
  const review = reviewInfo(resource, options);
  const date = review.checked ? `<time datetime="${escape(review.checked)}">${escape(review.label)}</time>` : escape(review.label);
  return `<div class="resource-review"><p class="small"><strong>${date}</strong>${review.overdue ? ' · Review due' : ''}<br>${review.overdue ? 'This source check is over 90 days old. ' : ''}Confirm current intake and availability with the provider.</p><details class="resource-correction"><summary>Report incorrect information</summary><p class="small">Reports are public and require GitHub sign-in. Include listing details only, without personal information or documents.</p><a class="text-button" href="${escape(correctionUrl(resource))}" target="_blank" rel="noopener noreferrer">Report a listing issue on GitHub (public) ↗</a></details></div>`;
}
