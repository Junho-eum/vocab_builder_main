import { useState, useEffect } from "react";
import "../App.css";
import SynonymCards from "../SynonymCards";
import anime from "animejs/lib/anime.es.js";

//Add Synonym picker to the game

const BlankSentences = {
  aloof: {
    sentence: "He stood aloof from the group.",
    synonyms: ["distant", "detached"],
  },
  chimera: {
    semtence: "This great love of hers is merely a chimera",
    synonyms: ["illusion", "delusion"],
  },
  choleric: {
    sentence: "Watch out for the choleric instructor at the reference deck.",
    synonyms: ["irritable", "grumpy"],
  },
  cicuitous: {
    sentence: "The route is circuitous, but we'll get there.",
    synonyms: ["indirect", "roundabout"],
  },
  circumlocution: {
    sentence: "His circumlocution is irritating.",
    synonyms: ["evasion", "indirectness"],
  },
  circumstantial: {
    sentence: "The evidence is circumstantial.",
    synonyms: ["incidental", "secondary"],
  },
  circumspect: {
    sentence: "The officials were very circumspect in their statements.",
    synonyms: ["cautious", "wary"],
  },
  circumscribe: {
    sentence: "The minister's powers are circumscribed by Parliament.",
    synonyms: ["restrict", "limit"],
  },
  clairvoyant: {
    sentence: "She is a clairvoyant who claims to be able to see the future.",
    synonyms: ["psychic", "seer"],
  },
  clandestine: {
    sentence: "They held a clandestine meeting.",
    synonyms: ["secret", "covert"],
  },
  clemency: {
    sentence: "The judge refused to show clemency.",
    synonyms: ["mercy", "leniency"],
  },
  clannish: {
    sentence: "The clannish atmosphere of the village.",
    synonyms: ["exclusive", "selective"],
  },
  clamor: {
    sentence: "The questions rose to a clamor.",
    synonyms: ["uproar", "din"],
  },
  cliquish: {
    sentence: "Peer interaction often play out in cliquish groups.",
    synonyms: ["exclusive", "selective"],
  },
  clot: {
    sentence: "A clot of blood.",
    synonyms: ["lump", "mass"],
  },
  clout: {
    sentence: "The mayor used his clout to get his son a summer job.",
    synonyms: ["influence", "power"],
  },
  coagulate: {
    sentence: "The blood coagulates into a semisolid mass.",
    synonyms: ["clot", "congeal"],
  },
  coalesce: {
    sentence: "The puddles had coalesced into shallow streams.",
    synonyms: ["combine", "unite"],
  },
  coax: {
    sentence: "He coaxed Her into doing the dance with him.",
    synonyms: ["persuade", "cajole"],
  },
  coddle: {
    sentence: "She coddles the children.",
    synonyms: ["pamper", "spoil"],
  },
  codify: {
    sentence: "The convention codified the rules of war.",
    synonyms: ["systematize", "arrange"],
  },
  coerce: {
    sentence: "They were coerced into silence.",
    synonyms: ["force", "compel"],
  },
  cogent: {
    sentence: "They put forward cogent arguments for British membership.",
    synonyms: ["convincing", "compelling"],
  },
  cognizant: {
    sentence: "Statesmen must be cognizant of the political boundaries within which they work.",
    synonyms: ["aware", "conscious"],
  },
  collegiality: {
    sentence: "The collegiality of the faculty.",
    synonyms: ["collegial", "collegiate"],
  },
  collude: {
    sentence: "The president accused two cabinet members of colluding with the enemy.",
    synonyms: ["conspire", "plot"],
  },
  comestible: {
    sentence: "The comestible parts of a plant.",
    synonyms: ["food", "edible"],
  },
  comity: {
    sentence: "The comity of nations.",
    synonyms: ["courtesy", "civility"],
  },
  commend: {
    sentence: "The judge commended her for bravery.",
    synonyms: ["praise", "applaud"],
  },
  commiserate: {
    sentence: "She went over to commiserate with Rose on her unfortunate circumstances.",
    synonyms: ["sympathize", "console"],
  },
  commodious: {
    sentence: "A commodious closet for storage.",
    synonyms: ["spacious", "roomy"],
  },
  commonplace: {
    sentence: "The idea that the Earth is round is now commonplace.",
    synonyms: ["ordinary", "everyday"],
  },
  commotion: {
    sentence: "The commotion caused by the incident.",
    synonyms: ["disturbance", "uproar"],
  },
  compartmentalize: {
    sentence: "The human mind seems to be compartmentalized.",
    synonyms: ["separate", "divide"],
  },
  compendious: {
    sentence: "A compendious dictionary.",
    synonyms: ["concise", "succinct"],
  },
  complacency: {
    sentence: "The public was lulled into complacency.",
    synonyms: ["smugness", "self-satisfaction"],
  },
  complaisance: {
    sentence: "The complaisance of the hostess.",
    synonyms: ["amenable", "eagerness"],
  },
  complexion: {
    sentence: "The complexion of the neighborhood.",
    synonyms: ["character", "nature"],
  },
  composure: {
    sentence: "She struggled to maintain her composure.",
    synonyms: ["calmness", "equanimity"],
  },
  compunction: {
    sentence: "He felt compunction for his actions.",
    synonyms: ["remorse", "regret"],
  },
  comradeship: {
    sentence: "The comradeship of soldiers in the trenches.",
    synonyms: ["friendship", "camaraderie"],
  },
  concave: {
    sentence: "A concave lens.",
    synonyms: ["hollow", "sunken"],
  },
  concerted: {
    sentence: "A concerted effort to improve the situation.",
    synonyms: ["joint", "combined"],
  },
  conciliatory: {
    sentence: "A conciliatory approach.",
    synonyms: ["appeasing", "placatory"],
  },
  concomitant: {
    sentence: "The social stresses of unemployment and its concomitant ill effects.",
    synonyms: ["accompanying", "attendant"],
  },
  condign: {
    sentence: "He got his condign punishment.",
    synonyms: ["deserved", "appropriate"],
  },
  condole: {
    sentence: "She condoled with the widow.",
    synonyms: ["sympathize", "condolescence"],
  },
  condone: {
    sentence: "The college cannot condone any behavior that involves illicit drugs.",
    synonyms: ["overlook", "excuse"],
  },
  conducive: {
    sentence: "The harsh lights and cameras were hardly conducive to a relaxed atmosphere.",
    synonyms: ["favorable", "beneficial"],
  },
  confluence: {
    sentence: "A happy confluence of weather and scenery.",
    synonyms: ["meeting", "junction"],
  },
  confound: {
    sentence: "Last ground double play confounded the team.",
    synonyms: ["thwart", "frustrate"],
  },
  congeal: {
    sentence: "The blood had congealed into blobs.",
    synonyms: ["coagulate", "clot"],
  },
  congenial: {
    sentence: "His need for some congenial company.",
    synonyms: ["friendly", "amiable"],
  },
  congenital: {
    sentence: "A congenital heart defect.",
    synonyms: ["inborn", "inherent"],
  },
  congruent: {
    sentence: "The two triangles are congruent.",
    synonyms: ["identical", "equal"],
  },
};


function Day8vocab() {
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

export default Day8vocab;
