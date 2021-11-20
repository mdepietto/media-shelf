import React, { useState } from 'react'
import { Form, Input, Rating, Button } from 'semantic-ui-react'

function ShowForm(props) {
    
    const [ data, setData ] = useState({ title: '', seasons: 0, rating: 0 })
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [ name ]: value
        }))
    }

    const getRating = (e) => {
        const { ariaPosInSet } = e.target
        setData(prev => ({
            ...prev,
            rating: ariaPosInSet
        }))
    }

    const sqlApostrophe = () => {
        var newTitle = data.title.replace(/'/g, "''")
        data.title = newTitle
    }

    var addShow = async () => {
        await fetch('/addShow', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                ...data
            })
        })
        .then(res => res.json())
    }

    return (
        <div>
            <Form className='mediaForm' inverted style={{ border: '2px solid rgb(242, 129, 7)' }}>
                <Form.Group width='equal' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    <Form.Field
                        control={ Input }
                        type='text'
                        label='Title'
                        name='title'
                        placeholder='Title'
                        onChange={ handleChange }
                    />
                    <br />
                    <Form.Field
                        control={ Input }
                        type='number'
                        min={ 1 }
                        label='Seasons'
                        name='seasons'
                        placeholder='#'
                        onChange={ handleChange }
                    />
                </Form.Group>
                <Rating 
                    icon='heart' 
                    size='massive' 
                    name='rating'
                    defaultRating={ 1 } 
                    maxRating={ 5 } 
                    clearable
                    onRate={ getRating }
                />
                <br /><br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        inverted
                        size='large'
                        color='violet'
                        style={{ marginBottom: '15px' }}
                        onClick={ async () => {
                            sqlApostrophe()
                            await addShow()
                            setData({ title: '', seasons: 0, rating: 0 })
                            props.setShowForm(false)
                            props.setShowLib([])
                            alert('Show added!')
                        }}
                    >Submit</Button>
                    <Button
                        inverted
                        size='large'
                        color='red'
                        onClick={ () => {
                            props.setShowForm(false)
                            alert('Show discarded')
                        }}
                    >Cancel</Button>
                </div>
            </Form>
        </div>
    )
}

export default ShowForm