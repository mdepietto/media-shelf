import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

const EditWindow = (props) => {

    const { newNote, setNewNote } = props

    return (
        <Form>
            <TextArea
                style={{ height: '15rem' }}
                value={ newNote }
                placeholder='New note...'
                onChange={ (e) => setNewNote(e.target.value) }
            />
        </Form>
    )
}

export default EditWindow