import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiComponent from "./components/ConfettiComponent/ConfettiComponent.jsx";
import confetti from "canvas-confetti";
import Success from "./components/Animations/Success.jsx";
import Error from "./components/Animations/Error.jsx";

const App = () => {
  const [score, setScore] = useState(100);
  const [time, setTime] = useState(300);
  const [tickets, setTickets] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scoreChange, setScoreChange] = useState(null);
  const [isStartScreenVisible, setIsStartScreenVisible] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

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

            if (correct) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 1000);
            } else {
                setShowError(true);
                setTimeout(() => setShowError(false), 1500);
            }
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
        <div className="w-full max-w-4xl mx-auto p-4">
            <Header score={score} time={time}/>


            <div className="grid grid-cols-1 gap-4">
                {/*<Ticket ticket={{id: 2, text: "text", urgent: false}} />*/}
                {
                    tickets.map(ticket =>
                        <Ticket ticket={ticket} handleClick={handleTicketClassification} />
                    )
                }
            </div>

            {gameOver && (
                <GameOver score={score}/>
            )}
        </div>
    );
};

export default App;
