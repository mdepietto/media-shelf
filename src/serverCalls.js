exports.apiBooks = async () => await fetch('/apiBooks', { method: 'GET' }).then(res => res.json())

exports.apiBookNotes = async () => await fetch('/apiBookNotes', { method: 'GET' }).then(res => res.json())

exports.apiMovies = async () => await fetch('/apiMovies', { method: 'GET' }).then(res => res.json())

exports.apiMovieNotes = async () => await fetch('/apiMovieNotes', { method: 'GET' }).then(res => res.json())

exports.apiShows = async () => await fetch('/apiShows', { method: 'GET' }).then(res => res.json())

exports.apiShowNotes = async () => await fetch('/apiShowNotes', { method: 'GET' }).then(res => res.json())