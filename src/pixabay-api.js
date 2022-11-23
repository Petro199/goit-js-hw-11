'use strict';

export class PixabayApi {
    #API_KEY = '31534767-c57362892b92417d1bf33283f';
    constructor() {
        this.page = null;
        this.searchQuery = null;
    }
    fetchPhotos() {
        return fetch(`https://pixabay.com/api/?key=${this.#API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
    }
}