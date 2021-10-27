import React, { useState } from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'

function BookNote() {

    const [ note, setNote ] = useState(false)
    const [ count, setCount ] = useState(0)

    const options = [
        { key: 1, text: 'Note', value: 1 },
        { key: 2, text: 'Quote', value: 2 },
        { key: 3, text: 'Summary', value: 3 }
    ]

    function bNote() {
        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Field
                        control={Input}
                        type='number'
                        min={1}
                        label='Page Number'
                        placeholder='#'
                    />
                    <Form.Select
                        label='Type of Note'
                        options={options}
                        placeholder='Note'
                    />
                </Form.Group>
                <Form.Field
                    control={TextArea}
                    label='Your Note'
                    width={6}
                />
                <button onClick={() => setCount(count => count + 1)} className="ui inverted violet button">Submit</button>
                <button onClick={() => setNote(false)} className="ui inverted red button">Cancel</button>
            </Form>
        )
    }

    return (
        <div>
            <button className="ui olive fade animated button" onClick={() => setNote(!note)}>
                <div className="visible content">Book Note</div>
                <div className="hidden content">{count}</div>
            </button>
                { note && bNote() }
        </div>
    )
}

export default BookNote