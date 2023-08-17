import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  coddle: {
    sentence: "She coddles the children.",
    synonyms: ["pamper", "spoil"],
  },
  codify: {
    sentence: "The convention codified the rules of war.",
    synonyms: ["systematize", "arrange"],
  },
  presumptuous: {
    sentence: "many felt that Barney was presumtuous in moving into the large office before the management actually promoted him to the position of manager.",
    synonyms: ["arrogant", "audacious"],
  },
  panecea: {
    sentence: "The doctor claimed that the new wonder drug was a panacea that could cure all ailments.",
    synonyms: ["cure-all", "remedy"],
  },
  fickle: {
    sentence: "She was so fickle in her politics, it was hard to pinpoint her beliefs.",
    synonyms: ["capricious", "inconstant"],
  },
  preempt: {
    sentence: "The government preempted the strike by arresting the union leaders.",
    synonyms: ["forestall", "take the place of"],
  },
  misanthrope: {
    sentence: "The Grinch was a misanthrope who hated all people.",
    synonyms: ["cynic", "hater of people"],
  },
  flippant: {
    sentence: "The flippant child was always making sarcastic remarks.",
    synonyms: ["impertinent", "disrespectful"],
  },
  provisional: {
    sentence: "The government was only provisional, since the country had never had a democracy before.",
    synonyms: ["temporary", "tentative"],
  },
  improvident: {
    sentence: "The improvident gambler lost all his money.",
    synonyms: ["wasteful", "not careful"],
  },
  creditable: {
    sentence: "The student's performance was creditable, considering that he had not studied very much.",
    synonyms: ["good but not great", "laudable"],
  },
  savvy: {
    sentence: "The savvy investor knew when to buy and sell stocks.",
    synonyms: ["shrewd", "knowledgeable"],
  },
  base: {
    sentence: "She was not so base as to begrudge the beggar the unwanted crumbs from her dinner plate.",
    synonyms: ["without principles", "mean"],
  },
  estimable: {
    sentence: "The estimable gentleman was a pillar of the community.",
    synonyms: ["admirable", "worthy"],
  },
  reverent: {
    sentence: "The reverent child prayed every night.",
    synonyms: ["deeply respectful", "worshipful"],
  },
  obliging: { 
    sentence: "The obliging child always did what his parents asked.",
    synonyms: ["helpful", "eager to help"],
  },
  vitriol: {
    sentence: "The vitriol in his voice was obvious.",
    synonyms: ["bitterness", "malice"],
  },
  morph: {
    sentence: "The caterpillar morphed into a butterfly.",
    synonyms: ["transform", "change dramatically"],
  },
  heyday: {
    sentence: "The heyday of the Roman Empire was a time of great prosperity.",
    synonyms: ["golden age", "prime"],
  },
  dispassionate: {
    sentence: "The dispassionate judge was not swayed by the defendant's tears.",
    synonyms: ["objective", "unbiased"],
  },
  compound: {
    sentence: "Her headache was compounded by the construction noise outside.",
    synonyms: ["worsen", "intensify"],
  },
  effervescent: {
    sentence: "The effervescent child was always laughing and playing.",
    synonyms: ["bubbly", "lively"],
  },
  elicit: {
    sentence: "The teacher tried to elicit the correct answer from the student.",
    synonyms: ["draw out", "bring forth"],
  },
  cornucopia: {
    sentence: "The cornucopia was filled with fruits and vegetables.",
    synonyms: ["horn of plenty", "abundance"],
  },
  patronize: {
    sentence: "She felt that the salesman was patronizing her when he spoke to her in a slow, condescending voice.",
    synonyms: ["condescend to", "talk down to"],
  },
  taxing: {
    sentence: "The work was taxing, but she enjoyed it.",
    synonyms: ["demanding", "exhausting"],
  },
  cataclysm: {
    sentence: "The cataclysm destroyed the entire city.",
    synonyms: ["violen upheaval", "catastrophe"],
  },

};


function Day9vocab() {
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
      <h3>Basic07-Magoosh</h3>
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

export default Day9vocab;
