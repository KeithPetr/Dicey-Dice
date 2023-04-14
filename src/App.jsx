import { useState } from "react";
import Die from "./Die.jsx";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [heldDiceScores, setHeldDiceScores] = useState([])
  const [heldDiceIds, setHeldDiceIds] = useState([])

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
    }
    setDice(newDice);
  }

  function addToCurrentScore() {
    let scoreToAdd = 0;
    const newHeldDiceIds = new Set(heldDiceIds);
    dice.forEach(die => {
      if (die.isHeld) {
        scoreToAdd += die.value === 1 ? 10 : die.value === 5 ? 50 : 0;
        newHeldDiceIds.add(die.id)
      }
    });
    setCurrentScore(prevCurrentScore => prevCurrentScore + scoreToAdd);
    setHeldDiceIds(Array.from(newHeldDiceIds))
  }

  console.log(heldDiceIds)
  console.log(`Current: ${currentScore}`);
  console.log(`Total: ${totalScore}`);

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    const heldDie = dice.find(die => die.id === id);
    let heldDieScore = 0;
    if(heldDie.isHeld) {
      const heldDieScore = heldDie.value === 1 ? 10 : heldDie.value === 5 ? 50 : 0;
      setHeldDiceScores(prevHeldDiceScores => [
        ...prevHeldDiceScores,
        heldDieScore
      ]);
    } else {
      setHeldDiceScores(prevHeldDiceScores => 
        prevHeldDiceScores.filter(score => score !== heldDieScore)
        )
    }
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
      <button className="add-to-total-score-btn">
        Add to total score
      </button>
      <button className="keep-dice-btn" onClick={addToCurrentScore}>Keep Dice</button>
    </main>
  );
}

export default App;
