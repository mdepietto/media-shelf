var api = async () => await fetch('/api', { method: 'GET' }).then(res => res.json())

var apiNotes = async () => await fetch('/apiNotes', { method: 'GET' }).then(res => res.json())

module.exports = { api, apiNotes }