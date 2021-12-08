import React from 'react';
import MainPage from './MainPage'
import BackgroundImage from './images/book1.jpg'
import NavTop from './components/NavTop'

function App() {

  document.body.style.backgroundImage = `url('${ BackgroundImage }')`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundSize = `cover`;
  document.body.style.backgroundAttachment = 'fixed'

  return (
    <div className='App'>
      <NavTop />
      <MainPage />
    </div>
  );
}

export default App;