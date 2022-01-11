const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const { con } = require('./db')
const db = mysql.createConnection(con)
const calls = require('./src/back-end-calls/SQLCalls')
// require('dotenv').config()

// ENV FILE IS THE DEVIL

const PORT = 6500

app.use(express.json())
app.use(bodyParser.json())

const noReturnCall = (call) => {
    db.query(call, (err) => { if (err) console.log(err) })
}

app.post('/apiBooks', (req, res) => {
    db.query(`${ calls.bookLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addBook', (req, res) => {
    const addBook = `INSERT INTO Books (title, author, chapters, pages, rating, name)
        VALUES ('${ req.body.title }', '${ req.body.author }', ${ req.body.chapters }, ${ req.body.pages }, ${ req.body.rating }, '${ req.body.name }')
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

app.post('/apiBookNotes', (req, res) => {
    db.query(`${ calls.bookNotesLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiBookNotesByTitle', (req, res) => {
    const bookTitle = `SELECT * FROM Book_Notes WHERE title = '${ req.body.title }' && name = '${ req.body.userName.name }'`
    db.query(bookTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addBookNote', (req, res) => {
    const addBookNote = `INSERT INTO Book_Notes (title, note_type, note_chapter, note_page, note_body, name)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_chapter }, ${ req.body.note_page }, '${ req.body.note_body }', '${ req.body.name }')
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

app.post('/apiMovies', (req, res) => {
    db.query(`${ calls.movieLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addMovie', (req, res) => {
    const addMovie = `INSERT INTO Movies (title, director, minutes, rating, name)
        VALUES ('${ req.body.title }', '${ req.body.director }', ${ req.body.minutes }, ${ req.body.rating }, '${ req.body.name }')
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

app.post('/apiMovieNotes', (req, res) => {
    db.query(`${ calls.movieNotesLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiMovieNotesByTitle', (req, res) => {
    const movieTitle = `SELECT * FROM Movie_Notes WHERE title = '${ req.body.title }' && name = '${ req.body.userName.name }'`
    db.query(movieTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addMovieNote', (req, res) => {
    const addMovieNote = `INSERT INTO Movie_Notes (title, note_type, note_minute, note_body, name)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_minute }, '${ req.body.note_body }', '${ req.body.name }')
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

app.post('/apiShows', (req, res) => {
    db.query(`${ calls.showLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addShow', (req, res) => {
    const addShow = `INSERT INTO Shows (title, seasons, rating, name)
        VALUES ('${ req.body.title }', ${ req.body.seasons }, ${ req.body.rating }, '${ req.body.name }')
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

app.post('/apiShowNotes', (req, res) => {
    db.query(`${ calls.showNotesLib } WHERE name = '${ req.body.userName.name }'`, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/apiShowNotesByTitle', (req, res) => {
    const showTitle = `SELECT * FROM Show_Notes WHERE title = '${ req.body.title }' && name = '${ req.body.userName.name }'`
    db.query(showTitle, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/addShowNote', (req, res) => {
    const addShowNote = `INSERT INTO Show_Notes (title, note_type, note_season, note_episode, note_body, name)
        VALUES
            ('${ req.body.title }', '${ req.body.note_type }', ${ req.body.note_season }, ${ req.body.note_episode }, '${ req.body.note_body }', '${ req.body.name }')
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