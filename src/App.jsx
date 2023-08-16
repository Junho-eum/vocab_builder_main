import { useState, useEffect } from "react";
import "./App.css";
import SynonymCards from "./SynonymCards";
import anime from "animejs/lib/anime.es.js";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Day4vocab from './page/Day4vocab'; // Make sure to import your vocab pages
import Day5vocab from "./page/Day5vocab";
import Day6vocab from "./page/Day6vocab";
import Day7vocab from "./page/Day7vocab";

const BlankSentences = {
  aberrant: {
    sentence: "his rages and aberrant behavior worsened",
    synonyms: ["deviant", "unusual"],
  },
  paradoxical: {
    sentence: "Jansens writing strikes many as paradoxical",
    synonyms: ["contradictory", "inconsistent"],
  },
  recondite: {
    sentence:
      "for one who is capable of enduing even the most recondite topics with a(n) breezy tone",
    synonyms: ["abstruse", "obscure"],
  },
  miser: {
    sentence: "the old miser hid his money in a sock under his bed",
    synonyms: ["hoarder", "scrooge"],
  },
  decorum: {
    sentence: "he had no idea of funeral decorum",
    synonyms: ["propriety", "etiquette"],
  },
  benign: {
    sentence:
      "I remember my grandfather's face was wrinklend, benign, and calm",
    synonyms: ["harmless", "gentle"],
  },
  docile: {
    sentence: "Barbara had always been so docile and obedient",
    synonyms: ["submissive", "compliant"],
  },
  hamper: {
    sentence: "their work is hampered by lack of funds",
    synonyms: ["hinder", "obstruct"],
  },
  whimsical: {
    sentence: "a whimsical sense of humor",
    synonyms: ["fanciful", "playful"],
  },
  dupe: {
    sentence: "he was duped by a con artist",
    synonyms: ["deceive", "trick"],
  },
  swindle: {
    sentence: "a businessman swindled investors out of millions of dollars",
    synonyms: ["cheat", "defraud"],
  },
  veritable: {
    sentence: "a veritable expert",
    synonyms: ["genuine", "real"],
  },
  banality: {
    sentence: "the banality of evil",
    synonyms: ["triteness", "ordinariness"],
  },
  haphazard: {
    sentence:
      "the kitchen drawers contained a haphazard collection of silver souvenir spoons",
    synonyms: ["random", "disorganized"],
  },
  equivocate: {
    sentence: "the officials evaded the reporters' questions by equivoating",
    synonyms: ["prevaricate", "dodge"],
  },

  unassailable: {
    sentence: "Professor Williams' theories are unassailable",
    synonyms: ["unquestionable", "indisputable"],
  },
  muted: {
    sentence: "the muted colors of an English landscape",
    synonyms: ["subdued", "soft"],
  },
  thwart: {
    sentence: "The road work is intended to thwart future traffic jams",
    synonyms: ["prevent", "stop"],
  },
  spartan: {
    sentence: "the room was furnished with a Spartan simplicity",
    synonyms: ["austere", "plain"],
  },
  corroborate: {
    sentence:
      "The police believed his story because it was corroborated by several witnesses.",
    synonyms: ["confirm", "verify"],
  },
  badger: {
    sentence: "Grandpa's dog will badger you until you throw the stick for him.",
    synonyms: ["pester", "bother"],
  },
};


function App() {
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
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/day4">Day 4</Link>
          <Link to="/day5">Day 5</Link>
          <Link to="/day6">Day 6</Link>
          <Link to="/day7">Day 7</Link>
        </nav>
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
        <h3>Basic 06 - Magoosh</h3>
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
      <Routes>
        <Route path="/day4" element={<Day4vocab />} />
        <Route path="/day5" element={<Day5vocab />} />
        <Route path="/day6" element={<Day6vocab />} />
        <Route path="/day7" element={<Day7vocab />} />
        {/* Add other routes for other vocab days here */}
      </Routes>
    </Router>
  );
}

export default App;
