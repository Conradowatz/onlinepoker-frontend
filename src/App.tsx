import React from 'react';
import Playground from './components/Playground';

import './styles/App.css';
import './styles/Playground.css';
import './styles/MyHand.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Playground/>
    </div>
  );
}

export default App;
