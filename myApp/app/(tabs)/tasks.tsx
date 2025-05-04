mport React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const tasks = [
  { id: '1', title: 'Зробити 10 кліків' },
  { id: '2', title: 'Зробити подвійний клік 5 разів' },
  { id: '3', title: 'Утримувати об'єкт 3 секунди' },
  { id: '4', title: 'Перетягнути об'єкт' },
  { id: '5', title: 'Зробити свайп вправо' },
  { id: '6', title: 'Зробити свайп вліво' },
  { id: '7', title: 'Змінити розмір об'єкта' },
  { id: '8', title: 'Отримати 100 очок' },
];

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
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
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
