import React from 'react';
import './SynonymCards.css';

function SynonymCards({ synonyms, correctSynonyms, onCorrectSelection }) {
  const [clickedSynonyms, setClickedSynonyms] = React.useState({});

  const handleClick = (synonym) => {
    setClickedSynonyms({
      ...clickedSynonyms,
      [synonym]: correctSynonyms.includes(synonym),
    });

    if (correctSynonyms.includes(synonym)) {
      onCorrectSelection(synonym);
    }
  };

  return (
    <div className="synonym-cards">
      {synonyms.map((synonym, index) => (
        <div
          key={index}
          onClick={() => handleClick(synonym)}
          className={`synonym-card ${
            clickedSynonyms[synonym]
              ? "correct"
              : clickedSynonyms[synonym] === false
              ? "incorrect"
              : ""
          }`}
        >
          {synonym}
        </div>
      ))}
    </div>
  );
}



export default SynonymCards;
