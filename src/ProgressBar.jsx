// ProgressBar.js
import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const ProgressBar = ({ percentage, color }) => {
  const progressBarRef = React.useRef(null);

  useEffect(() => {
    anime({
      targets: progressBarRef.current,
      width: `${percentage}%`,
      backgroundColor: color,
      easing: "easeInOutExpo",
      round: 1,
    });
  }, [percentage, color]);

  return <div ref={progressBarRef} className="progress-bar" />;
};

export default ProgressBar;
