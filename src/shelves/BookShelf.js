import React from 'react'

const BookShelf = (props) => {

    var toBeDeleted = 0

    const deleteBook = async () => {
        await fetch('/deleteBook', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ toBeDeleted })
        })
        .then(res => res.json())
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    return (
        <div>
            <div>
            <h1>Your Book Library</h1>
                { props.lib.map(book => {
                    return (
                        <div className='shelf' key={ book.id }>
                            <h3>{ props.lib.indexOf(book) + 1 }: { book.title }</h3>
                            <p>Author: { book.author }</p>
                            <p>Pages: { book.pages }</p>
                            <p>Rating: { book.rating }</p>
                            <button
                                className='ui red button tiny'
                                onClick={ () => {
                                    toBeDeleted = book.id
                                    confirmation(deleteBook)
                                    window.location.reload()
                                }}>
                            Delete</button>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default BookShelf