const API = 'http://localhost:3000/results';
// 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=RuG9N6lD1Xss81PdRbmhuiJHjuiPEt6R';

function getStories() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data));
}

function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
    <figure>
    <img src="${story.multimedia[2].url}" alt="" />
    <figcaption>${story.multimedia[2].caption}</figcaption>
    </figure>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `,
    )
    .join('');

  document.querySelector('.stories').innerHTML = looped;
}
if (document.querySelector('.home')) {
  getStories();
}
