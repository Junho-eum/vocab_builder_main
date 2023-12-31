import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  bleak: {
    sentence:
      "The future of the company looked bleak after the stock price fell.",
    synonyms: ["암울한", "희망없는"],
  },
  meander: {
    sentence: "The river meandered through the valley.",
    synonyms: ["구불구불하게 흐르다", "보행하다"],
  },
  modicum: {
    sentence:
      "If my sister had even a modicum of sense, she wouldn't be engaged to that loser.",
    synonyms: ["소량", "조금"],
  },
  invioble: {
    sentence:
      "To many the grass at Wimbledon is inviolable and only greater tennis players are able to play there.",
    synonyms: ["침범할 수 없는", "신성한"],
  },
  loath: {
    sentence: "The child was loath to go to bed early.",
    synonyms: ["마지못해하는", "꺼리는"],
  },
  resignation: {
    sentence:
      "Since Jack could not think of a convincing excuse for missing the final exam, he accepted his fate with resignation.",
    synonyms: ["사직", "사퇴"],
  },
  impregnable: {
    sentence: "The castle's walls were impregnable.",
    synonyms: ["무적의", "파괴할 수 없는"],
  },
  flag: {
    sentence:
      "After the three crushing defeats in the last three games, the team's spirit began to flag.",
    synonyms: ["흐느적거리다", "흐느끼다"],
  },
  disinterested: {
    sentence:
      "The judge was completely disinterested in the defendant's sob story.",
    synonyms: ["공정한", "편견없는"],
  },
  hubris: {
    sentence:
      "The mayor's hubris was evident when he decided to build a monument to himself.",
    synonyms: ["자만심", "오만함"],
  },
  epigram: {
    sentence:
      "The epigram was so well written that it was quoted by many people.",
    synonyms: ["경구", "경구체"],
  },
  endemic: {
    sentence: "The disease is endemic to the tropics.",
    synonyms: ["풍토병의", "풍토병"],
  },
  grandiloquent: {
    sentence:
      "The politician's grandiloquent speech did not impress his constituents.",
    synonyms: ["과장된", "장황한"],
  },
  ingenuity: {
    sentence:
      "The ingenuity of the software developers is evident in the latest version of the app.",
    synonyms: ["독창성", "기발함"],
  },
  becoming: {
    sentence: "The dress was becoming on her.",
    synonyms: ["어울리는", "잘 어울리는"],
  },
  apprehension: {
    sentence: "Test day can be a time of great apprehension for many students.",
    synonyms: ["걱정", "불안"],
  },
  truculence: {
    sentence:
      "The truculence of the dictator was evident in his refusal to negotiate.",
    synonyms: ["폭력성", "거침"],
  },
  antedate: {
    sentence:
      "The discovery of ancient tools antedates the arrival of humans in the Americas.",
    synonyms: ["~보다 먼저 일어나다", "~보다 앞서다"],
  },
  vindicative: {
    sentence: "The vindictive child broke his sister's doll.",
    synonyms: ["복수심이 강한", "앙심을 품은"],
  },
};


function Day12vocab() {
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
      <h3>intermed3-Magoosh</h3>
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

export default Day12vocab;
