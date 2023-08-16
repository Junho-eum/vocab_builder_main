import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  aberrant: {
    sentence: "his rages and aberrant behavior worsened",
    synonyms: ["deviant", "unusual"],
  },
  chagrin: {
    sentence: "to her chagrin, he didn't remember her at all",
    synonyms: ["annoyance", "displeasure"],
  },
  charlatan: {
    sentence: "he pretends to be an expert but he's nothing but a charlatan",
    synonyms: ["swindler", "fraud"],
  },
  chary: {
    sentence: "she was chary of accepting his offer",
    synonyms: ["cautious", "wary"],
  },
  chasten: {
    sentence: "the director was somewhat chastened by his recent flops",
    synonyms: ["subdue", "humiliate"],
  },
  chastise: {
    sentence: "he chastised his colleagues for their laziness",
    synonyms: ["scold", "reprimand"],
  },
  chauvinism: {
    sentence: "Their ingrained chauvinism blineded them to their country's faults",
    synonyms: ["jingoism", "excessive patriotism"],
  },
  check: {
    sentence: "the government's powers are checked by constitutional safeguards",
    synonyms: ["restrain", "curb"],
  },
  checkered: {
    sentence: "a checkered career",
    synonyms: ["variegated", "irregular"],
  },
  chicanery: {
    sentence: "political chicanery of the worst sort",
    synonyms: ["trickery", "deception"],
  },
  chivalrous: {
    sentence: "he behaved in a chivalrous way toward her",
    synonyms: ["gallant", "gentlemanly"],
  },
  churlish: {
    sentence: "it seems churlish to complain",
    synonyms: ["rude", "ill-mannered"],
  },
  cipher: {
    sentence: "the message was written in cipher",
    synonyms: ["code","secret writing"]
  },
  insipid: {
    sentence: "many artists continued to churn out insipid, shallow works",
    synonyms: ["bland", "banal"],
  },
  diminutive: {
    sentence: "a diminutive figure dressed in black",
    synonyms: ["small", "tiny"],
  },
  contrive:{
    sentence: "he contrived to gain their votes",
    synonyms: ["engineer", "devise"],
  },
  contrite: {
    sentence: "a broken and a contrite heart",
    synonyms: ["remorseful", "penitent"],
  },
  conjour: {
    sentence: "he hoped to conjure away the demons of disease and poverty",
    synonyms: ["invoke", "summon"],
  },
  wield: {
    sentence: "the rebels still wield considerable power",
    synonyms: ["exert", "exercise"],
  },
  conflate: {
    sentence: "the urban crisis conflates a number of different economic and social issues",
    synonyms: ["combine", "fuse"],
  },
  swelter: {
    sentence: "we sweltered in the scorching sun",
    synonyms: ["sweat", "suffocate"],
  },
  presumtous: {
    sentence: "I hope I won't be considered presumptuous if I offer some advice",
    synonyms: ["arrogant", "overconfident"],
  },
  intrepid: {
    sentence: "our intrepid reporter",
    synonyms: ["fearless", "unafraid"],
  },
  };


