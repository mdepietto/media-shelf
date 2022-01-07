import React from 'react'
import { Form } from 'semantic-ui-react'
import Loader from './Loader'

const Sort = (props) => {

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const newLib = (newData) => newData.map(media => props.setLib(prev => [ ...prev, media ]))

    const onSort = async (e) => {
        const { innerText } = e.target
        const byType = () => {
            if (innerText === 'Title') {
                const newData = props.lib.sort((a, b) => (a.title > b.title) ? 1 : -1)
                newLib(newData)
            }
            if (innerText === 'Rating') {
                const newData = props.lib.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
                newLib(newData)
            }
        }
        props.setLib([])
        if (props.name === 'books') {
            if (!innerText) props.getMedia('/apiBooks')
            byType()
        }
        if (props.name === 'movies') {
            if (!innerText) props.getMedia('/apiMovies')
            byType()
        }
        if (props.name === 'shows') {
            if (!innerText) props.getMedia('/apiShows')
            byType()
        }
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ props.border })` }}>

                { props.loading && <Loader color={ `rgb(${ props.border })` } loading={ props.loading } /> }

                <h3>Sort by:</h3>
                <Form>
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
    )
}

export default Sort