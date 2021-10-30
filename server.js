const express = require('express')
const app = express()
const PORT = 6500
const db = require('./db')
const sql = require('mssql')

app.use(express.json())

const getData = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Movies')
        return query
    } catch (err) {
        console.log(err);
    }
}

const getMovieNotes = async () => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query('SELECT * FROM Movie_Notes')
        return query
    } catch (err) {
        console.log(err);
    }
}

const getMovieNotesByTitle = async (title) => {
    try {
        const connectDB = await sql.connect(db)
        const query = connectDB.request().query(`SELECT * FROM Movie_Notes WHERE title = '${ title.title }'`)
        return query
    } catch (err) {
        console.log(err);
    }
}

const addMovie = async (movie) => {
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

const addMovieNote = async (movie) => {
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

app.get('/api', async (req, res) => {
    const data = await getData()
    res.send(data.recordset)
})

app.get('/apiNotes', async (req, res) => {
    const data = await getMovieNotes()
    res.send(data.recordset)
})

app.post('/apiNotesByTitle', async (req, res) => {
    const data = await getMovieNotesByTitle(req.body)
    res.send(data.recordset)
})

app.post('/addMov', async (req, res) => {
    await addMovie(req.body)
    const data = await getData()
    res.send(data.recordset)
})

app.post('/addMovNote', async (req, res) => {
    await addMovieNote(req.body)
    console.log('Note saved to database...');
    const data = await getData()
    res.send(data.recordset)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})