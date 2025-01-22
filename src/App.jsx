import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import ConfettiComponent from './components/ConfettiComponent/ConfettiComponent.jsx';
import ContinuousConfetti from "./components/ContinuousConfetti/ContinuousConfetti.jsx";
const App = () => {
    const [score, setScore] = useState(100);
    const [time, setTime] = useState(300);
    const [tickets, setTickets] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // State for confetti trigger

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0 && !gameOver) {
                setTime(prev => prev - 1);

                if (Math.random()) {
                    addNewTicket();
                }
            } else {
                setGameOver(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [time, gameOver]);

    const handleTicketClassification = (ticketId, classifiedType) => {
        const ticket = tickets.find(t => t.id === ticketId);

        if (ticket) {
            const correct = ticket.type === classifiedType;

            if (correct) {
                // Show confetti only on correct answer
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
            }

            setScore(prev => {
                const change = correct ? 10 : -15;
                const urgent = ticket.urgent ? Math.abs(change) * 2 : Math.abs(change);

                return prev + (correct ? urgent : -urgent);
            });

            setTickets(prev => prev.filter(t => t.id !== ticketId));
        }
    };

    const addNewTicket = () => {
        const generatedTicket = generateTicket();
        const newTicket = {
            id: Date.now(),
            ...generatedTicket,
            urgent: Math.random() < 0.3,
            priority: Math.floor(Math.random() * 3) + 1
        };

        setTickets(prev => [...prev, newTicket]);
    };

    return (
        <>
            <ContinuousConfetti />
            <ConfettiComponent
                trigger={showConfetti} // Confetti triggers on correct answer
                config={{
                    particleCount: 200,
                    spread: 100,
                    colors: ["#ff0000", "#00ff00", "#0000ff"],
                    shapes: ["circle", "square"],
                    origin: { x: 0.5, y: 0.5 },
                }}
            />
            <div className="w-full max-w-4xl mx-auto p-4">
                <Header score={score} time={time} />

                <div className="grid grid-cols-1 gap-4">
                    {tickets.map(ticket =>
                        <Ticket key={ticket.id} ticket={ticket} handleClick={handleTicketClassification} />
                    )}
                </div>

                {gameOver && (
                    <GameOver score={score} />
                )}
            </div>
        </>
    );
};

export default App;
