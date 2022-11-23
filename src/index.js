import './css/styles.css';
import { PixabayApi } from './pixabay-api'

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('#gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more')
// console.log(galleryEl);
const pixabayApi = new PixabayApi();
// console.log(pixabayApi);



const onSearchFormSubmit = event => {
    event.preventDefault();
    // console.log('hello');
    pixabayApi.page = 1;
    pixabayApi.searchQuery = event.target.elements.searchQuery.value;
    // console.log(event.target.elements.searchQuery.value);

    // console.log(pixabayApi);
    pixabayApi.fetchPhotos().then(data => {
       console.log(data);
        galleryEl.innerHTML = renderGallery(data.hits).join('');
        loadMoreBtnEl.classList.remove('is-hidden');

    }).catch(err => {
        console.log(err);
    });
}


function renderGallery(array) {
  return array.map(
    img =>
      `<div class="gallery-div">
          <a class="gallery-link" href="${img.largeImageURL}"><img src="${img.webformatURL}" class="gallery-image" alt="${img.tags}" loading="lazy" /></a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${img.likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${img.views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${img.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${img.downloads}
            </p>
          </div>
        </div>`
  );
}
onLoadMoreBtnClick = event => {
    // console.log('hello');
    pixabayApi.page += 1;
     pixabayApi.fetchPhotos().then(data => {
       
         galleryEl.insertAdjacentHTML('beforeend', renderGallery(data.hits).join(''));
         if (data.totalHits === pixabayApi.page) {
             loadMoreBtnEl.classList.add('is-hidden');  
         }
        

    }).catch(err => {
        console.log(err);
    });

}



searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click',onLoadMoreBtnClick)











