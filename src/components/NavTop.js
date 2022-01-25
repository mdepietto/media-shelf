import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const NavTop = () => {

    const [ visible, setVisible ] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 600){
          setVisible(true)
        } 
        else if (scrolled <= 600){
          setVisible(false)
        }
    };

    const toTop = () => {
        window.scrollTo({
            top: 0,
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
                onClick={ toTop }
                style={{ display: visible ? 'flex' : 'none' }}
            >
                <Button.Content visible>Top</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow up' />
                </Button.Content>
            </Button>
        </div>
    )
}

export default NavTop