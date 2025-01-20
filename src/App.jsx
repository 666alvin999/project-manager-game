import React, { useEffect, useState } from "react";
import { generateTicket } from "./data.js";
import Header from "./components/Header/Header.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Ticket from "./components/Ticket/Ticket.jsx";
import Success from "./components/Animations/Success.jsx";
import Error from "./components/Animations/Error.jsx";

const App = () => {
    const [score, setScore] = useState(100);
    const [time, setTime] = useState(300);
    const [tickets, setTickets] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0 && !gameOver) {
                setTime(prev => prev - 1);

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
        const ticket = tickets.find(t => t.id === ticketId);

        if (ticket) {
            const correct = ticket.type === classifiedType;

            setScore(prev => {
                const change = correct ? 10 : -15;
                const urgent = ticket.urgent ? Math.abs(change) * 2 : Math.abs(change);

                return prev + (correct ? urgent : -urgent);
            });

            setTickets(prev => prev.filter(t => t.id !== ticketId));

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
            priority: Math.floor(Math.random() * 3) + 1
        };

        setTickets(prev => [...prev, newTicket]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Header score={score} time={time} />

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {showSuccess && <Success />}
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {showError && <Error />}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {tickets.map(ticket => (
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
