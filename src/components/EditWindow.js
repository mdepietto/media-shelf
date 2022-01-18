import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

const EditWindow = (props) => {

    const { newNote, setNewNote } = props

    return (
        <Form>
            <TextArea
                value={ newNote }
                onChange={ (e) => setNewNote(e.target.value) }
            />
        </Form>
    )
}

export default EditWindow