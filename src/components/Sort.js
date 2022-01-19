import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

const Sort = (props) => {

    const { border, library, setLibrary, button, shelfForm, setShelfForm, shelf, setShelf } = props

    const options = [
        { key: 0, text: 'Title', value: 0 },
        { key: 1, text: 'Rating', value: 1 }
    ]

    const newLib = (newData) => {
        setLibrary([])
        newData.map(media => setLibrary(prev => [ ...prev, media ]))
    }

    const onSort = async (e) => {
        const { innerText } = e.target
            if (!innerText) newLib(library.sort((a, b) => (a.id > b.id) ? 1 : -1))
            if (innerText === 'Title') newLib(library.sort((a, b) => (a.title > b.title) ? 1 : -1))
            if (innerText === 'Rating') newLib(library.sort((a, b) => (a.rating < b.rating) ? 1 : -1))
    }
    
    return (
        <div className='selectDrop' style={{ border: `2px solid rgb(${ border })` }}>
                <Form style={{ paddingRight: '20px' }}>
                    <Form.Select
                        clearable
                        options={ options }
                        name='sort'
                        placeholder='Sort...'
                        onChange={ onSort }
                    />
                </Form>
                <Button
                    icon
                    inverted
                    circular
                    size='huge'
                    color={ button }
                    onClick={ () => {
                        setShelfForm(!shelfForm)
                        setShelf(!shelf)
                    }}
                >
                    <Icon name='plus' />
                </Button>
        </div>
    )
}

export default Sort