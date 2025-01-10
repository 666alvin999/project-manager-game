import {cva} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

import styles from "./styles.module.css";

const buttonVariants = cva(
    styles.button,
    {
        variants: {
            variant: {
                bug: styles.bug,
                feature: styles.feature,
                support: styles.support,
                technical: styles.technical,
            }
        }
    }
);

const Button = ({children, variant}) => {

    return (
        <button className={twMerge(buttonVariants({variant}))}>
            {children}
        </button>
    );

};

export default Button;