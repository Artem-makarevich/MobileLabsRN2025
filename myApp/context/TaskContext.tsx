// context/TasksContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const defaultTasks: Task[] = [
  { id: '1', title: 'Зробити 10 кліків', completed: false },
  { id: '2', title: 'Зробити подвійний клік 5 разів', completed: false },
  { id: '3', title: "Утримувати об'єкт 3 секунди", completed: false },
  { id: '4', title: "Перетягнути об'єкт", completed: false },
  { id: '5', title: 'Зробити свайп вправо', completed: false },
  { id: '6', title: 'Зробити свайп вліво', completed: false },
  { id: '7', title: "Змінити розмір об'єкта", completed: false },
  { id: '8', title: 'Отримати 100 очок', completed: false },
];

const TasksContext = createContext<{
  tasks: Task[];
  completeTask: (id: string) => void;
  resetTasks: () => void;
}>({
  tasks: [],
  completeTask: () => {},
  resetTasks: () => {},
});

export const useTasks = () => useContext(TasksContext);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const completeTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, completed: true } : task))
    );
  };

  const resetTasks = () => setTasks(defaultTasks);

  return (
    <TasksContext.Provider value={{ tasks, completeTask, resetTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
