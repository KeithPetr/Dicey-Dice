import { useState } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [keptDiceScores, setKeptDiceScores] = useState([]);
  const [heldDiceObjects, setHeldDiceObjects] = useState([]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const array = [];
    for (let i = 0; i < 5; i++) {
      array.push(generateNewDie());
    }
    return array;
  }

  function rollDice() {
    let hasOneOrFive = false;
    const newDice = dice.map((die) => {
      if (die.isHeld) {
        return die;
      }
      const newDie = generateNewDie();
      if (newDie.value === 1 || newDie.value === 5) {
        hasOneOrFive = true;
      }
      return newDie;
    });
    if (!hasOneOrFive) {
      setCurrentScore(0);
      setHeldDiceObjects([]);
    }
    setDice(newDice);
  }

  function addToCurrentScore() {
    let scoreToAdd = 0;
    const newHeldDiceObjects = new Set(heldDiceObjects);
    const newKeptDiceObjects = [];

    dice.forEach((die) => {
      if (die.isHeld && !newHeldDiceObjects.has(die.id)) {
        newHeldDiceObjects.add(die.id);
        newKeptDiceObjects.push(die.id);
      }
    });

    const heldDice = dice.filter(
      (die) =>
        newHeldDiceObjects.has(die.id) && !heldDiceObjects.includes(die.id)
    );
    scoreToAdd = heldDice.reduce(
      (total, die) => total + (die.value === 1 ? 10 : die.value === 5 ? 50 : 0),
      0
    );

    setCurrentScore((prevCurrentScore) => prevCurrentScore + scoreToAdd);
    setHeldDiceObjects([...heldDiceObjects, ...newKeptDiceObjects]);
    setKeptDiceScores((prevKeptDiceScores) => [
      ...prevKeptDiceScores,
      scoreToAdd,
    ]);
  }

  console.log(heldDiceObjects);
  console.log(`Current: ${currentScore}`);
  console.log(`Total: ${totalScore}`);

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        holdDice={() => holdDice(die.id)}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <main>
      <h1 className="title">Dicey Dice</h1>
      <p className="description">
        The greater the risk, the greater the score!
      </p>
      <div>Current Score:</div>
      <div>Total Score:</div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice-btn" onClick={rollDice}>
        Roll Dice
      </button>
      <button className="add-to-total-score-btn">Add to total score</button>
      <button className="keep-dice-btn" onClick={addToCurrentScore}>
        Keep Dice
      </button>
    </main>
  );
}

export default App;
