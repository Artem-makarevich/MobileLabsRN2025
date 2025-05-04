
import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState({
    tap: 0,
    doubleTap: 0,
    longPress: false,
    pan: false,
    swipeRight: false,
    swipeLeft: false,
    pinch: false,
    score: 0,
  });

  const addScore = (amount: number) => {
    const newScore = score + amount;
    setScore(newScore);
    setTasks((prev) => ({
      ...prev,
      score: newScore >= 100 ? true : prev.score,
    }));
  };

  const updateTask = (type: string) => {
    setTasks((prev) => {
      const updated = { ...prev };
      if (type === 'tap') updated.tap++;
      if (type === 'doubleTap') updated.doubleTap++;
      if (type === 'longPress') updated.longPress = true;
      if (type === 'pan') updated.pan = true;
      if (type === 'swipeRight') updated.swipeRight = true;
      if (type === 'swipeLeft') updated.swipeLeft = true;
      if (type === 'pinch') updated.pinch = true;
      return updated;
    });
  };

  return (
    <GameContext.Provider value={{ score, addScore, tasks, updateTask }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);