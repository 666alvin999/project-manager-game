import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiComponent from "./components/ConfettiComponent/ConfettiComponent.jsx";
import confetti from "canvas-confetti";

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
        if (time > 0 && !gameOver) {
          setTime((prev) => prev - 1);
          if (Math.random() < 0.2) {
            addNewTicket();
          }
        } else {
          setGameOver(true);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, gameOver, isStartScreenVisible]);

  const handleTicketClassification = (ticketId, classifiedType) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (ticket) {
      const correct = ticket.type === classifiedType;

      if (correct) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 500);
      } else {
        triggerBadAnswerAnimation();
      }

      const change = correct ? 10 : -15;
      const urgent = ticket.urgent ? Math.abs(change) * 2 : Math.abs(change);
      const actualChange = correct ? urgent : -urgent;

      setScore((prev) => prev + actualChange);
      setScoreChange(actualChange);
      setTimeout(() => setScoreChange(null), 1000);

      setTickets((prev) => prev.filter((t) => t.id !== ticketId));
    }
  };

  const addNewTicket = () => {
    const generatedTicket = generateTicket();
    const newTicket = {
      id: Date.now(),
      ...generatedTicket,
      urgent: Math.random() < 0.3,
      priority: Math.floor(Math.random() * 3) + 1,
    };

    setTickets((prev) => [...prev, newTicket]);
  };

  const triggerBadAnswerAnimation = () => {
    const scalar = 2;
    const skull = confetti.shapeFromText({ text: "☠️", scalar });

    const defaults = {
      spread: 360,
      ticks: 120,
      gravity: 0,
      decay: 0.94,
      startVelocity: 10,
      shapes: [skull],
      scalar,
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
        flat: true,
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 250);
    setTimeout(shoot, 500);
  };

  const startGame = () => {
    setIsStartScreenVisible(false);
  };

  return (
      <div className="w-full max-w-4xl mx-auto p-4 relative h-auto">
        {/* Ecran de départ */}
        <AnimatePresence>
          {isStartScreenVisible && (
              <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-gray-700 text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-8">Tu veux devenir chef de projet ?</h1>
                  <motion.button
                      onClick={startGame}
                      className="px-8 py-4 bg-white text-gray-600 font-bold rounded-lg shadow-md hover:bg-gray-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                  >
                    Commencer
                  </motion.button>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu principal */}
        {!isStartScreenVisible && (
            <>
              <Header score={score} time={time} />

              {/* Animation du changement de score */}
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

              {/* Confetti */}
              <ConfettiComponent
                  trigger={showConfetti}
                  config={{
                    particleCount: 200,
                    spread: 100,
                    colors: ["#ff0000", "#00ff00", "#0000ff"],
                    shapes: ["circle", "square"],
                    origin: { x: 0.5, y: 0.5 },
                  }}
              />

              {/* Liste des tickets */}
              <div className="grid grid-cols-12 gap-4">
                <AnimatePresence>
                  {tickets.map((ticket) => (
                      <motion.div
                          key={ticket.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          className="col-span-4"
                      >
                        <Ticket
                            ticket={ticket}
                            handleClick={handleTicketClassification}
                        />
                      </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {gameOver && <GameOver score={score} />}
            </>
        )}
      </div>
  );
};

export default App;
