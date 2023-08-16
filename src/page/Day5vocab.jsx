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
  blithe: {
    sentence: "a blithe disregard for the rules of the road",
    synonyms: ["carefree", "cheerful"],
  },
  calumny: {
    sentence: "a fierce battle in which truth had eventually triumphed over calumny",
    synonyms: ["slander", "libel"],
  },
  blurt: {
    sentence: "I blurted out the first thing that came to mind",
    synonyms: ["exclaim", "cry"],
  },
  bluster: {
    sentence: "the administration's bluster about unimportant details",
    synonyms: ["rant", "boast"],
  },
  bode: {
    sentence: "their argument did not bode well for the future",
    synonyms: ["augur", "portend"],
  },
  bogus: {
    sentence: "The evidence was bogus",
    synonyms: ["fake", "false"],
  },
  boisterous: {
    sentence: "A large and boisterous crowd attended the concert.",
    synonyms: ["rowdy", "loud"],
  },
  boon: {
    sentence: "My generous donation was a great boon to the charity.",
    synonyms: ["blessing", "benefit"],
  },
  boorish: {
    sentence: "boorish behavior such as yelling for service in restaurants is not acceptable.",
    synonyms: ["rude", "crude"],
  },
  bombastic: {
    sentence: "a bombastic speech intended to impress the voters in her congressional district",
    synonyms: ["pompous", "pretentious"],
  },
  bountiful: {
    sentence: "a bountiful supply of food",
    synonyms: ["abundant", "plentiful"],
  },
  bootless: {
    sentence: "a bootless attempt to make a deal",
    synonyms: ["useless", "unproductive"],
  },
  brackish: {
    sentence: "brackish water",
    synonyms: ["salty", "briny"],
  },
  braggart: {
    sentence: "a braggart who was always talking about how much money he made",
    synonyms: ["boaster", "bragger"],
  },
  brandish: {
    sentence:"Jason brandished his sword at the monster.",
    synonyms: ["wave", "show off"],
  },
  bravado: {
    sentence: "His stories are always told with bravado.",
    synonyms: ["boldness", "bluster"],
  },
  brazen: {
    sentence: "a brazen demand for special treatment just because she's rich",
    synonyms: ["bold", "shameless"],
  },
  bray: {
    sentence: "the donkey brayed its displeasure",
    synonyms: ["shout", "cry"],
  },
  bridle: {
    sentence: "The fact that he was their servant bridled him from saying anything.",
    synonyms: ["restrain", "control"],
  },
  bristle: {
    sentence: "Many Latin American writers and critics have come to bristle at the very mention of the Boom.",
    synonyms: ["become angry", "become annoyed"],
  },
  broach: {
    sentence: "We broached our plans for the new year",
    synonyms: ["bring up", "mention"],
  },
  bromide: {
    sentence: "His speech had nothing more to offer than the usal bromides about how everyone needs to work together.",
    synonyms: ["platitude", "cliche"],
  },
  brook: {
    sentence: "The college will brook no interference with its disciplinary policies.",
    synonyms: ["tolerate", "allow"],
  },
  buccaneer: {
    sentence: "The buccaneers who roamed the Spanish Main.",
    synonyms: ["pirate", "raider"],
  },
  buffonery: {
    sentence: "The buffoonery of the clown",
    synonyms: ["foolishness", "silliness"],
  },
  ariscrat: {
    sentence: "The aristocrats of the film industry",
    synonyms: ["noble", "upper class"],
  },
  arid: {
    sentence: "The arid desert",
    synonyms: ["dry", "barren"],
  },
  bulwark: {
    sentence: "The river is the city's bulwark against floods.",
    synonyms: ["fortification", "defense"],
  },
  bumbling: {
    sentence: "a bumbling waiter who kept forgetting to bring us silverware",
    synonyms: ["clumsy", "awkward"],
  },
  bumptious: {
    sentence: "a bumptious self-made millionaire who delighted in rubbing elbows with celebrities",
    synonyms: ["pompous", "arrogant"],
  },
  bungle: {
    sentence: "The government bungled badly in planning the campaign.",
    synonyms: ["botch", "blunder"],
  },
  buoyant: {
    sentence: "The cork was buoyant.",
    synonyms: ["float", "lively"],
  },
};


function Day5vocab() {
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
      <h3>DAY 05</h3>
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

export default Day5vocab;
