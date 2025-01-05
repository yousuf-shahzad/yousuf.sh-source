import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MafiaGame = () => {
  const [gameState, setGameState] = useState({
    isGameStarted: false,
    roles: [],
    currentPlayer: 0,
    totalPlayers: 0,
    currentRole: '',
    isGameFinished: false,
    showRole: false
  });

  const [formData, setFormData] = useState({
    players: '',
    mafia: '',
    sheriff: '',
    doctor: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const startGame = (e) => {
    e.preventDefault();
    
    let totalPlayers = parseInt(formData.players);
    let mafia = parseInt(formData.mafia);
    let sheriff = parseInt(formData.sheriff);
    let doctor = parseInt(formData.doctor);

    // Validate and adjust role counts
    if (mafia + sheriff + doctor > totalPlayers) {
      alert("Too many special roles! Adjusting to fit player count.");
      mafia = Math.min(mafia, totalPlayers);
      sheriff = Math.min(sheriff, totalPlayers - mafia);
      doctor = Math.min(doctor, totalPlayers - mafia - sheriff);
    }

    const innocents = totalPlayers - mafia - sheriff - doctor;
    
    // Generate and shuffle roles
    let roles = [
      ...Array(innocents).fill("Innocent"),
      ...Array(mafia).fill("Mafia"),
      ...Array(sheriff).fill("Sheriff"),
      ...Array(doctor).fill("Doctor")
    ];

    for (let i = roles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [roles[i], roles[j]] = [roles[j], roles[i]];
    }

    setGameState({
      isGameStarted: true,
      roles: roles,
      currentPlayer: 1,
      totalPlayers: totalPlayers,
      currentRole: roles[0],
      isGameFinished: false,
      showRole: true
    });
  };

  const displayNextRole = () => {
    if (gameState.currentPlayer < gameState.totalPlayers) {
      setGameState(prev => ({
        ...prev,
        currentPlayer: prev.currentPlayer + 1,
        currentRole: prev.roles[prev.currentPlayer],
        showRole: true
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        isGameFinished: true
      }));
    }
  };

  const clearCurrentRole = () => {
    setGameState(prev => ({
      ...prev,
      showRole: false
    }));
  };

  const restartGame = () => {
    setGameState({
      isGameStarted: false,
      roles: [],
      currentPlayer: 0,
      totalPlayers: 0,
      currentRole: '',
      isGameFinished: false,
      showRole: false
    });
    setFormData({
      players: '',
      mafia: '',
      sheriff: '',
      doctor: ''
    });
  };

  return (
    <motion.div 
      className="min-h-screen p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mafia Game Role Picker</h1>
        
        {!gameState.isGameStarted ? (
          <motion.form 
            onSubmit={startGame}
            className="space-y-6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="players" className="block text-sm font-medium text-gray-700">
                  Number of players:
                </label>
                <input
                  type="number"
                  id="players"
                  required
                  min="1"
                  value={formData.players}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              
              <div>
                <label htmlFor="mafia" className="block text-sm font-medium text-gray-700">
                  Number of mafia:
                </label>
                <input
                  type="number"
                  id="mafia"
                  required
                  min="0"
                  value={formData.mafia}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              
              <div>
                <label htmlFor="sheriff" className="block text-sm font-medium text-gray-700">
                  Number of sheriffs:
                </label>
                <input
                  type="number"
                  id="sheriff"
                  required
                  min="0"
                  value={formData.sheriff}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                  Number of doctors:
                </label>
                <input
                  type="number"
                  id="doctor"
                  required
                  min="0"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 transition"
            >
              Start Game
            </button>
          </motion.form>
        ) : (
          <motion.div 
            className="space-y-6 text-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            {!gameState.isGameFinished ? (
              <>
                <div className="text-2xl font-bold">Player {gameState.currentPlayer}</div>
                
                {gameState.showRole ? (
                  <div className="text-xl">Your role is: {gameState.currentRole}</div>
                ) : (
                  <div className="text-xl">Hand the device over to the next player</div>
                )}
                
                <div className="space-x-4">
                  <button
                    onClick={displayNextRole}
                    className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 transition"
                  >
                    Next Player
                  </button>
                  
                  <button
                    onClick={clearCurrentRole}
                    className="bg-gray-200 text-black rounded-md py-2 px-4 hover:bg-gray-300 transition"
                  >
                    Hide Role
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl">All roles have been assigned!</div>
                <button
                  onClick={restartGame}
                  className="bg-black text-white rounded-md py-2 px-4 hover:bg-gray-800 transition"
                >
                  Start New Game
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MafiaGame;