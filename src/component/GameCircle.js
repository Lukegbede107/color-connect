import React from 'react';
import '../Game.css';





const GameCircle = ({id, children, className, onCircleClicked}) => {

  return (
    <div className={`gameCircle ${className} player_0`} onClick = {() => onCircleClicked(id)}>
      {children}
    </div>
  )
}

export default GameCircle
