import React from 'react'
import { Button } from 'semantic-ui-react'

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
            { props.bookLib.map(book => {
                return (
                    <div className='shelf' key={ book.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                        <h3 className='shelfTitles'>{ props.bookLib.indexOf(book) + 1 }:   { book.title }</h3>
                        <p style={{ margin: '.5rem' }}><i>Author:</i> { book.author }</p>
                        <p style={{ margin: '.5rem' }}><i>Pages:</i> { book.pages }</p>
                        <p style={{ margin: '.5rem' }}><i>Rating:</i> { book.rating }</p>
                        <br />
                        <Button
                            inverted color='red'
                            size='large'
                            onClick={ () => {
                                toBeDeleted = book.id
                                confirmation(deleteBook)
                                props.setBookShelf(false)
                                props.setBookLib([])
                            }}>
                        Delete</Button>
                    </div>
                )
            })}
        </div>
    )
}

export default BookShelf