import { useState } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 5; i++) {
      const randNum = Math.floor(Math.random() * 6) + 1;
      array.push({
        value: randNum,
        isHeld: true,
        id: nanoid()
      });
    }
    return array;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map(die => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld}/>
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
