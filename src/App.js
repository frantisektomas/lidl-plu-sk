import React, { useState, useEffect } from 'react';
import jsonData from './products.json'; // Import your JSON data
import './App.css'; // Import your CSS file

const App = () => {
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // Import JSON data
  useEffect(() => {
    setItems(jsonData);
  }, []);

  // Shuffle items
  const shuffleItems = () => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
  };

  // Check user input
  const checkInput = () => {
    const currentItem = items[currentItemIndex];
    if (userInput === currentItem.code) {
      setIsCorrect(true);
      setTimeout(nextItem, 1000); // Move to next item after 1 second if correct
    } else {
      setIsCorrect(false);
    }
  };

  // Move to the next item
  const nextItem = () => {
    setCurrentItemIndex(currentItemIndex + 1);
    setUserInput('');
    setIsCorrect(null);
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkInput();
    }
  };

  return (
    <div className="quiz-container">
      {items.length > 0 && currentItemIndex < items.length && (
        <div>
          <div className="quiz-header">
            <h3>Quiz App</h3>
          </div>
          <div className="quiz-question">
            <h3>{items[currentItemIndex].name}</h3>
            <p>Type: {items[currentItemIndex].type}</p>
          </div>
          <input
            className="quiz-input"
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress} // Call handleKeyPress on key press
            placeholder="Type your answer here..."
          />
          <div className="button-group">
            <button className="quiz-button" onClick={checkInput}>Guess</button>
            <button className="quiz-button" onClick={shuffleItems}>Shuffle</button>
            <button className="quiz-button" onClick={nextItem}>Next</button>
          </div>
          {isCorrect !== null && (
            <p className="quiz-feedback">{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
          )}
        </div>
      )}
      {currentItemIndex === items.length && (
        <p className="quiz-complete">Congratulations! You have completed the quiz.</p>
      )}
    </div>
  );
};

export default App;
