import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const NavBottom = () => {

    const [ visible, setVisible ] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled < 600){
          setVisible(true)
        } 
        else if (scrolled >= 600){
          setVisible(false)
        }
    };

    const toBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className='NavTB'>
            <Button
                animated='vertical'
                inverted
                circular
                size='huge'
                color='blue'
                onClick={ toBottom }
                style={{ display: visible ? 'flex' : 'none' }}
            >
                <Button.Content visible>Bottom</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow down' />
                </Button.Content>
            </Button>
        </div>
    )
}

export default NavBottom