function Day6vocab() {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState(false); // Added
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [displayedSynonyms, setDisplayedSynonyms] = useState([]); // New state for displayed synonyms
  const [streakCount, setStreakCount] = useState(0);
  const initialShuffledKeys = Object.keys(BlankSentences).sort(
    () => Math.random() - 0.5
  );
  const [currentWord, setCurrentWord] = useState(initialShuffledKeys[0]);
  const [selectedSynonyms, setSelectedSynonyms] = useState([]); // New state
  const [remainingKeys, setRemainingKeys] = useState(initialShuffledKeys);

  // Shuffle the keys of BlankSentences
  const shuffledKeys = Object.keys(BlankSentences).sort(
    () => Math.random() - 0.5
  );

  useEffect(() => {
    if (currentWord) {
      setDisplayedSynonyms(
        getRandomSynonyms(BlankSentences[currentWord].synonyms)
      );
    }
  }, [currentWord]);
  const getRandomSynonyms = (correctSynonyms) => {
    const allSynonyms = Object.values(BlankSentences).flatMap(
      (word) => word.synonyms
    );
    const incorrectSynonyms = allSynonyms.filter(
      (synonym) => !correctSynonyms.includes(synonym)
    );
    const selectedIncorrect = incorrectSynonyms
      .sort(() => 0.5 - Math.random())
      .slice(0, 10 - correctSynonyms.length); // Make sure to select enough incorrect synonyms
    return [...selectedIncorrect, ...correctSynonyms].sort(
      () => 0.5 - Math.random()
    );
  };

  const handleCorrectSelection = (synonym) => {
    if (BlankSentences[currentWord].synonyms.includes(synonym)) {
      setSelectedSynonyms([...selectedSynonyms, synonym]);
      if (selectedSynonyms.length + 1 === 2) {
        setScore(score + 1);
        // Add logic to move to the next word or other behavior here
      }
    }
  };

  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const checkAnswer = () => {
    const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
    setCorrectAnswer(isCorrect);
    setIncorrectAnswer(!isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      const newStreakCount = streakCount + 1;
      setStreakCount(newStreakCount);
      if (newStreakCount === 3) {
        // Trigger animation when three-answer streak is reached
        animateProgressOverflow();
        setStreakCount(0); // Reset streak count
      }
    } else {
      setStreakCount(0); // Reset streak count on wrong answer
      setWrongAnswersCount(wrongAnswersCount + 1);
    }
    setTimeout(() => {
      if (isCorrect) {
        const nextRemainingKeys = remainingKeys.filter(
          (key) => key !== currentWord
        ); // Remove the current key
        setRemainingKeys(nextRemainingKeys);
        const nextWord = nextRemainingKeys[index]; // Get the next word from the remaining keys
        if (nextWord) {
          setCurrentWord(nextWord);
        }
      } else {
        const nextWord =
          remainingKeys[Math.floor(Math.random() * remainingKeys.length)]; // Randomly select next word from the remaining keys
        if (nextWord) {
          setCurrentWord(nextWord);
        }
      }
      setUserInput("");
      setCorrectAnswer(false);
      setIncorrectAnswer(false);
    }, 2000);
  };

  const animateProgressOverflow = () => {
    anime({
      targets: ".progress-bar",
      width: "105%", // Overflow effect
      duration: 800,
      easing: "easeInOutQuart",
      complete: () => {
        // Reset to 0% after the animation
        anime({
          targets: ".progress-bar",
          width: "0%",
          duration: 400,
          easing: "easeInOutQuart",
        });
      },
    });
  };

  const handleKeyPress = (event) => {
    // Added
    if (event.key === "Enter") {
      checkAnswer();
    }
  };
  const progressBarHeight = `${(score / initialShuffledKeys.length) * 100}%`;
  const progressBarWidth = `${(score / initialShuffledKeys.length) * 100}%`;
  const wrongProgressBarHeight = `${
    (wrongAnswersCount / initialShuffledKeys.length) * 100
  }%`;
  const currentSentence = currentWord
    ? BlankSentences[currentWord].sentence
    : null;

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: progressBarWidth }}
          ></div>
          <div
            className="progress-bar-correct" // Correct progress bar class
            style={{ height: progressBarHeight }}
          ></div>
        </div>
        <div className="progress-container">
          <div
            className="progress-bar-wrong" // Wrong progress bar class
            style={{ height: wrongProgressBarHeight }}
          ></div>
        </div>
      </div>
      <h1>DAY 02</h1>
      <div className="sentence">
        {currentWord ? (
          <>
            <p className="question">
              {currentSentence
                ? currentSentence.replace(currentWord, "_______")
                : null}
            </p>

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Fill in the blank"
              className={
                correctAnswer ? "correct-answer input-box" : "input-box"
              } // Added "input-box"
            />
            <button onClick={checkAnswer}>Check Answer</button>
            {incorrectAnswer && (
              <p className="incorrect-answer">
                The correct answer was: {currentWord}
              </p>
            )}
          </>
        ) : (
          <p>
            You have completed all the sentences! Your score is {score}/
            {initialShuffledKeys.length}.
          </p>
        )}
        <div className="score">
          <p>Score: {score}</p>
        </div>
        <div>
          {currentWord && (
            <SynonymCards
              synonyms={displayedSynonyms} // Pass displayedSynonyms here
              correctSynonyms={BlankSentences[currentWord].synonyms} // pass correct synonyms
              onCorrectSelection={handleCorrectSelection}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Day6vocab;
