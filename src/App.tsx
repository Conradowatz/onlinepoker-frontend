import React from 'react';
import Game from './components/Game';
import './styles/App.css';
import "./styles/InputObjects.css";

const App: React.FC = () => {
  return (
    <div id={"app"}>
      <div id={"title"}>Texas Hold'em Poker</div>
      <Game/>
    </div>
  );
};

export default App;
