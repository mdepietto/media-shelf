const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const { con } = require('./db')
const db = mysql.createConnection(con)
// require('dotenv').config()

// ENV FILE IS THE DEVIL

const PORT = 6500

app.use(express.json())
app.use(bodyParser.json())

app.post('/apiMedia', (req, res) => {
    var { api, userName } = req.body
    db.query(`SELECT * FROM ${ api } WHERE name = ?`, [ userName.name ], (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

app.post('/deleteMedia', (req, res) => {
    var { api, media } = req.body
    db.query(`DELETE FROM ${ api } WHERE id = ?`, [ media ], (err) => { if (err) console.log(err) })
    res.send(console.log('Content deleted...'))
})

app.post('/notesByTitle', (req, res) => {
    var { titlePath, title, userName } = req.body
    db.query(`SELECT * FROM ${ titlePath } WHERE title = ? && name = ?`,
        [ title, userName.name ],
        (err, rows) => {
            if (err) console.log(err)
            res.send(rows)
    })
})

app.put('/editNote', (req, res) => {
    const editNote = `UPDATE BookNotes SET note_body = ${ req.body.edit } WHERE id = ${ req.body.id }`
    // noReturnCall(editBook)
    console.log(req.body.col);
})

app.post('/addBook', (req, res) => {
    var { title, author, chapters, pages, rating, name } = req.body
    db.query(`INSERT INTO Books (title, author, chapters, pages, rating, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, author, chapters, pages, rating, name ],
        (err) => { if (err) console.log(err) }
    )
    res.send(console.log('Book added...'))
})

app.post('/addMovie', (req, res) => {
    var { title, director, minutes, rating, name } = req.body
    db.query(`INSERT INTO Movies (title, director, minutes, rating, name) VALUES (?, ?, ?, ?, ?)`,
        [ title, director, minutes, rating, name ],
        (err) => { if (err) console.log(err) }
    )
    res.send(console.log('Movie added...'))
})

app.post('/addShow', (req, res) => {
    var { title, seasons, rating, name } = req.body
    db.query(`INSERT INTO Shows (title, seasons, rating, name) VALUES (?, ?, ?, ?)`,
        [ title, seasons, rating, name ],
        (err) => { if (err) console.log(err) }
    )
    res.send(console.log('Show added...'))
})

app.post('/addBookNote', (req, res) => {
    var { title, note_type, note_chapter, note_page, note_body, name } = req.body
    db.query(`INSERT INTO Book_Notes (title, note_type, note_chapter, note_page, note_body, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, note_type, note_chapter, note_page, note_body, name ],
        (err) => { if (err) console.log(err) })
    res.send(console.log('Note saved to database...'))
})

app.post('/addMovieNote', (req, res) => {
    var { title, note_type, note_minute, note_body, name } = req.body
    db.query(`INSERT INTO Movie_Notes (title, note_type, note_minute, note_body, name) VALUES (?, ?, ?, ?, ?)`,
        [ title, note_type, note_minute, note_body, name ],
        (err) => { if (err) console.log(err) })
    res.send(console.log('Note saved to database...'))
})

app.post('/addShowNote', (req, res) => {
    var { title, note_type, note_season, note_episode, note_body, name } = req.body
    db.query(`INSERT INTO Show_Notes (title, note_type, note_season, note_episode, note_body, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, note_type, note_season, note_episode, note_body, name ],
        (err) => { if (err) console.log(err) })
    res.send(console.log('Note saved to database...'))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
})