const DAY_MS = 24 * 60 * 60 * 1000;

function dateInShanghai(value) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(value);
  const field = (type) => parts.find((part) => part.type === type)?.value;
  return `${field('year')}-${field('month')}-${field('day')}`;
}

function parseDateOnly(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null;
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function assessOrgIntelligenceFreshness(latestDate, now = new Date(), maxAgeDays = 1) {
  const latestTimestamp = parseDateOnly(latestDate);
  const currentTimestamp = parseDateOnly(dateInShanghai(now));
  if (latestTimestamp === null || currentTimestamp === null) {
    return { status: 'unknown', ageDays: null, maxAgeDays };
  }

  const ageDays = Math.max(0, Math.floor((currentTimestamp - latestTimestamp) / DAY_MS));
  return {
    status: ageDays <= maxAgeDays ? 'pass' : 'fail',
    ageDays,
    maxAgeDays,
  };
}

module.exports = { assessOrgIntelligenceFreshness };
