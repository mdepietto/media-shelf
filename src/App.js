import React from 'react';
import HomePage from './HomePage';
import DefaultPage from './components/DefaultPage'
import Loader from './components/Loader';
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <div className='App'>
      { isLoading && <Loader color={ `rgb(222, 106, 185)` } loading={ isLoading } /> }
      { !isLoading && <div>{ isAuthenticated ? <HomePage /> : <DefaultPage /> }</div> }
    </div>
  );
}

export default App;