import { useEffect, useState } from 'react';
import './App.css';

import GameCard from './components/game-card/GameCard';
import Button from './components/button/Button';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
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
    <div className="App">
      <h1>Memory Match</h1>
      <Button onClick={shuffleCards}>New Game</Button>

      <div className="game-grid">
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
      </div> 
      <p>Turns: {turns}</p> 
    </div>
  );
}

export default App;
