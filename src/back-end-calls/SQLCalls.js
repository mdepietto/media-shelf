exports.bookLib = `SELECT * FROM Books`
exports.booksByTitle = `SELECT * FROM Books ORDER BY title`
exports.booksByRating = `SELECT * FROM Books ORDER BY rating DESC`
exports.bookNotesLib = `SELECT * FROM Book_Notes`

exports.movieLib = `SELECT * FROM Movies`
exports.moviesByTitle = `SELECT * FROM Movies ORDER BY title`
exports.moviesByRating = `SELECT * FROM Movies ORDER BY rating DESC`
exports.movieNotesLib = `SELECT * FROM Movie_Notes`

exports.showLib = `SELECT * FROM Shows`
exports.showsByTitle = `SELECT * FROM Shows ORDER BY title`
exports.showsByRating = `SELECT * FROM Shows ORDER BY rating DESC`
exports.showNotesLib = `SELECT * FROM Show_Notes`