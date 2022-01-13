import React from 'react';
import BackgroundImage from './images/book1.jpg'
import MainPage from './MainPage';
import DefaultPage from './components/DefaultPage'
import Loader from './components/Loader';
import { useAuth0 } from '@auth0/auth0-react'

function App() {

  document.body.style.backgroundImage = `url('${ BackgroundImage }')`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundSize = `cover`;
  document.body.style.backgroundAttachment = 'fixed'
  
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <div className='App'>
      { isLoading && <Loader color={ `rgb(222, 106, 185)` } loading={ isLoading } /> }
          { !isLoading &&
              <div>
                  { !isAuthenticated && <DefaultPage /> }
                  { isAuthenticated && <MainPage /> }
              </div>
          }
    </div>
  );
}

export default App;