export function markUp(data) {
  return data
    .map(el => {
      return `<div class="photo-card">
      <a class="photo-link" href="${el.largeImageURL}">
  <img class = "photo-item"
    src="${el.webformatURL}"
    alt="${el.tags}"
    loading="lazy"/>
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${el.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${el.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${el.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}
