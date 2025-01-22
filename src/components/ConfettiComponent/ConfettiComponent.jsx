import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiComponent = ({ trigger, config }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true, // Make the canvas resize to its container
        useWorker: true, // Improves performance
      });

      if (trigger) {
        // Fire the confetti with provided configuration or default values
        myConfetti({
          particleCount: config?.particleCount || 100,
          spread: config?.spread || 70,
          origin: config?.origin || { x: 0.5, y: 0.5 },
          angle: config?.angle || 90,
          scalar: config?.scalar || 1,
          colors: config?.colors || ["#bb0000", "#ffffff"],
          shapes: config?.shapes || ["circle"],
        });
      }
    }
  }, [trigger, config]); // Run effect when 'trigger' or 'config' changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // Ensure canvas doesn't block user interactions
        zIndex: 9999, // Ensure the confetti is rendered on top
      }}
    />
  );
};

export default ConfettiComponent;
