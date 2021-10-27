import React, { useState } from 'react'
import { Form, Input } from 'semantic-ui-react'
import RatingExampleHeart from '../components/Rating'

function BookForm() {
    
    const [ form, setForm ] = useState(false)
    const [ count, setCount ] = useState(0)
    
    function bForm() {

        return (
            <Form>
                <Form.Group width='equal'>
                    <Form.Field
                        control={Input}
                        type='text'
                        label='Title'
                        placeholder='Title'
                    />
                    <Form.Field
                        control={Input}
                        type='text'
                        label='Author'
                        placeholder='Author'
                    />
                    <Form.Field
                        control={Input}
                        type='number'
                        min={1}
                        label='Pages'
                        placeholder='#'
                    />
                </Form.Group>
                <Form.Field
                    control={Input}
                    type='file'
                    label='Cover Photo'
                    accept="image/x-png,image/gif,image/jpeg/" id='cover-photo'
                    width={3}
                />
                <RatingExampleHeart />
                <br /><br />
                <button className="ui inverted violet button" onClick={() => setCount(last => last + 1)}>Submit</button>
                <button onClick={() => setForm(false)} className="ui inverted red button">Cancel</button>
            </Form>
        )
    }

    return (
        <div>
            <button className="ui olive fade animated button" onClick={() => setForm(!form)}>
                <div className="visible content">Add Book</div>
                <div className="hidden content">{count}</div>
            </button>
                { form && bForm() }
        </div>
    )
}

export default BookForm