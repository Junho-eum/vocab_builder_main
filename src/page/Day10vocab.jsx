import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  coddle: {
    sentence: "She coddles the children.",
    synonyms: ["pamper", "애지중지하다"],
  },
  presumptuous: {
    sentence:
      "many felt that Barney was presumptuous in moving into the large office before the management actually promoted him to the position of manager.",
    synonyms: ["arrogant", "건방진"],
  },
  panacea: {
    sentence:
      "The doctor claimed that the new wonder drug was a panacea that could cure all ailments.",
    synonyms: ["cure-all", "remedy"],
  },
  flippant: {
    sentence: "The flippant child was always making sarcastic remarks.",
    synonyms: ["impertinent", "disrespectful"],
  },
  base: {
    sentence:
      "She was not so base as to begrudge the beggar the unwanted crumbs from her dinner plate.",
    synonyms: ["without principles", "mean"],
  },
  estimable: {
    sentence: "The estimable gentleman was a pillar of the community.",
    synonyms: ["admirable", "worthy"],
  },
  vitriol: {
    sentence: "The vitriol in his voice was obvious.",
    synonyms: ["bitterness", "malice"],
  },
  dispassionate: {
    sentence:
      "The dispassionate judge was not swayed by the defendant's tears.",
    synonyms: ["objective", "unbiased"],
  },
  effervescent: {
    sentence: "The effervescent child was always laughing and playing.",
    synonyms: ["bubbly", "lively"],
  },
  patronize: {
    sentence:
      "She felt that the salesman patronize her when he spoke to her in a slow, condescending voice.",
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
  afford: {
    sentence:
      "The summit of Mt.kilmanjaro affords a panoramic view that encompases both Tanzania and Kenya.",
    synonyms: ["provide", "give opportunity for "],
  },
  squelch: {
    sentence:
      "The company tried to squelch rumors that it was about to go bankrupt.",
    synonyms: ["suppress", "crush"],
  },
  tirade: {
    sentence:
      "The customer launched into a tirade against the waiter who had spilled soup on his shirt.",
    synonyms: ["long angry speech", "harangue"],
  },
  unforthcoming: {
    sentence:
      "The witness was unforthcoming and refused to answer the prosecutor's questions.",
    synonyms: ["uncooperative", "unwilling to give information"],
  },
  languish: {
    sentence: "The plants languished in the heat.",
    synonyms: ["become weak", "droop"],
  },
  artlessness: {
    sentence:
      "The artlessness of the child's remark startled the adults into silence.",
    synonyms: ["innocence", "simplicity"],
  },
  bemoan: {
    setence:
      "While the CFO carefully explained all the reasons for the cuts in benefits, after the meeting employees could be heard bemoaning the loss of their free gym membership.",
    synonyms: ["한탄하다", "lament"],
  },
  betray: {
    sentence:
      "With the gold medal at stake, the gymnast awaited his turn, his quivering lip betraying his intense emotions.",
    synonyms: ["reveal", "show"],
  },
  blithe: {
    sentence:
      "The blithe spirit of the actress lifted the somber mood of the funeral.",
    synonyms: ["태평스러운 (부정)", "cheerful"],
  },
  attenuate: {
    sentence:
      "Her animosiy towards Bob atenuated over the years, and she even went so far as to invite him to her party.",
    synonyms: ["약화시키다", "taper off"],
  },
  contemptuous: {
    sentence:
      "Always on the forefront of fashion, Vanessa looked contemptuously at anyone wearing dated clothing.",
    synonyms: ["업신여기는", "경멸하는"],
  },
  debonair: {
    sentence: "James Bond is kbown for his good looks, high tech gadgets, and debonair manner.",
    synonyms: ["우아한", "suave"],
  },
  elude: {
    sentence:"Even a basic understanding of physics should elude most high school students.",
    synonyms: ["이해할수 없는", "evade"],
  },
  elusive: {
    sentence: "Many first time skydivers say that describing the act of falling from the sky is elusive.",
    synonyms: ["형용하기 어려운", "difficult to pin down"],
  },
};


function Day10vocab() {
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
      <h3>Basic08-Magoosh</h3>
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

export default Day10vocab;
