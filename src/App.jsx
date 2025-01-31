import React, { useEffect, useState, useRef } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiComponent from "./components/ConfettiComponent/ConfettiComponent.jsx";
import confetti from "canvas-confetti";
import * as Tone from "tone";


const App = () => {
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(300);
  const [tickets, setTickets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scoreChange, setScoreChange] = useState(null);
  const [isStartScreenVisible, setIsStartScreenVisible] = useState(true);

  useEffect(() => {
    if (!isStartScreenVisible) {
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev > 0 && score > -20 && !gameOver) {
            if (Math.random() < 0.2) addNewTicket();
            return prev - 1;
          }
          setGameOver(true);
          return prev;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [score, gameOver, isStartScreenVisible]);

  useEffect(() => {
    if (gameOver) {
      const player = new Tone.Player({
        url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
        loop: true,
        autostart: true,
      });
      const distortion = new Tone.Distortion(0.4).toDestination();
      player.connect(distortion);
    }
  }, [gameOver]);

  const handleTicketClassification = (ticketId, classifiedType) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;
    
    const correct = ticket.type === classifiedType;
    correct ? playWinSound() : playLoseSound();
    
    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 500);
    } else {
      triggerBadAnswerAnimation();
    }

    const change = correct ? 10 : -15;
    const urgent = ticket.urgent ? Math.abs(change) * 2 : Math.abs(change);
    const actualChange = correct ? urgent : -urgent;

    setScore((prev) => {
      const newScore = prev + actualChange;
      if (newScore <= -20) setGameOver(true);
      return newScore;
    });
    
    setScoreChange(actualChange);
    setTimeout(() => setScoreChange(null), 1000);
    
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
  };

  const addNewTicket = () => {
    setTickets((prev) => [...prev, { id: Date.now(), ...generateTicket(), urgent: Math.random() < 0.3 }]);
  };

  const triggerBadAnswerAnimation = () => {
    const skull = confetti.shapeFromText({ text: "☠️", scalar: 2 });
    confetti({
      particleCount: 30,
      spread: 360,
      shapes: [skull],
    });
  };

  const playWinSound = () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C5", "8n");
  };

  const playLoseSound = () => {
    const synth = new Tone.FMSynth().toDestination();
    synth.triggerAttackRelease("G2", "8n");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative h-auto">
      <AnimatePresence>
        {isStartScreenVisible && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}>
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-8">Prêt à gérer des projets ?</h1>
              <motion.button onClick={() => setIsStartScreenVisible(false)}
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg shadow-lg transition"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Commencer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isStartScreenVisible && !gameOver && (
        <>
          <Header score={score} time={time} />
          <AnimatePresence>
            {scoreChange !== null && (
              <motion.div
                key="scoreChange"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 25 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-xl font-bold ${
                  scoreChange > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {scoreChange > 0 ? `+${scoreChange}` : `${scoreChange}`}
              </motion.div>
            )}
          </AnimatePresence>
          <ConfettiComponent trigger={showConfetti} config={{ particleCount: 200, spread: 100 }} />
          <div className="grid grid-cols-12 gap-4">
            <AnimatePresence>
              {tickets.map((ticket) => (
                <motion.div key={ticket.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }} className="col-span-4">
                  <Ticket ticket={ticket} handleClick={handleTicketClassification} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
      {gameOver && <GameOver score={score} message="Oups, la gestion de projet est plus dure que prévu..." buttonText="Réessayer" background="bg-red-800" />}
    </div>
  );
};

export default App;
