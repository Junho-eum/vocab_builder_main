import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {

  dilapidated: {
    sentence:"The house was in a dilapidated condition.",
    synonyms: ["다부서져가는", "쇠약해진"],
  },
  ostracize: {
    sentence:"Later in his lif, Leo Tolstoy was ostracized by the Russian Orthodox Church for his radical views.",
    synonyms: ["추방하다", "퇴출하다"],
  },
  baleful: {
    sentence:"The baleful look on his face made me think that he was about to hit me.",
    synonyms: ["해로운", "악의적인"],
  },
  inflammatory: {
    sentence:"The inflammatory speech by the politician caused a riot.",
    synonyms: ["자극적인", "조장하는"],
  },
  moribund: {
    sentence:"The moribund patient was not expected to live through the night.",
    synonyms: ["죽어가는", "쇠약해진"],
  },
  obstreperous: {
    sentence:"The obstreperous child was sent to the principal's office.",
    synonyms: ["시끄러운", "조용하지 않은"],
  },
  irascible: {
    sentence: "If you don't want to make him angry, don't mention his ex-wife. He's very irascible about her.",
    synonyms: ["성급한", "쉽게 화내는"],
  },
  miscreant: {
    sentence: "The miscreant was sent to prison for his crimes.",
    synonyms: ["악한", "비행하는"],
  },
  flush: {
    sentence: "The exam's passage was flush with difficult vocabulary.",
    synonyms: ["풍부한", "부유한"],
  },
  conniving: {
    sentence: "The queen was so conniving that she had her husband killed so that she could marry her lover.",
    synonyms: ["음모를 꾸미는", "계략을 꾸미는"],
  },
  prosaic: {
    sentence: "The prosaic writing style of the novel made it difficult to read.",
    synonyms: ["평범한", "지루한"],
  },
  versimilitude: {
    sentence: "The versimilitude of the painting was so great that it looked like a photograph.",
    synonyms: ["진실성", "진위"],
  },
  subterfuge: {
    sentence: "The spy used subterfuge to get the information he needed.",
    synonyms: ["속임수", "구실"],
  },
  reprisal: {
    sentence: "The country launched a reprisal attack against its enemy.",
    synonyms: ["보복", "복수"],
  },
  juxatapos: {
    sentence: "The juxatapos of the two paintings made it clear that the artist was trying to make a point.",
    synonyms: ["병치", "병렬"],
  },
  pucniary: {
    sentence: "The pucniary reward for the capture of the criminal was $10,000.",
    synonyms: ["형사상의", "형사상의"],
  },
  impecunious: {
    sentence: "The couple was so impecunious that they could not afford to buy food.",
    synonyms: ["가난한", "빈곤한"],
  },
  idiosyncrasy: {
    sentence: "The idiosyncrasy of the artist was that he always painted with his feet.",
    synonyms: ["특이한 습관", "특이한 행동"],
  },
  officious: {
    sentence: "The professor had an officious manner that made it difficult for students to ask questions.",
    synonyms: ["참견하기 좋아하는", "참견하기 좋아하는"],
  },
  gaffe: {
    sentence: "The politician made a gaffe when he accidentally insulted the queen.",
    synonyms: ["실수", "사회적 실수"],
  },
  eminent: {
    sentence: "The eminent scientist was awarded the Nobel Prize for his work.",
    synonyms: ["저명한", "뛰어난"],
  },
  stalwart: {
    sentence: "The stalwart soldier refused to surrender to the enemy.",
    synonyms: ["충실한", "확고한"],
  },
  firebrand: {
    sentence: "The firebrand politician was known for his fiery speeches.",
    synonyms: ["불꽃", "문제를 일으키는"],
  },
  ascribe: {
    sentence: "The teacher ascribed the student's failure to laziness.",
    synonyms: ["~의 탓으로 돌리다", "~의 탓으로 돌리다"],
  },

};


function Day15vocab() {
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
      <h3>intermed6-2-Magoosh</h3>
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

export default Day15vocab;
