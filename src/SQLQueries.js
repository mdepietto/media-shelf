const db = require('../db')
const sql = require('mssql')

exports.getData = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Movies')
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
        const query = connectDB.request().query(`SELECT * FROM Movie_Notes WHERE title = '${ title.innerText }'`)
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

exports.deleteMovie = async (id) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`
            DELETE FROM Movies WHERE id = '${ id[0] }'
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