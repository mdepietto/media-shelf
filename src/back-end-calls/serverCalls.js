const apiBooks = async () => await fetch('/apiBooks', { method: 'GET' }).then(res => res.json());
const booksByTitle = async () => await fetch('/booksByTitle', { method: 'GET' }).then(res => res.json());
const booksByRating = async () => await fetch('/booksByRating', { method: 'GET' }).then(res => res.json());
const apiBookNotes = async () => await fetch('/apiBookNotes', { method: 'GET' }).then(res => res.json());

const apiMovies = async () => await fetch('/apiMovies', { method: 'GET' }).then(res => res.json());
const moviesByTitle = async () => await fetch('/moviesByTitle', { method: 'GET' }).then(res => res.json());
const moviesByRating = async () => await fetch('/moviesByRating', { method: 'GET' }).then(res => res.json());
const apiMovieNotes = async () => await fetch('/apiMovieNotes', { method: 'GET' }).then(res => res.json());

const apiShows = async () => await fetch('/apiShows', { method: 'GET' }).then(res => res.json());
const showsByTitle = async () => await fetch('/showsByTitle', { method: 'GET' }).then(res => res.json());
const showsByRating = async () => await fetch('/showsByRating', { method: 'GET' }).then(res => res.json());
const apiShowNotes = async () => await fetch('/apiShowNotes', { method: 'GET' }).then(res => res.json());

module.exports = { apiBooks, booksByTitle, booksByRating, apiBookNotes, apiMovies, moviesByTitle, moviesByRating, apiMovieNotes, apiShows, showsByTitle, showsByRating, apiShowNotes }