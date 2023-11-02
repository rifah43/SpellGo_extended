import React, { useEffect } from 'react';
import './GameComponent.css';

function GameComponent() {
  useEffect(() => {
    
  }, []); 

  return (
    <div className="iframe-container "><iframe className='center-iframe'
    title="Phaser Game"
    src="/game/index.html"
    width="1300" 
    height="640" 
    frameBorder="0"
    scrolling="no"
  /></div> 
  );
}

export default GameComponent;