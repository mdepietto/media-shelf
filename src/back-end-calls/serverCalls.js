exports.apiBooks = async () => await fetch('/apiBooks', { method: 'GET' }).then(res => res.json())
exports.apiBookNotes = async () => await fetch('/apiBookNotes', { method: 'GET' }).then(res => res.json())
exports.booksByTitle = async () => await fetch('/booksByTitle', { method: 'GET' }).then(res => res.json())
exports.booksByRating = async () => await fetch('/booksByRating', { method: 'GET' }).then(res => res.json())

exports.apiMovies = async () => await fetch('/apiMovies', { method: 'GET' }).then(res => res.json())
exports.apiMovieNotes = async () => await fetch('/apiMovieNotes', { method: 'GET' }).then(res => res.json())
exports.moviesByTitle = async () => await fetch('/moviesByTitle', { method: 'GET' }).then(res => res.json())
exports.moviesByRating = async () => await fetch('/moviesByRating', { method: 'GET' }).then(res => res.json())

exports.apiShows = async () => await fetch('/apiShows', { method: 'GET' }).then(res => res.json())
exports.apiShowNotes = async () => await fetch('/apiShowNotes', { method: 'GET' }).then(res => res.json())
exports.showsByTitle = async () => await fetch('/showsByTitle', { method: 'GET' }).then(res => res.json())
exports.showsByRating = async () => await fetch('/showsByRating', { method: 'GET' }).then(res => res.json())