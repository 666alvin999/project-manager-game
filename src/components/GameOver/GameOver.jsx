import React from "react";
import { motion } from "framer-motion";

const GameOver = ({ score }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        >
            <div className="text-center bg-white p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h1>
                <p className="text-xl mb-4">
                    Vous avez dépassé -20 <br />
                    <span className="font-bold">{score}</span>
                </p>
                <button
                    onClick={() => window.location.reload()} // Recharger la page pour redémarrer
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Rejouer
                </button>
            </div>
        </motion.div>
    );
};

export default GameOver;
