import { useState } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [currentScore, setCurrentScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 5; i++) {
      array.push(generateNewDie())
    }
    return array;
  }

  function rollDice() {
    let hasOneOrFive = false
    const newDie = generateNewDie()
    const newDice = dice.map(die => {
      if (die.value === 1 || die.value === 5) {
        hasOneOrFive = true;
      }
    });
    setDice(newDice);
  }

  

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => {
    return <Die 
        key={die.id} 
        value={die.value} 
        holdDice={() => holdDice(die.id)}
        isHeld={die.isHeld}
      />
  })

  return (
    <main>
      <h1 className="title">Dicey Dice</h1>
      <p className="description">
        The greater the risk, the greater the score!
      </p>
      <div>Current Score:</div>
      <div>Total Score:</div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice-btn" onClick={rollDice}>Roll Dice</button>
    </main>
  );
}

export default App;
