exports.api = async () => await fetch('/api', { method: 'GET' }).then(res => res.json())

exports.apiNotes = async () => await fetch('/apiNotes', { method: 'GET' }).then(res => res.json())