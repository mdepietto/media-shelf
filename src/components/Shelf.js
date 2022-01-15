import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Shelf = (props) => {

    const { name, library, setLibrary } = props

    const [ loading, setLoading ] = useState(false)

    const userName = useAuth0().user

    useEffect(() => {
        const getData = async (api) => {
            setLoading(true)
            setLibrary([])
            const newData = await fetch('/apiMedia', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ api, userName })
            })
            .then(res => res.json())
            newData.map(media => {
                return setLibrary(prev => [ ...prev, media ])
            })
            setLoading(false)
        }
        if (name === 'books') getData('Books')
        if (name === 'movies') getData('Movies')
        if (name === 'shows') getData('Shows')
    }, [ userName, name, setLibrary ])

    const deleteMedia = async (api, media) => {
        await fetch('/deleteMedia', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ api, media })
        })
    }

    const confirmation = (func) => {
        if (window.confirm('Are you sure?')) {
            return func()
        }
    }

    const DeleteButton = (props) => {
        return (
            <Link to='/'>
                <Button
                    inverted
                    color='red'
                    size='large'
                    onClick={ () => confirmation(() => deleteMedia(props.api, props.media)) }
                >
                    Delete
                </Button>
            </Link>
        )
    }

    if (name === 'books') {
        return (
            <div>
                { loading && <Loader color={ 'rgb(202, 237, 114)' } /> }
                { library.map(book => {
                    return (
                        <div className='shelf' key={ book.id } style={{ border: '2px solid rgb(202, 237, 114)' }}>
                            <h3 className='shelfTitles'>{ library.indexOf(book) + 1 }:   { book.title }</h3>
                            <p style={{ margin: '.5rem' }}><i>Author:</i> { book.author }</p>
                            <p style={{ margin: '.5rem' }}><i>Chapters:</i> { book.chapters }</p>
                            <p style={{ margin: '.5rem' }}><i>Pages:</i> { book.pages }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { book.rating }</p>
                            <br />
                            <DeleteButton api='Books' media={ book.id } />
                        </div>
                    )
                })}
            </div>
        )
    }

    if (name === 'movies') {
        return (
            <div>
                { loading && <Loader color={ 'rgb(235, 229, 52)' } /> }
                { library.map(movie => {
                    return (
                        <div className='shelf' key={ movie.id } style={{ border: '2px solid rgb(235, 229, 52)' }}>
                            <h1 className='shelfTitles'>{ library.indexOf(movie) + 1 }:   { movie.title }</h1>
                            <p style={{ margin: '.5rem' }}><i>Director:</i> { movie.director }</p>
                            <p style={{ margin: '.5rem' }}><i>Minutes:</i> { movie.minutes }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { movie.rating }</p>
                            <br />
                            <DeleteButton api='Movies' media={ movie.id } />
                        </div>
                    )
                })}
            </div>
        )
    }

    if (name === 'shows') {
        return (
            <div>
                { loading && <Loader color={ 'rgb(242, 129, 7)' } /> }
                { library.map(show => {
                    return (
                        <div className='shelf' key={ show.id } style={{ border: '2px solid rgb(242, 129, 7)' }}>
                            <h3 className='shelfTitles'>{ library.indexOf(show) + 1 }:   { show.title }</h3>
                            <p style={{ margin: '.5rem' }}><i>Seasons:</i> { show.seasons }</p>
                            <p style={{ margin: '.5rem' }}><i>Rating:</i> { show.rating }</p>
                            <br />
                            <DeleteButton api='Shows' media={ show.id } />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Shelf