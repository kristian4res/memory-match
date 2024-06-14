import { useEffect, useState } from 'react';
import './App.css';

import GameGrid from './components/game-grid/GameGrid';
import GameCard from './components/game-card/GameCard';
import Button from './components/button/Button';

const cardImages = [
  { "src": "/img/rpx-astronaut.jpg", matched: false },
  { "src": "/img/rpx-doctor.jpg", matched: false },
  { "src": "/img/rpx-construction.jpg", matched: false },
  { "src": "/img/rpx-officer.jpg", matched: false },
  { "src": "/img/rpx-baseball.jpg", matched: false },
  { "src": "/img/rpx-server.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // New game start on-load
  useEffect(() => {
    shuffleCards();
  }, []);

  // Compare choices (2 selected cards)
  useEffect(() => { 
    if ((choiceOne !== null && choiceTwo !== null)) {
      // Disable all cards except selected cards
      setDisabled(true);
      if ((choiceOne.src === choiceTwo.src)) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            }
            return card;
          })
        });
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset choices + increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="app">
      <h1 className="heading-primary">Memory Match</h1>
      <Button onClick={shuffleCards}>New Game</Button>
      <div className="stats-container">
        <span className="game-stats"> Turns: {turns}</span> 
      </div>
      <GameGrid>
        {
          cards.map(card => (
            <GameCard 
              key={card.id} 
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              matched={card.matched}
              disabled={disabled}
            />
          ))
        }
      </GameGrid>
      <div style="{{" display:="" 1,="" justify-content:="" center}}=""> 
        Made by Kristian
      </div>
    </div>
  );
}

export default App;
