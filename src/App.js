import React from 'react';
import MainPage from './MainPage'
import BackgroundImage from './images/book1.jpg'
import Auth from './components/Auth';

function App() {

  document.body.style.backgroundImage = `url('${ BackgroundImage }')`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundSize = `cover`;
  document.body.style.backgroundAttachment = 'fixed'

  return (
    <div className='App'>
      <Auth />
      <MainPage />
    </div>
  );
}

export default App;