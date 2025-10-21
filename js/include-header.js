(async function () {
  const container = document.getElementById('site-header');
  if (!container) return;

  const url = container.dataset.include || 'includes/header.html';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error('Failed to load include:', err);
  }
})();