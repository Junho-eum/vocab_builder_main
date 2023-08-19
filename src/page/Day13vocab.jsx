import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
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
  vindictive: {
    sentence: "The vindictive child broke his sister's doll.",
    synonyms: ["복수심이 강한", "앙심을 품은"],
  },
  celerity: {
    sentence:"The celerity with which the police responded to the bank robbery prevented the thieves from escaping.",
    synonyms: ["민첩함", "빠름"],
  },
  malinger: {
    sentence: "The soldier malingered in order to avoid combat.",
    synonyms: ["꾀병을 부리다", "꾀병을 부리다"],
  },
  epiphany: {
    sentence:"The scientist had an epiphany that led to a major breakthrough in his research.",
    synonyms: ["통찰", "깨달음"],
  },
  illustrious: {
    sentence:"The illustrious scientist won the Nobel Prize for his work.",
    synonyms: ["저명한", "명성있는"],
  },
  malodorous: {
    sentence:"The malodorous smell of the garbage was overwhelming.",
    synonyms: ["악취가 나는", "냄새나는"],
  },
  trite: {
    sentence:"The trite saying, 'Actions speak louder than words,' is often true.",
    synonyms: ["진부한", "진부한"],
  },
  tempestuous: {
    sentence:"Chuck and Sarah had a tempestuous relationship.",
    synonyms: ["폭풍우의", "굉장히 감정이 격한"],
  },
  inure: {
    sentence:"The soldiers were inured to the hardships of war.",
    synonyms: ["익숙하게 하다", "관습에 익숙하게 하다"],
  },
  stymie: {
    sentence:"The company's growth was stymied by a sluggish economy.",
    synonyms: ["방해하다", "좌절시키다"],
  },
  denouement: {
    sentence:"The denouement of the movie was unexpected.",
    synonyms: ["해결", "결말"],
  },
  rebuke: {
    sentence:"The teacher rebuked the student for cheating.",
    synonyms: ["비난하다", "꾸짖다"],
  },
  lacerate: {
    sentence:"The lacerate wound required several stitches.",
    synonyms: ["찢다", "찢을정도로 비난하다"],
  },
  dissemble: {
    sentence:"The politician dissembled in order to hide his true intentions.",
    synonyms: ["감추다", "가장하다"],
  },
  perfunctory: {
    sentence:"The student's perfunctory effort earned him a failing grade.",
    synonyms: ["형식적인", "루틴적인"],
  },
  unpropitious: {
    sentence:"The unpropitious weather forced the cancellation of the picnic.",
    synonyms: ["불길한", "불리한"],
  },
  surreptitious: {
    sentence:"The surreptitious spy was able to steal the plans without being noticed.",
    synonyms: ["은밀한", "비밀의"],
  },
  dovetail: {
    sentence:"The two companies' interests dovetailed, and they decided to work together.",
    synonyms: ["조화를 이루다", "조화를 이루다"],
  },
  uncanny: {
    sentence: "Reggie has an uncanny ability to connect with animals.",
    synonyms: ["기이한", "기묘한"],
  },
  puissant: {
    sentence:"The puissant king was able to defeat all of his enemies.",
    synonyms: ["강력한", "강력한"],
  },
  fawn: {
    sentence:"The dog fawned over its owner.",
    synonyms: ["아첨하다", "아첨하다"],
  },
  discomfit: {
    sentence:"The politician was discomfited by the reporter's questions.",
    synonyms: ["당황하게 하다", "당황하게 하다"],
  },
  disenfrancise: {
    sentence:"The new law disenfranchised many voters.",
    synonyms: ["권리를 박탈하다", "권리를 박탈하다"],
  },
  conflagration: {
    sentence:"The conflagration destroyed the entire town.",
    synonyms: ["대화재", "대화재"],
  },
  rustic: {
    sentence:"The rustic cabin was a welcome retreat from the city.",
    synonyms: ["전원적인", "전원적인"],
  },
  nadir: {
    sentence:"The nadir of the trip was when the car broke down in the middle of the desert.",
    synonyms: ["최악의 시기", "최악의 시기"],
  },
  spendthrift: {
    sentence:"The spendthrift couple spent all of their money on frivolous purchases.",
    synonyms: ["낭비하는", "낭비하는"],
  },
  machinate: {
    sentence:"The evil villain machinated a plan to take over the world.",
    synonyms: ["음모를 꾸미다", "음모를 꾸미다"],
  },
  


};


function Day13vocab() {
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
      <h3>intermed5-Magoosh</h3>
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

export default Day13vocab;
