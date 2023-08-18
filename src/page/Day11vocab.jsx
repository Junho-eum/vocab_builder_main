import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  contemptuous: {
    sentence:
      "Always on the forefront of fashion, Vanessa looked contemptuously at anyone wearing dated clothing.",
    synonyms: ["업신여기는", "경멸하는"],
  },
  debonair: {
    sentence: "James Bond is kbown for his good looks, high tech gadgets, and debonair manner.",
    synonyms: ["우아한", "suave"],
  },
  delegate: {
    sentence: "The company delegated the task of designing the new website to the intern.",
    synonyms: ["assign", "entrust"],
  },
  gambit: {
    sentence: "The chess player's opening gambit was a clever move that he hoped would lead to victory.",
    synonyms: ["전략", "책략"],
  },
  unnerve: {
    sentence: "At one point, the pressure of the competition unnerved the gymnast, but she quickly regained her composure.",
    synonyms: ["긴장하게 하다", "자신감을 잃게 하다"],
  },
  pariah: {
    sentence: "After the scandal, the politician became a pariah and was no longer invited to social events.",
    synonyms: ["추방자", "배척받는 사람"],
  },
  inchoate: {
    sentence: "The plan for the new business was still inchoate and lacked any details.",
    synonyms: ["미성숙한", "아직 정립되지 않은"],
  },
  bastardization: {
    sentence: "The movie was a bastardization of the classic novel, and the author was upset by the changes.",
    synonyms: ["변형", "왜곡"],
  },
  unseemly: {
    sentence: "The politician's unseemly behavior was a disgrace to his office.",
    synonyms: ["부적당한", "부도덕한"],
  },
  diatribes: {
    sentence: "The politician's speech was filled with diatribes against his opponent.",
    synonyms: ["비난", "통렬한 비판"],
  },
  histrionic: {
    sentence: "The actor's histrionic performance was so over the top that it was laughable.",
    synonyms: ["과장된", "극적인"],
  },
  nettlesome: {
    sentence: "The nettlesome child was always getting into trouble.",
    synonyms: ["짜증나는", "성가신"],
  },
  artifice: {
    sentence: "The magician's artifice was so convincing that the audience was amazed.",
    synonyms: ["기술", "술책"],
  },
  squander: {
    sentence: "The lottery winner squandered all of his money on expensive cars and vacations.",
    synonyms: ["낭비하다", "허비하다"],
  },
  dog: {
    sentence: "The detective dogged the suspect until he had enough evidence to make an arrest.",
    synonyms: ["추적하다", "꾸짖다"],
  },
  corollary: {
    sentence: "The corollary of the new law was that many people lost their jobs.",
    synonyms: ["결과", "필연적인 결과"],
  },
  ebullient: {
    sentence: "The ebullient child was always laughing and playing.",
    synonyms: ["활기가 넘치는", "열광적인"],
  },
  telltale: {
    sentence: "The telltale signs of the disease were a high fever and a rash.",
    synonyms: ["알려주는", "자소서"],
  },
  lachrymose: {
    sentence: "The lachrymose movie made everyone in the theater cry.",
    synonyms: ["슬픈", "눈물을 자아내는"],
  },
  avarice: {
    sentence: "The avarice of the banker led him to steal money from his clients.",
    synonyms: ["탐욕", "욕심"],
  },
  antic: {
    sentence:"The clowns antic act was too extreme for the youngest children, who left the room in tears",
    synonyms: ["이상한", "기괴한"],
  },
  revenous: {
    sentence: "After the long hike, the hikers were ravenous and ate everything in sight.",
    synonyms: ["굶주린", "허기진"],
  },
  solicitous: {
    sentence: "The solicitous nurse made sure that the patient was comfortable.",
    synonyms: ["관심을 보이는", "케어하고 싶어하는"],
  },
  abjudicate: {
    sentence: "The judge was asked to abjudicate the case.",
    synonyms: ["재판하다", "심판하다"],
  },
  abjure: {
    sentence: "The witness abjured his previous testimony and told the truth.",
    synonyms: ["반대하다", "거부하다"],
  },
  abnegate: {
    sentence: "The monk abnegated all worldly possessions and lived in a small hut.",
    synonyms: ["포기하다", "거부하다"],
  },
  abrogate: {
    sentence: "The president abrogated the treaty and declared war.",
    synonyms: ["폐지하다", "무효화하다"],
  },
  enmity: {
    sentence: "The enmity between the two rival gangs was so strong that they would fight on sight.",
    synonyms: ["적대감", "원한"],
  },

};


function Day11vocab() {
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

export default Day11vocab;
