import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const tasks = [
  { id: '1', title: 'Зробити 10 кліків', key: 'clicks' },
  { id: '2', title: 'Зробити подвійний клік 5 разів', key: 'doubleClicks' },
  { id: '3', title: "Утримувати об'єкт 3 секунди", key: 'longPress' },
  { id: '4', title: "Перетягнути об'єкт", key: 'drag' },
  { id: '5', title: 'Зробити свайп вправо', key: 'swipeRight' },
  { id: '6', title: 'Зробити свайп вліво', key: 'swipeLeft' },
  { id: '7', title: "Змінити розмір об'єкта", key: 'pinch' },
  { id: '8', title: 'Отримати 100 очок', key: 'points' },
];

const mockProgress = {
  clicks: 10,
  doubleClicks: 5,
  longPress: true,
  drag: true,
  swipeRight: true,
  swipeLeft: true,
  pinch: true,
  points: 100,
};

export default function TasksScreen() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const completed = tasks
      .filter((task) => {
        const progress = mockProgress[task.key as keyof typeof mockProgress];
        switch (task.key) {
          case 'clicks':
            return progress >= 10;
          case 'doubleClicks':
            return progress >= 5;
          case 'points':
            return progress >= 100;
          default:
            return !!progress;
        }
      })
      .map((task) => task.id);

    setCompletedTasks(completed);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isCompleted = completedTasks.includes(item.id);
          return (
            <View
              style={[
                styles.taskItem,
                isCompleted && styles.taskItemCompleted,
              ]}
            >
              <Text style={isCompleted ? styles.completedText : undefined}>
                {item.title}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  taskItemCompleted: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 1,
  },
  completedText: {
    color: '#155724',
    fontWeight: 'bold',
  },
});
