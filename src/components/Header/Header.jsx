import React from "react";
import { motion } from "framer-motion";

const Header = ({ time, score }) => {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toString().padStart(2, "0");

  const scoreColor = score >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col items-center justify-center mb-8 text-center">
      {/* Score */}
      <div className="text-4xl bg-white p-8 font-extrabold text-gray-800 tracking-wide mb-6">
        <span className="block text-gray-500 text-lg">Ton score</span>
        <motion.span
          key={score}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={scoreColor}
        >
          {score}
        </motion.span>
      </div>

      {/* Temps restant */}
      <div className="relative flex items-center justify-center -6 py-4 rounded-sm shadow-lg ">
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 rounded-sm opacity-20 "
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        <div className="flex items-baseline gap-1 text-white z-10">
          {/* Animation pour les minutes */}
          <motion.span
            key={minutes}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-mono font-bold drop-shadow-md"
          >
            {minutes}
          </motion.span>
          <span className="text-5xl font-mono font-bold drop-shadow-md">:</span>
          {/* Animation pour les secondes */}
          <motion.span
            key={seconds}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-mono font-bold drop-shadow-md"
          >
            {seconds}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Header;
