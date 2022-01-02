import React from 'react';
import HomePage from './components/HomePage';
import BackgroundImage from './images/book1.jpg'

function App() {

  document.body.style.backgroundImage = `url('${ BackgroundImage }')`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundSize = `cover`;
  document.body.style.backgroundAttachment = 'fixed'

  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;