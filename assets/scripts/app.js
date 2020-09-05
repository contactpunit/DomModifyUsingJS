const addMovieModal = document.getElementById('add-modal');

const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const section = document.getElementById('entry-text');
const deleteMovieModel = document.getElementById('delete-modal');

const movies = [];

const clearMovieInputs = () => {
    for( element of userInputs) {
        element.value = '';
    }
}

const updatUI = () => {
    if (movies.length === 0) {
        section.style.display = 'block';
    }else {
        section.style.display = 'none';
    }
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image>
      <img src="${imageUrl}" alt="${title}"> 
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating} /5 stars</p>
    </div>
    `;
    const listRoot = document.getElementById('movie-list');
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    listRoot.append(newMovieElement);
}

const deleteMovie = (id) => {
    let index = 0;
    for (const movie of movies) {
        if (movie.id === id) {
            break;
        }
        index++;
    }
    movies.splice(index, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[index].remove();
    cancelMovieDeletion();
    updatUI();
}

const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModel.classList.remove('visible')
}

const deleteMovieHandler = (id) => {
    deleteMovieModel.classList.add('visible');
    toggleBackdrop();
    const cancelDelete = deleteMovieModel.querySelector('.btn--passive');
    let confirmDelete = deleteMovieModel.querySelector('.btn--danger');

    confirmDelete.replaceWith(confirmDelete.cloneNode(true));
    confirmDelete = deleteMovieModel.querySelector('.btn--danger');
    cancelDelete.removeEventListener('click', cancelMovieDeletion);
    cancelDelete.addEventListener('click', cancelMovieDeletion);

    confirmDelete.addEventListener('click', deleteMovie.bind(null, id));
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible')
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

const backdropMovieHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearMovieInputs();
}

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
}

const confirmAddMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    if(
        titleValue.trim() === '' || 
        imageUrlValue === '' || 
        ratingValue === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5) {
            alert('Please enter valid values.');
            return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updatUI();
}

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropMovieHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler)
