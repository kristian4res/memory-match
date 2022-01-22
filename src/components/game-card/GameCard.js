import React from 'react';

import './GameCard.css';

const GameCard = ({ card, handleChoice, flipped, matched, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="game-card">
            <div className={flipped ? "game-card-flip" : ""}>
                <img 
                    src={card.src} 
                    alt="Card front" 
                    className={`card-img game-card--front ${matched ? "game-card-matched": ""}`}
                />
                <div 
                    className={`card-img game-card--back ${matched ? "game-card-matched": ""}`}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
};

export default GameCard;