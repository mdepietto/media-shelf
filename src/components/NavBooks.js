import React, { useState } from 'react'
import { Button, Icon, Form } from 'semantic-ui-react'
import { apiBooks } from '../serverCalls/movieCalls'
import BookShelf from '../shelves/BookShelf'
import BookForm from '../forms/BookForm'

const NavBooks = () => {

    const [ shelf, setShelf ] = useState(false)
    const [ count, setCount ] = useState(0)
    const [ lib, setLib ] = useState([])

    const [ form, setForm ] = useState(false)

    const bookCount = async () => {
        const newData = await apiBooks()
        setCount(newData.length)
    }
    bookCount()

    const getBooks = async () => {
        const newData = await apiBooks()
        if (!lib[0]) {
            newData.map(m => {
                return setLib(prev => [ ...prev, m ])
            })
        }
    }

    return (
        <div>
            <div className='nav'>
                <button
                    className="ui olive fade animated button"
                    onClick={ () => {
                        setShelf(!shelf)
                        getBooks()
                    }}>
                    <div className='visible content'>Books</div>
                    <div className='hidden content'>{ count }</div>
                </button>
                <Button
                    icon
                    color='olive'
                    onClick={ () => {
                        setForm(!form)
                    }}>
                    <Icon name='plus' />
                </Button>
            </div>
            <div className='body'>
                { shelf && <BookShelf lib={ lib } /> }
                { form && <BookForm /> }
            </div>
        </div>
    )
}

export default NavBooks