const express = require('express')
const app = express()
const PORT = 6500
const query = require('./src/SQLQueries') 

app.use(express.json())

app.get('/api', async (req, res) => {
    const data = await query.getData()
    res.send(data.recordset)
})

app.get('/apiNotes', async (req, res) => {
    const data = await query.getMovieNotes()
    res.send(data.recordset)
})

app.post('/apiNotesByTitle', async (req, res) => {
    const data = await query.getMovieNotesByTitle(req.body)
    res.send(data.recordset)
})

app.post('/addMov', async (req, res) => {
    await query.addMovie(req.body)
    const data = await query.getData()
    res.send(data.recordset)
})

app.post('/addMovNote', async (req, res) => {
    await query.addMovieNote(req.body)
    console.log('Note saved to database...');
    const data = await query.getData()
    res.send(data.recordset)
})

app.post('/deleteMovie', async (req, res) => {
    await query.deleteMovie(Object.values(req.body))
    console.log('Movie deleted...');
    const data = await query.getData()
    res.send(data.recordset)
})

app.post('/deleteMovieNote', async (req, res) => {
    await query.deleteMovieNote(Object.values(req.body))
    console.log('Movie note deleted...');
    const data = await query.getData()
    res.send(data.recordset)
})

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

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`)
})