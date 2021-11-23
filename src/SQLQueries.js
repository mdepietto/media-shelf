const db = require('../db')
const sql = require('mssql')

exports.getBooks = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Books')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addBook = async (book) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`INSERT INTO Books VALUES 
            ('${ book.title }', '${ book.author }', ${ book.pages }, ${ book.rating })
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteBook = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Books WHERE id = '${ id }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getBookNotes = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Book_Notes')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getBookNotesByTitle = async (title) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`SELECT * FROM Book_Notes WHERE title = '${ title }'`)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addBookNote = async (book) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            INSERT INTO Book_Notes VALUES (
                '${ book.title }', ${ book.note_page }, '${ book.note_type }', '${ book.note_body }', GETDATE()
            )
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteBookNote = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Book_Notes WHERE id = '${ id[0] }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getMovies = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Movies')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addMovie = async (movie) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`INSERT INTO Movies VALUES 
            ('${ movie.title }', '${ movie.director }', ${ movie.minutes }, ${ movie.rating })
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteMovie = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Movies WHERE id = '${ id }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getMovieNotes = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Movie_Notes')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getMovieNotesByTitle = async (title) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`SELECT * FROM Movie_Notes WHERE title = '${ title }'`)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addMovieNote = async (movie) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            INSERT INTO Movie_Notes VALUES (
                '${ movie.title }', ${ movie.note_minute }, '${ movie.note_type }', '${ movie.note_body }', GETDATE()
            )
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteMovieNote = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Movie_Notes WHERE id = '${ id[0] }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getShows = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Shows')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addShow = async (show) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`INSERT INTO Shows VALUES 
            ('${ show.title }', ${ show.seasons }, ${ show.rating })
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteShow = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Shows WHERE id = '${ id }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getShowNotes = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Show_Notes')
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.getShowNotesByTitle = async (title) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`SELECT * FROM Show_Notes WHERE title = '${ title }'`)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.addShowNote = async (show) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            INSERT INTO Show_Notes VALUES (
                '${ show.title }', ${ show.note_episode }, ${ show.note_season }, '${ show.note_type }', '${ show.note_body }', GETDATE()
            )
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}

exports.deleteShowNote = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Show_Notes WHERE id = '${ id[0] }'
        `)
        return query
    } catch (err) {
        console.log(err);
    }
}