export const apiBooks = async () => await fetch('/apiBooks', { method: 'GET' }).then(res => res.json())
export const booksByTitle = async () => await fetch('/booksByTitle', { method: 'GET' }).then(res => res.json())
export const booksByRating = async () => await fetch('/booksByRating', { method: 'GET' }).then(res => res.json())
export const apiBookNotes = async () => await fetch('/apiBookNotes', { method: 'GET' }).then(res => res.json())

export const apiMovies = async () => await fetch('/apiMovies', { method: 'GET' }).then(res => res.json())
export const moviesByTitle = async () => await fetch('/moviesByTitle', { method: 'GET' }).then(res => res.json())
export const moviesByRating = async () => await fetch('/moviesByRating', { method: 'GET' }).then(res => res.json())
export const apiMovieNotes = async () => await fetch('/apiMovieNotes', { method: 'GET' }).then(res => res.json())

export const apiShows = async () => await fetch('/apiShows', { method: 'GET' }).then(res => res.json())
export const showsByTitle = async () => await fetch('/showsByTitle', { method: 'GET' }).then(res => res.json())
export const showsByRating = async () => await fetch('/showsByRating', { method: 'GET' }).then(res => res.json())
export const apiShowNotes = async () => await fetch('/apiShowNotes', { method: 'GET' }).then(res => res.json())