import React from "react";

const GameOver = ({score}) => {

    return (
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
    );

};

export default GameOver;