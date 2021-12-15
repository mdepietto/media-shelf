import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import sort from '../back-end-calls/serverCalls'

const Sort = (props) => {
    
    const [ sortBy, setSortBy ] = useState('')

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const onSort = async (e) => {
        const { innerText } = e.target
        setSortBy(innerText)
        props.setLib([])
        if (props.name === 'books') {
            if (innerText === 'Title') {
                const newData = await sort.booksByTitle()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
            if (innerText === 'Rating') {
                const newData = await sort.booksByRating()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
        }
        if (props.name === 'movies') {
            if (innerText === 'Title') {
                const newData = await sort.moviesByTitle()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
            if (innerText === 'Rating') {
                const newData = await sort.moviesByRating()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
        }
        if (props.name === 'shows') {
            if (innerText === 'Title') {
                const newData = await sort.showsByTitle()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
            if (innerText === 'Rating') {
                const newData = await sort.showsByRating()
                newData.map(media => {
                    return props.setLib(prev => [ ...prev, media ])
                })
            }
        }
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>
            <Form style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Group width='equal'>
                    <Form.Select
                        options={ options }
                        name='sort'
                        placeholder='Sort by'
                        onChange={ onSort }
                    />
                </Form.Group>
            </Form>
            <h3 style={{ margin: '0 0 6px 0', fontFamily: "'Montagu Slab', serif" }}><i>{ sortBy }</i></h3>
        </div>
    )
}

export default Sort