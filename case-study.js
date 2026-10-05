'use strict';
const shareButton = document.querySelector('.case-share');
const shareStatus = document.querySelector('.share-status');
shareButton?.addEventListener('click', async () => {
  const url = shareButton.dataset.shareUrl;
  shareStatus.textContent = '';
  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      shareStatus.textContent = 'Case study link copied.';
    } else {
      shareStatus.textContent = `Share this link: ${url}`;
    }
  } catch (error) {
    if (error.name !== 'AbortError') shareStatus.textContent = `Share this link: ${url}`;
  }
});
