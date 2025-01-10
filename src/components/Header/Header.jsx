import React from "react";

const Header = ({time, score}) => {

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div className="text-xl">
                Temps restant: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </div>
        </div>
    );

};

export default Header;