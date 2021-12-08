const { db } = require('../../db')
const sql = require('mssql')

dbCall = async (data, call) => {
    try {
        const connectDB = await sql.connect(db)
        const query = await connectDB.request().query(call)
        return query
    } catch (err) {
        console.log(err);
    }
}

// book calls
// exports.getBooks = () => dbCall(null, `SELECT * FROM Books`)

exports.addBook = (book) => dbCall(book, `INSERT INTO Books VALUES
    ('${ book.title }', '${ book.author }', ${ book.pages }, ${ book.rating }, ${ book.chapters })
`)

exports.deleteBook = (id) => dbCall(id, `DELETE FROM Books WHERE id = '${ id }'`)

exports.getBookNotes = () => dbCall(null, `SELECT * FROM Book_Notes`)

exports.getBookNotesByTitle = async (title) => dbCall(title, `SELECT * FROM Book_Notes WHERE title = '${ title }'`)

exports.addBookNote = async (book) => dbCall(book, `INSERT INTO Book_Notes VALUES
    ('${ book.title }', ${ book.note_page }, '${ book.note_type }', '${ book.note_body }', GETDATE(), ${ book.note_chapter })
`)

exports.deleteBookNote = async (id) => dbCall(id, `DELETE FROM Book_Notes WHERE id = '${ id[0] }'`)


// movie calls
    exports.getMovies = () => dbCall(null, `SELECT * FROM Movies`)

    exports.addMovie = async (movie) => dbCall(movie, `INSERT INTO Movies VALUES 
        ('${ movie.title }', '${ movie.director }', ${ movie.minutes }, ${ movie.rating })
    `)

    exports.deleteMovie = async (id) => dbCall(id, `DELETE FROM Movies WHERE id = '${ id }'`)

    exports.getMovieNotes = async () => dbCall(null, `SELECT * FROM Movie_Notes`)

    exports.getMovieNotesByTitle = async (title) => dbCall(title, `SELECT * FROM Movie_Notes WHERE title = '${ title }'`)

    exports.addMovieNote = async (movie) => dbCall(movie, `INSERT INTO Movie_Notes VALUES
        ('${ movie.title }', ${ movie.note_minute }, '${ movie.note_type }', '${ movie.note_body }', GETDATE())
    `)

    exports.deleteMovieNote = async (id) => dbCall(id, `DELETE FROM Movie_Notes WHERE id = '${ id[0] }'`)


// show calls
exports.getShows = async () => dbCall(null, `SELECT * FROM Shows`)

exports.addShow = async (show) => dbCall(show, `INSERT INTO Shows VALUES
    ('${ show.title }', ${ show.seasons }, ${ show.rating })
`)

exports.deleteShow = async (id) => dbCall(id, `DELETE FROM Shows WHERE id = '${ id }'`)

exports.getShowNotes = async () => dbCall(null, `SELECT * FROM Show_Notes`)

exports.getShowNotesByTitle = async (title) => dbCall(title, `SELECT * FROM Show_Notes WHERE title = '${ title }'`)

exports.addShowNote = async (show) => dbCall(show, `INSERT INTO Show_Notes VALUES
    ('${ show.title }', ${ show.note_episode }, ${ show.note_season }, '${ show.note_type }', '${ show.note_body }', GETDATE())
`)

exports.deleteShowNote = async (id) => dbCall(id, `DELETE FROM Show_Notes WHERE id = '${ id[0] }'`)