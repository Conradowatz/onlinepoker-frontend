import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <div id={'title'}>Texas Hold'em Poker</div>
      <Game/>
    </div>
  );
};

export default App;
