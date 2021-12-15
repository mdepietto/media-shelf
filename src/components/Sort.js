import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import sort from '../back-end-calls/serverCalls'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

const Sort = (props) => {

    const [ loading, setLoading ] = useState(false)

    const override = css`
        position: fixed;
        top: 50%;
        left: 63%;
    `

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const getLib = async (path) => {
        setLoading(true)
        const newData = await path
        newData.map(media => {
            return props.setLib(prev => [ ...prev, media ])
        })
        setLoading(false)
    }

    const onSort = async (e) => {
        const { innerText } = e.target
        props.setLib([])
        if (props.name === 'books') {
            if (!innerText) getLib(sort.apiBooks())
            if (innerText === 'Title') getLib(sort.booksByTitle())
            if (innerText === 'Rating') getLib(sort.booksByRating())
        }
        if (props.name === 'movies') {
            if (!innerText) getLib(sort.apiMovies())
            if (innerText === 'Title') getLib(sort.moviesByTitle())
            if (innerText === 'Rating') getLib(sort.moviesByRating())
        }
        if (props.name === 'shows') {
            if (!innerText) getLib(sort.apiShows())
            if (innerText === 'Title') getLib(sort.showsByTitle())
            if (innerText === 'Rating') getLib(sort.showsByRating())
        }
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                { loading && <PropagateLoader color={ `rgb(${ props.border })` } css={ override } loading={ loading } size={ 30 } /> }
                <h3 style={{ margin: '0 0 15px 0', fontFamily: "'Montagu Slab', serif" }}>Sort by:</h3>
                <Form style={{ display: 'flex', flexDirection: 'row' }}>
                    <Form.Group width='equal'>
                        <Form.Select
                            clearable
                            options={ options }
                            name='sort'
                            placeholder='Sort by'
                            onChange={ onSort }
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Sort