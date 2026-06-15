export function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || 'landing';
  const [path, queryString = ''] = raw.split('?');
  return {
    page: path || 'landing',
    params: Object.fromEntries(new URLSearchParams(queryString)),
  };
}

export function navigateHash(page, params = {}) {
  const query = new URLSearchParams(params).toString();
  window.location.hash = query ? `${page}?${query}` : page;
}
