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
  dilapidated: {
    sentence:"The house was in a dilapidated condition.",
    synonyms: ["다부서져가는", "쇠약해진"],
  },
  disperate: {
    sentence: "The two cultures were so disparate that she found it hard to adapt from one to the other.",
    synonyms: ["별개의", "이질적인"],
  },
  apothegm: {
    sentence: "The apothegm, 'If it ain't broke, don't fix it,' is a useful one to keep in mind when making changes to a successful product.",
    synonyms: ["격언", "명언"],
  },
  transmute: {
    sentence: "The alchemist believed that he could transmute lead into gold.",
    synonyms: ["변형시키다", "변화시키다"],
  },
  dispatch: {
    sentence: "She finished her thesis with dispatch, still managing to produce a well-written paper despite the time crunch.",
    synonyms: ["신속함", "빠른"],
  },
  sagacious: {
    sentence: "Steve Jobs is surely one of the most sagacious CEOs of our time.",
    synonyms: ["현명한", "지혜로운"],
  },
  smug: {
    sentence: "The smug look on his face told me that he was very pleased with himself.",
    synonyms: ["자만심 있는", "자기만족의"],
  },
  deride: {
    sentence: "The critics derided the new movie, calling it a predictable and poorly-acted remake.",
    synonyms: ["조롱하다", "비웃다"],
  },
  ostracize: {
    sentence:"Later in his lif, Leo Tolstoy was ostracized by the Russian Orthodox Church for his radical views.",
    synonyms: ["추방하다", "퇴출하다"],
  },
  halcyon: {
    sentence: "The first few years of their marriage were a halcyon period of happiness.",
    synonyms: ["평온한", "평화로운"],
  },
  noisome: {
    sentence: "The noisome odor emanating from the garbage can made me gag.",
    synonyms: ["악취가 나는", "불쾌한"],
  },
  dolorous: {
    sentence: "The dolorous look on her face told me that she was still grieving for her lost husband.",
    synonyms: ["슬픈", "비통한"],
  },
  frustrate: {
    sentence: "I thought I would finish writing the paper by noon, but a number of urgent interruptions served to frustrate my plan.",
    synonyms: ["막다", "좌담시키다"],
  },
  solicitude: {
    sentence: "The mother's solicitude for her children was evident in her constant worrying about their safety.",
    synonyms: ["걱정", "관심"],
  },
  tribulation: {
    sentence: "The tribulations of the Great Depression were felt worldwide.",
    synonyms: ["고난", "시련"],
  },
  countermand: {
    sentence: "The general countermanded the order to retreat.",
    synonyms: ["취소하다", "무효로 하다"],
  },
  precipitate: {
    sentence: "The general's precipitate decision to retreat led to the capture of his army.",
    synonyms: ["급한", "촉발시키다"],
  },
  sardonic: {
    sentence: "The sardonic tone of his voice made it clear that he was not joking.",
    synonyms: ["냉소적인", "조롱하는"],
  },
  chimera: {
    sentence: "The idea that I would one day be a famous movie star was merely a chimera.",
    synonyms: ["망상", "허망한 생각"],
  },
  anemic: {
    sentence: "The anemic sales of the company's newest product were a disappointment.",
    synonyms: ["빈약한", "무기력한"],
  },
  belligerent: {
    sentence: "The belligerent tone of his voice made it clear that he was not joking.",
    synonyms: ["호전적인", "싸우기 좋아하는"],
  },
  hauteur: {
    sentence: "The hauteur of the famous actress was evident in the way she treated her fans.",
    synonyms: ["거만함", "오만함"],
  },
  ethereal: {
    sentence: "The ethereal beauty of the ballerina was breathtaking.",
    synonyms: ["매우 섬세한", "하늘의 세계의"],
  },
  eclectic: {
    sentence: "The restaurant's menu was eclectic, offering everything from hamburgers to sushi.",
    synonyms: ["다방면의", "다양한"],
  },
  exasperate: {
    sentence: "The child's constant whining exasperated his mother.",
    synonyms: ["화나게 하다", "성나게 하다"],
  },
  complacement: {
    sentence: "The complacent attitude of the voters was evident in the low turnout on election day.",
    synonyms: ["자기만족의", "현실감각이 없는"],
  },
  imperious: {
    sentence: "The imperious tone of the dictator's voice made it clear that he would brook no argument.",
    synonyms: ["고압적인", "오만한"],
  },
  inundate: {
    sentence: "The office was inundated with requests for information.",
    synonyms: ["범람시키다", "넘쳐흐르게 하다"],
  },
  involved: {
    sentence: "The instructions for assembling the model airplane were so involved that I gave up.",
    synonyms: ["복잡한", "난해한"],
  },
  retiring: {
    sentence: "The retiring nature of the new employee made it difficult for her to make friends.",
    synonyms: ["수줍어하는", "내성적인"],
  },
  mellifluous: {
    sentence: "The mellifluous tones of the violinist were a delight to the ears.",
    synonyms: ["달콤한", "유혹적인"],
  },
  imponderable: {
    sentence: "The imponderable nature of the question made it difficult to answer.",
    synonyms: ["가늠키 어려운", "무거운"],
  },
  impecunious: {
    sentence: "The impecunious nature of the young couple made it difficult for them to buy a house.",
    synonyms: ["가난한", "빈곤한"],
  },
  malfeasance: {
    sentence: "The mayor was accused of malfeasance in office.",
    synonyms: ["부정행위", "불법행위"],
  },
  fledgling: {
    sentence: "The fledgling company was having difficulty attracting investors.",
    synonyms: ["새끼", "풋내기"],
  },
  serendipitous: {
    sentence: "The discovery of penicillin was a serendipitous accident.",
    synonyms: ["우연한 발견", "행운"],
  },
  percipient: {
    sentence: "The child's percipient observation of the situation surprised the adults.",
    synonyms: ["지각하는", "통찰력 있는"],
  },
  tempered: {
    sentence: "The wide-eyed optimism of her youth was now tempered by realism.",
    synonyms: ["완화된", "완만한"],
  },
  untenable: {
    sentence: "The theory that the earth is flat is untenable in the face of modern scientific evidence.",
    synonyms: ["지지할 수 없는", "방어할 수 없는"],
  },
  punctilious: {
    sentence: "The punctilious nature of the accountant made him well-suited to his job.",
    synonyms: ["규칙을 엄격히 지키는", "꼼꼼한"],
  },
  patent: {
    sentence: " Since the book had been through now fewer than si proff runs, the staff was shocked to see a patent error in the first sentence.",
    synonyms: ["명백한", "뻔한"],
  },
  pundit: {
    sentence: "Steven Pinker's credentials are unquestioned as a pundit on the subject of linguistics.",
    synonyms: ["전문가", "권위자"],
  },
  encumber: {
    sentence: "The costume encumbered all my movements and caused me to trip and fall.",
    synonyms: ["방해하다", "폐를 끼치다"],
  },
  exalt: {
    sentence: "The king exalted his favorite courtier by making him a duke.",
    synonyms: ["칭찬하다", "높이다"],
  },
  assuage: {
    sentence: "The mother tried to assuage her child's fears.",
    synonyms: ["진정시키다", "완화시키다"],
  },
};


function Day14vocab() {
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
      <h3>intermed6-Magoosh</h3>
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

export default Day14vocab;
