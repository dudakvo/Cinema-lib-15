//-------------Для Вовы--------------//
import filmCardTamplate from './templates/filmCardTamplate.hbs';
import MovieService from './js/apiService'
import handlebars from "./templates/main-page.hbs";
import refs from "./js/refs";



const searchServices = new MovieService();

export default async function onSearch(e) {
    e.preventDefault();
    refs.filmGalery.innerHTML = '';
    searchServices.query = refs.searchInput.value;
    if (searchServices.query==='') {
      return
    }

    try { 
        const films = await searchServices.searchMovie();
        console.log("onSearch -> films", films)
        if(films.length===0)
        {
          console.log('За вашим запросом ничего не найдено');
        }
        await renderGalleryFilms(films.results);
        randerGenreFilm();
    }
    catch(err) {
    console.log("onSearch -> err", err);
    }
  };

  function renderGalleryFilms(films) {
    const markup = filmCardTamplate(films);
    refs.filmGalery.innerHTML = markup;
  }

  async function randerGenreFilm(){
    const filmItemRefs=document.querySelectorAll('.film__item');   
    Array.from(filmItemRefs).forEach(async filmItemRef => {
      const spanRefs=filmItemRef.querySelector('.film__item--genre');
      const genere = await searchServices.getGenre(filmItemRef.dataset.id);
      spanRefs.textContent=genere;
    });
  }