import React from "react";
import { motion } from "framer-motion";

const GameOver = ({ score }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0  bg-opacity-75 flex items-center justify-center h-[100vh] "
        >
            <div className="text-center bg-white p-8 rounded shadow-lg mt-40">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h1>
                <p className="text-xl mb-4">Vous avez dépassez -20 <br></br> <span className="font-bold">{score}</span></p>
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
