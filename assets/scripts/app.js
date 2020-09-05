const addMovieModal = document.getElementById('add-modal');

const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];

const clearMovieInputs = () => {
    for( element of userInputs) {
        element.value = '';
    }
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible')
}
const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
}

const backdropMovieHandler = () => {
    toggleMovieModal();
}

const cancelAddMovieHandler = () => {
    toggleMovieModal();
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
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    clearMovieInputs();
    toggleMovieModal();
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropMovieHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler)
