import React from 'react';
import { useGame } from '@/context/GameContext';
import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function TasksScreen() {
  const { tasks } = useGame(); // Access tasks from the context

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { id: '1', title: 'Зробити 10 кліків', completed: tasks.tap >= 10 },
          { id: '2', title: 'Зробити подвійний клік 5 разів', completed: tasks.doubleTap >= 5 },
          { id: '3', title: "Утримувати об'єкт 3 секунди", completed: tasks.longPress },
          { id: '4', title: "Перетягнути об'єкт", completed: tasks.pan },
          { id: '5', title: 'Зробити свайп вправо', completed: tasks.swipeRight },
          { id: '6', title: 'Зробити свайп вліво', completed: tasks.swipeLeft },
          { id: '7', title: "Змінити розмір об'єкта", completed: tasks.pinch },
          { id: '8', title: 'Отримати 100 очок', completed: tasks.score >= 100 },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, item.completed && styles.completed]}>
            <Text style={styles.taskText}>
              {item.title} {item.completed ? '✅' : ''}
            </Text>
          </View>
        )}
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
  completed: {
    backgroundColor: '#d4edda',
  },
  taskText: {
    fontSize: 16,
  },
});
