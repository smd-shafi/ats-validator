import React, { useEffect, useRef } from "react";
import ProgressBar from "progressbar.js";

const ScoreCircularBar = ({ value, size = 200,}) => {
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    barRef.current = new ProgressBar.SemiCircle(containerRef.current, {
      strokeWidth: 6,
      color: "#FFEA82",
      trailColor: "#eee",
      trailWidth: 1,
      easing: "easeInOut",
      duration: 1400,
      svgStyle: null,
      text: {
        value: "",
        alignToBottom: false,
      },
      from: { color: "#FF0000" }, 
      to: { color: "#00FF00" },   
      step: (state, bar) => {
        bar.path.setAttribute("stroke", state.color);
        const valuePercent = Math.round(bar.value() * 100);
        if (valuePercent === 0) {
          bar.setText("");
        } else {
          bar.setText(`${valuePercent}%`);
        }
        bar.text.style.color = state.color;
      },
    });


    barRef.current.text.style.fontFamily = '"Poppins", Helvetica, sans-serif';
    barRef.current.text.style.fontSize = "1.5rem";
    barRef.current.text.style.fontWeight = "600";
    barRef.current.text.style.position = "absolute";
    barRef.current.text.style.top = "55%";
    barRef.current.text.style.left = "50%";
    barRef.current.text.style.transform = "translate(-50%, -50%)";

    // Animate to given value
    barRef.current.animate(value);

    return () => {
      barRef.current.destroy();
    };
  }, [value]);

  return (
    <div
      id="scoreBar"
      ref={containerRef}
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size / 2}px`,
      }}
    />
  );
};

export default ScoreCircularBar;
