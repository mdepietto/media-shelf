import React, { useState } from 'react'
import RatingExampleHeart from '../components/Rating'
import { Form, Input } from 'semantic-ui-react'


function ShowForm() {

    const [ form, setForm ] = useState(false)
    const [ count, setCount ] = useState(0)

    function sForm() {
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
                        label='Director'
                        placeholder='Director'
                    />
                    <Form.Field
                        control={Input}
                        type='number'
                        min={1}
                        label='Seasons'
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
                <div className="visible content">Add Show</div>
                <div className="hidden content">{count}</div>
            </button>
                { form && sForm() }
        </div>
    )
}

export default ShowForm