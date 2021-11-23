const express = require('express')
const app = express()
const PORT = 6500
const query = require('./src/SQLQueries') 

app.use(express.json())

app.get('/apiBooks', async (req, res) => {
    const data = await query.getBooks()
    res.send(data.recordset)
})

app.post('/addBook', async (req, res) => {
    await query.addBook(req.body)
    console.log('Book added...');
    const data = await query.getBooks()
    res.send(data.recordset)
})

app.post('/deleteBook', async (req, res) => {
    await query.deleteBook(Object.values(req.body))
    console.log('Book deleted...');
    const data = await query.getBooks()
    res.send(data.recordset)
})

app.get('/apiBookNotes', async (req, res) => {
    const data = await query.getBookNotes()
    res.send(data.recordset)
})

app.post('/apiBookNotesByTitle', async (req, res) => {
    const data = await query.getBookNotesByTitle(req.body.title)
    res.send(data.recordset)
})

app.post('/addBookNote', async (req, res) => {
    await query.addBookNote(req.body)
    console.log('Note saved to database...');
    const data = await query.getBooks()
    res.send(data.recordset)
})

app.post('/deleteBookNote', async (req, res) => {
    await query.deleteBookNote(Object.values(req.body))
    console.log('Book note deleted...');
    const data = await query.getBooks()
    res.send(data.recordset)
})

app.get('/apiMovies', async (req, res) => {
    const data = await query.getMovies()
    res.send(data.recordset)
})

app.post('/addMovie', async (req, res) => {
    await query.addMovie(req.body)
    const data = await query.getMovies()
    res.send(data.recordset)
})

app.post('/deleteMovie', async (req, res) => {
    await query.deleteMovie(Object.values(req.body))
    console.log('Movie deleted...');
    const data = await query.getMovies()
    res.send(data.recordset)
})

app.get('/apiMovieNotes', async (req, res) => {
    const data = await query.getMovieNotes()
    res.send(data.recordset)
})

app.post('/apiMovieNotesByTitle', async (req, res) => {
    const data = await query.getMovieNotesByTitle(req.body.title)
    res.send(data.recordset)
})

app.post('/addMovieNote', async (req, res) => {
    await query.addMovieNote(req.body)
    console.log('Note saved to database...');
    const data = await query.getMovies()
    res.send(data.recordset)
})

app.post('/deleteMovieNote', async (req, res) => {
    await query.deleteMovieNote(Object.values(req.body))
    console.log('Movie note deleted...');
    const data = await query.getMovies()
    res.send(data.recordset)
})

app.get('/apiShows', async (req, res) => {
    const data = await query.getShows()
    res.send(data.recordset)
})

app.post('/addShow', async (req, res) => {
    await query.addShow(req.body)
    console.log('Show added...');
    const data = await query.getShows()
    res.send(data.recordset)
})

app.post('/deleteShow', async (req, res) => {
    await query.deleteShow(Object.values(req.body))
    console.log('Show deleted...');
    const data = await query.getShows()
    res.send(data.recordset)
})

app.get('/apiShowNotes', async (req, res) => {
    const data = await query.getShowNotes()
    res.send(data.recordset)
})

app.post('/apiShowNotesByTitle', async (req, res) => {
    const data = await query.getShowNotesByTitle(req.body.title)
    res.send(data.recordset)
})

app.post('/addShowNote', async (req, res) => {
    await query.addShowNote(req.body)
    console.log('Note saved to database...');
    const data = await query.getShows()
    res.send(data.recordset)
})

app.post('/deleteShowNote', async (req, res) => {
    await query.deleteShowNote(Object.values(req.body))
    console.log('Show note deleted...');
    const data = await query.getShows()
    res.send(data.recordset)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
})