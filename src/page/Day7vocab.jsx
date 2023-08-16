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
  abeyance: {
    sentence:
      "Our weekend plans were held in abeyance until we could get a weather report.",
    synonyms: ["suspension", "deferment"],
  },
  abjure: {
    sentence: "He abjured his religion and became an atheist.",
    synonyms: ["renounce", "reject"],
  },
  abrogate: {
    sentence: "The government cannot abrogate our right to a free press.",
    synonyms: ["nullify", "repudiate"],
  },
  abrade: {
    sentence: "The rough rocks abraded the skin on her legs.",
    synonyms: ["erode", "eat away"],
  },
  abreast: {
    sentence: "They try to keep abreast of current affairs.",
    synonyms: ["up to data with", "side by side"],
  },
  abridge: {
    sentence:
      "The editor abridged the manuscript by cutting out unnecessary words.",
    synonyms: ["shorten", "cut"],
  },
  acquit: {
    sentence: "The jury acquitted him of all charges.",
    synonyms: ["exonerate", "discharge"],
  },
  acrimonious: {
    sentence: "The acrimonious debate about the budget went on all night.",
    synonyms: ["angry", "acerbic"],
  },
  acute: {
    sentence: "The acute pain in her chest made her go to the doctor.",
    synonyms: ["severe", "intense"],
  },
  adamant: {
    sentence: "He was adamant that he would not smoke cigs again.",
    synonyms: ["unyielding", "inflexible"],
  },
  adage: {
    sentence: "The old adage 'every cloud has a silver lining' is often true.",
    synonyms: ["aphorism", "proverb"],
  },
  adduce: {
    sentence: "He adduced evidence to prove his innocence.",
    synonyms: ["cite", "quote"],
  },
  adept: {
    sentence: "She is adept at cutting through red tape.",
    synonyms: ["proficient", "accomplished"],
  },
  admonish: {
    sentence: "The teacher admonished the students to stop talking.",
    synonyms: ["reprimand", "scold"],
  },
  adulterate: {
    sentence: "The company was accused of adulterating its products.",
    synonyms: ["contaminate", "pollute"],
  },
  adumbrate: {
    sentence:
      "The report adumbrates the main economic consequences of climate change.",
    synonyms: ["outline", "sketch"],
  },
  affable: {
    sentence: "He is an etremely affable and approachable man.",
    synonyms: ["friendly", "amiable"],
  },
  affect: {
    sentence: "He affected a British accent.",
    synonyms: ["pretend", "feign"],
  },
  affiliate: {
    sentence: "The company is affiliated with a number of organizations.",
    synonyms: ["associate", "ally"],
  },
  affinity: {
    sentence: "I have an affinity for the music of the 1960s.",
    synonyms: ["fondness", "liking"],
  },
  afflict: {
    sentence: "He was afflicted with a skin disease.",
    synonyms: ["trouble", "distress"],
  },
  affront: {
    sentence: "He was affronted by her insult.",
    synonyms: ["offend", "insult"],
  },
  aggrandize: {
    sentence:
      "He is trying to aggrandize himself by claiming that he is the best.",
    synonyms: ["exaggerate", "overstate"],
  },
  aggravate: {
    sentence: "The symptoms were aggravated by drinking alcohol.",
    synonyms: ["worsen", "exacerbate"],
  },
  aggrieved: {
    sentence: "The aggrieved party filed a lawsuit.",
    synonyms: ["wronged", "injured"],
  },
  agitate: {
    sentence: "The union is agitating for better health and safety conditions.",
    synonyms: ["campaign", "protest"],
  },
  agog: {
    sentence: "The children were agog at the prospect of a trip to Disneyland.",
    synonyms: ["excited", "eager"],
  },
  ailing: {
    sentence: "The ailing economy of the country.",
    synonyms: ["sickly", "unwell"],
  },
  airtight: {
    sentence: "The case against him is airtight.",
    synonyms: ["watertight", "sound"],
  },
  alacrity: {
    sentence: "She accepted the invitation with alacrity.",
    synonyms: ["eagerness", "enthusiasm"],
  },
  albeit: {
    sentence: "The evening was very pleasant, albeit a little quiet.",
    synonyms: ["although", "even though"],
  },
  allay: {
    sentence:
      "The government is trying to allay public fears/concerns about the spread of the disease.",
    synonyms: ["reduce", "relieve"],
  },
  alloy: {
    sentence: "The metal is an alloy of copper and tin.",
    synonyms: ["mixture", "blend"],
  },
  allude: {
    sentence: "She only alluded to the problem.",
    synonyms: ["refer to", "suggest"],
  },
  allusive: {
    sentence:
      "The film is highly allusive, with references to Godard, Fellini, and Bergman.",
    synonyms: ["suggestive", "implied"],
  },
  aloof: {
    sentence: "He stood aloof from the group.",
    synonyms: ["distant", "detached"],
  },
};


function Day7vocab() {
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
      <h3>DAY 01</h3>
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

export default Day7vocab;
