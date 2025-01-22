import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(300);
  const [tickets, setTickets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [scoreChange, setScoreChange] = useState(null); // Nouvel état pour le changement temporaire du score

  useEffect(() => {
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
  }, [time, gameOver]);

  const handleTicketClassification = (ticketId, classifiedType) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (ticket) {
      const correct = ticket.type === classifiedType;

      const change = correct ? 10 : -15;
      const urgent = ticket.urgent ? Math.abs(change) * 2 : Math.abs(change);

      const actualChange = correct ? urgent : -urgent;

      setScore((prev) => prev + actualChange);

      // Déclencher l'animation du changement de score
      setScoreChange(actualChange);
      setTimeout(() => setScoreChange(null), 1000); // Effacer après 1 seconde

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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative">
      <Header score={score} time={time} />

      {/* Animation du changement de score */}
      <AnimatePresence>
        {scoreChange !== null && (
          <motion.div
            key="scoreChange"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-10 left-1/2 transform -translate-x-1/2 text-xl font-bold ${
              scoreChange > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {scoreChange > 0 ? `+${scoreChange}` : `${scoreChange}`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            handleClick={handleTicketClassification}
          />
        ))}
      </div>

      {gameOver && <GameOver score={score} />}
    </div>
  );
};

export default App;
