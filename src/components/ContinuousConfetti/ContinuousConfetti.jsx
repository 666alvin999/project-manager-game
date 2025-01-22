import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ContinuousConfetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true, // Ajuste la taille du canvas à son conteneur
        useWorker: true, // Améliore les performances
      });

      const duration = 4 * 1000; // Durée de l'animation (15 secondes)
      const animationEnd = Date.now() + duration;
      let skew = 1;

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        myConfetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            y: (Math.random() * skew) - 0.2, // Particles skew toward the top
          },
          colors: ['#010101'], // Couleur des particules
          shapes: ['circle'], // Forme des particules
          gravity: randomInRange(0.4, 0.6), // Gravité des particules
          scalar: randomInRange(0.4, 0.5), // Taille des particules
          drift: randomInRange(-0.4, 0.4), // Déviation horizontale
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      }

      // Démarrer l'animation
      frame();
    }
  }, []); // Exécuter une seule fois lors du montage

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // Assure que le canvas ne bloque pas les interactions utilisateur
        zIndex: 9999, // Place le canvas au-dessus des autres éléments
      }}
    />
  );
};

export default ContinuousConfetti;
