const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { auth } = require('express-openid-connect')
require('dotenv').config()

const authSetup = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE,
    clientID: process.env.CLIENT,
    issuerBaseURL: process.env.ISSUER
}

const PORT = process.env.PORT
const { con } = require('./db')
const mysql = require('mysql')

app.use(express.json())
app.use(bodyParser.json())
app.use(auth(authSetup))

const db = mysql.createConnection(con)
const calls = require('./src/back-end-calls/SQLCalls')

const noReturnCall = (call) => {
    db.query(call, (err) => { if (err) console.log(err) })
}

app.get('/apiBooks', (req, res) => {
    db.query(calls.bookLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/booksByTitle', (req, res) => {
    db.query(calls.booksByTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/booksByRating', (req, res) => {
    db.query(calls.booksByRating, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addBook', (req, res) => {
    const addBook = `INSERT INTO Books (title, author, chapters, pages, rating)
        VALUES ('${ req.body.title }', '${ req.body.author }', ${ req.body.chapters }, ${ req.body.pages }, ${ req.body.rating })
    `
    noReturnCall(addBook)
    console.log('Book added...');
    db.query(calls.bookLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteBook', (req, res) => {
    const deleteBook = `DELETE FROM Books WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteBook)
    console.log('Book deleted...')
    db.query(calls.bookLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/apiBookNotes', (req, res) => {
    db.query(calls.bookNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiBookNotesByTitle', (req, res) => {
    const bookTitle = `SELECT * FROM Book_Notes WHERE title = '${ req.body.title }'`
    db.query(bookTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/booksByType', (req, res) => {
    const byType = `SELECT * FROM Book_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_type`
    db.query(byType, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/booksByChapter', (req, res) => {
    const byChapter = `SELECT * FROM Book_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_chapter`
    db.query(byChapter, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addBookNote', (req, res) => {
    const addBookNote = `INSERT INTO Book_Notes (title, note_type, note_chapter, note_page, note_body)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_chapter }, ${ req.body.note_page }, '${ req.body.note_body }')
    `
    noReturnCall(addBookNote)
    console.log('Note saved to database...');
    db.query(calls.bookNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteBookNote', (req, res) => {
    const deleteBookNote = `DELETE FROM Book_Notes WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteBookNote)
    console.log('Book note deleted...');
    db.query(calls.bookNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/apiMovies', (req, res) => {
    db.query(calls.movieLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/moviesByTitle', (req, res) => {
    db.query(calls.moviesByTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/moviesByRating', (req, res) => {
    db.query(calls.moviesByRating, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addMovie', (req, res) => {
    const addMovie = `INSERT INTO Movies (title, director, minutes, rating)
        VALUES ('${ req.body.title }', '${ req.body.director }', ${ req.body.minutes }, ${ req.body.rating })
    `
    noReturnCall(addMovie)
    console.log('Movie added...');
    db.query(calls.movieLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteMovie', (req, res) => {
    const deleteMovie = `DELETE FROM Movies WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteMovie)
    console.log('Movie deleted...')
    db.query(calls.movieLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/apiMovieNotes', (req, res) => {
    db.query(calls.movieNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/moviesByType', (req, res) => {
    const byType = `SELECT * FROM Movie_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_type`
    db.query(byType, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/moviesByMinute', (req, res) => {
    const byMinute = `SELECT * FROM Movie_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_minute`
    db.query(byMinute, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiMovieNotesByTitle', (req, res) => {
    const movieTitle = `SELECT * FROM Movie_Notes WHERE title = '${ req.body.title }'`
    db.query(movieTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addMovieNote', (req, res) => {
    const addMovieNote = `INSERT INTO Movie_Notes (title, note_type, note_minute, note_body)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_minute }, '${ req.body.note_body }')
    `
    noReturnCall(addMovieNote)
    console.log('Note saved to database...');
    db.query(calls.movieNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteMovieNote', (req, res) => {
    const deleteMovieNote = `DELETE FROM Movie_Notes WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteMovieNote)
    console.log('Movie note deleted...');
    db.query(calls.movieNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/apiShows', (req, res) => {
    db.query(calls.showLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/showsByTitle', (req, res) => {
    db.query(calls.showsByTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/showsByRating', (req, res) => {
    db.query(calls.showsByRating, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addShow', (req, res) => {
    const addShow = `INSERT INTO Shows (title, seasons, rating)
        VALUES ('${ req.body.title }', ${ req.body.seasons }, ${ req.body.rating })
    `
    noReturnCall(addShow)
    console.log('Show added...');
    db.query(calls.showLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteShow', (req, res) => {
    const deleteShow = `DELETE FROM Shows WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteShow)
    console.log('Show deleted...')
    db.query(calls.showLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.get('/apiShowNotes', (req, res) => {
    db.query(calls.showNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/showsByType', (req, res) => {
    const byType = `SELECT * FROM Show_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_type`
    db.query(byType, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/showsBySeason', (req, res) => {
    const bySeason = `SELECT * FROM Show_Notes WHERE title = '${ req.body.notesFor }' ORDER BY note_season`
    db.query(bySeason, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiShowNotesByTitle', (req, res) => {
    const showTitle = `SELECT * FROM Show_Notes WHERE title = '${ req.body.title }'`
    db.query(showTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addShowNote', (req, res) => {
    const addShowNote = `INSERT INTO Show_Notes (title, note_type, note_season, note_episode, note_body)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_season }, ${ req.body.note_episode }, '${ req.body.note_body }')
    `
    noReturnCall(addShowNote)
    console.log('Note saved to database...');
    db.query(calls.showNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteShowNote', (req, res) => {
    const deleteShowNote = `DELETE FROM Show_Notes WHERE id = '${ Object.values(req.body) }'`
    noReturnCall(deleteShowNote)
    console.log('Show note deleted...');
    db.query(calls.showNotesLib, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
})