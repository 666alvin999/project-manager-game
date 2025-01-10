import React from "react";
import Button from "../Button/Button.jsx";

import styles from "./styles.module.css";

const Ticket = (ticket) => {

    return (
        <div>
            <div className={styles.buttonContainer}>
                <Button variant={"bug"}>
                    Bug
                </Button>
                <Button variant={"feature"}>
                    Feature
                </Button>
                <Button variant={"support"}>
                    Support
                </Button>
                <Button variant={"technical"}>
                    Technical
                </Button>
            </div>
            <p></p>
        </div>
    );

};

export default Ticket;