exports.api = async () => await fetch('/api', { method: 'GET' }).then(res => res.json())

exports.apiNotes = async () => await fetch('/apiNotes', { method: 'GET' }).then(res => res.json())

exports.apiBooks = async () => await fetch('/apiBooks', { method: 'GET' }).then(res => res.json())

exports.apiBookNotes = async () => await fetch('/apiBookNotes', { method: 'GET' }).then(res => res.json())

exports.apiShows = async () => await fetch('/apiShows', { method: 'GET' }).then(res => res.json())

exports.apiShowNotes = async () => await fetch('/apiShowNotes', { method: 'GET' }).then(res => res.json())