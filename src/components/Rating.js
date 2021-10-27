import React from 'react'
import { Rating } from 'semantic-ui-react'

// const rate = 0

const RatingExampleHeart = () => (

  <Rating 
    icon='heart' 
    size='huge' 
    name='rating' 
    defaultRating={1} 
    maxRating={5} 
    clearable 
    // onRate={(e) => console.log(e.target.ariaPosInSet)}
  />
)

export default RatingExampleHeart
