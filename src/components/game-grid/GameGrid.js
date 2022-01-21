import React from 'react';

import './GameGrid.css';

const GameGrid = ({ children }) => {
    return (    
        <div className="game-grid">
            {
                children
            }
        </div>    
    )
};

export default GameGrid;