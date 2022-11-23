import './css/styles.css';
import { PixabayApi } from './pixabay-api'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('#gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more')
// console.log(galleryEl);
const pixabayApi = new PixabayApi();
// console.log(pixabayApi);



const onSearchFormSubmit = async event => {
    event.preventDefault();
    // console.log('hello');
    pixabayApi.page = 1;
  pixabayApi.searchQuery = event.target.elements.searchQuery.value;
  
  console.log(pixabayApi.per_page);
  
    // console.log(event.target.elements.searchQuery.value);
  
  // async/await---------------//------------------------------------------
  try {
    const response = await pixabayApi.fetchPhotos();
   const { data } = response;
        console.log(response);  
        if (!data.totalHits) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
          galleryEl.innerHTML = '';
          loadMoreBtnEl.classList.add('is-hidden');
        return
        }
    if (data.totalHits < pixabayApi.per_page) {
       loadMoreBtnEl.classList.add('is-hidden');
    }
    if (data.totalHits > pixabayApi.per_page) {
          // console.log(per_page);
            // для перевірки => rw(5 totalHits)
         loadMoreBtnEl.classList.remove('is-hidden');       
        }
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        galleryEl.innerHTML = renderGallery(data.hits).join('');
       
        lightbox = new SimpleLightbox('.gallery .gallery-div a');
} catch (err) {
        console.log(err);
    };
  
  // then/catch ------------------//-----------------
  
    // console.log(pixabayApi);
    // pixabayApi.fetchPhotos().then(response => {
    //     const { data } = response;
    //     console.log(response);  
    //     if (!data.totalHits) {
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //       galleryEl.innerHTML = '';
    //       loadMoreBtnEl.classList.add('is-hidden');
    //     return
    //     }
    //     if (Number(data.totalHits) > 40) {
    //         // для перевірки => rw(5 totalHits)
    //      loadMoreBtnEl.classList.remove('is-hidden');       
    //     }
    //     Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    //     galleryEl.innerHTML = renderGallery(data.hits).join('');
       
    //     lightbox = new SimpleLightbox('.gallery .gallery-div a');
    // }).catch(err => {
    //     console.log(err);
    // });
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
const onLoadMoreBtnClick = async event => {
    // console.log('hello');
  pixabayApi.page += 1;

  // async/await---------------//------------------------------------------

  try {
    const response = await pixabayApi.fetchPhotos();
     const { data } = response;
    galleryEl.insertAdjacentHTML('beforeend', renderGallery(data.hits).join(''));
    lightbox.refresh();
    //  для перевірки => ns(92 totalHits)
    if ((data.totalHits/pixabayApi.per_page) < pixabayApi.page) {
     loadMoreBtnEl.classList.add('is-hidden');
     Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results.") 
        }
    } catch (err) {
        console.log(err);
    };
  
  
// then/catch ------------------//-----------------
  
    // pixabayApi.fetchPhotos().then(response => {
    // const { data } = response;
    // galleryEl.insertAdjacentHTML('beforeend', renderGallery(data.hits).join(''));
    // lightbox.refresh();
    // //  для перевірки => ns(92 totalHits)
    // if (Math.ceil(data.totalHits/40)  === pixabayApi.page) {
    //  loadMoreBtnEl.classList.add('is-hidden');
    //  Notiflix.Notify.warning(
    //   "We're sorry, but you've reached the end of search results.") 
    //     }
    // }).catch(err => {
    // console.log(err);
    // });

}



searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);











