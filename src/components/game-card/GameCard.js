import React from 'react';
import './GameCard.css';

const GameCard = ({ card, handleChoice, flipped, matched, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="game-grid__card">
            <div className={flipped ? "game-grid__card-flip" : ""}>
                <img 
                    src={card.src} 
                    alt="Card front" 
                    className={`game-grid__card--front ${matched ? "game-grid__card-matched": ""}`}
                />
                <img 
                    src="/img/cover.png" 
                    alt="Card back" 
                    className={`game-grid__card--back ${matched ? "game-grid__card-matched": ""}`}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
};

export default GameCard;