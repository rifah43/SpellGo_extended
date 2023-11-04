import React, { useEffect } from 'react';
import './GameComponent.css';

function GameComponent() {
  useEffect(() => {
    
  }, []); 

  return (
    <div className="iframe-container "><iframe className='center-iframe'
    title="Phaser Game"
    src="/game/index.html"
    width="80%" 
    height="90%" 
  /></div> 
  );
}

export default GameComponent;