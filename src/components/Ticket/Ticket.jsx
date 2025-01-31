import React, { useMemo } from "react";
import Button from "../Button/Button.jsx";
import styles from "./styles.module.css";
import { ticketTypes as TicketTypes } from "/src/data.js";

const Ticket = ({ ticket, handleClick }) => {

    const generateTransparentWhite = () => {
        return `rgba(255, 255, 255, 0.8)`; // Blanc avec 80% d'opacité
    };

    const backgroundColor = useMemo(generateTransparentWhite, []);

    return (
        <div className={styles.ticket} style={{ backgroundColor }}>
            <div className={styles.content}>
                <p>{ticket.text}</p>
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    variant={"bug"}
                    onClick={handleClick}
                    ticketId={ticket.id}
                    type={TicketTypes.BUG}
                >
                    Bug
                </Button>
                <Button
                    variant={"feature"}
                    onClick={handleClick}
                    ticketId={ticket.id}
                    type={TicketTypes.FEATURE}
                >
                    Feature
                </Button>
                <Button
                    variant={"support"}
                    onClick={handleClick}
                    ticketId={ticket.id}
                    type={TicketTypes.SUPPORT}
                >
                    Support
                </Button>
                <Button
                    variant={"technical"}
                    onClick={handleClick}
                    ticketId={ticket.id}
                    type={TicketTypes.TECHNICAL}
                >
                    Technical
                </Button>
            </div>
        </div>
    );
};

export default Ticket;
