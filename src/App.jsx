import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Clock, X } from 'lucide-react';

const App = () => {
    const [score, setScore] = useState(100);
    const [time, setTime] = useState(300); // 5 minutes in seconds
    const [tickets, setTickets] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const ticketTypes = {
        BUG: 'bug',
        FEATURE: 'feature',
        SUPPORT: 'support',
        TECHNICAL: 'technical'
    };

    const ticketGenerator = {
        actors: ['Utilisateur', 'Admin', 'Client', 'Manager', 'Développeur'],
        actions: {
            bug: ['ne peut pas accéder à', 'rencontre une erreur sur', 'voit un bug dans', 'est bloqué sur'],
            feature: ['souhaite pouvoir', 'aimerait avoir', 'demande à pouvoir', 'propose d\'ajouter'],
            support: ['demande comment', 'a besoin d\'aide pour', 'cherche à comprendre', 'souhaite savoir'],
            technical: ['signale des lenteurs sur', 'remarque des timeouts sur', 'observe des erreurs dans', 'note des problèmes de performance sur']
        },
        contexts: ['le dashboard', 'la page de profil', 'le système de login', 'les rapports', 'la gestion des utilisateurs', 'l\'interface d\'administration'],
        values: ['pour gagner du temps', 'pour améliorer la productivité', 'pour une meilleure expérience', 'car c\'est crucial pour son travail'],
        problems: ['ça ne répond pas', 'ça plante régulièrement', 'l\'interface est confuse', 'les données sont incorrectes']
    };

    const generateTicket = () => {
        const actor = ticketGenerator.actors[Math.floor(Math.random() * ticketGenerator.actors.length)];
        const type = Object.keys(ticketTypes)[Math.floor(Math.random() * Object.keys(ticketTypes).length)];
        const context = ticketGenerator.contexts[Math.floor(Math.random() * ticketGenerator.contexts.length)];
        const value = ticketGenerator.values[Math.floor(Math.random() * ticketGenerator.values.length)];
        const actions = ticketGenerator.actions[type.toLowerCase()];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const problem = ticketGenerator.problems[Math.floor(Math.random() * ticketGenerator.problems.length)];

        let text = '';
        switch(type) {
            case 'BUG':
                text = `${actor} ${action} ${context} : ${problem}`;
                break;
            case 'FEATURE':
                text = `${actor} ${action} ${context} ${value}`;
                break;
            case 'SUPPORT':
                text = `${actor} ${action} ${context}`;
                break;
            case 'TECHNICAL':
                text = `${actor} ${action} ${context}`;
                break;
            default:
                text = `${actor} ${action} ${context}`;
        }

        return {
            text,
            type: ticketTypes[type],
            ambiguous: Math.random() > 0.7,
            complexity: Math.floor(Math.random() * 5) + 1
        };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0 && !gameOver) {
                setTime(prev => prev - 1);
                if (Math.random() < 0.2) { // 20% chance each second
                    addNewTicket();
                }
            } else {
                setGameOver(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [time, gameOver]);

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
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">Score: {score}</div>
                <div className="text-xl">
                    Temps restant: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {tickets.map(ticket => (
                    <Card key={ticket.id} className="bg-white shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-lg font-medium mb-2">{ticket.text}</p>
                                    {ticket.urgent && (
                                        <Badge className="bg-red-500">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            Urgent
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.BUG)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Bug
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.FEATURE)}
                                        className="bg-green-500 hover:bg-green-600"
                                    >
                                        Feature
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.SUPPORT)}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        Support
                                    </Button>
                                    <Button
                                        onClick={() => handleTicketClassification(ticket.id, ticketTypes.TECHNICAL)}
                                        className="bg-yellow-500 hover:bg-yellow-600"
                                    >
                                        Technical
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {gameOver && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="p-6 text-center">
                        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                        <p className="text-xl mb-4">Score final : {score}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 hover:bg-blue-600"
                        >
                            Rejouer
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default App;