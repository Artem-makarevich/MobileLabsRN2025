import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const news = [
  { id: '1', title: 'Expo 50 Released!', summary: 'Нове оновлення React Native...' },
  { id: '2', title: 'AI в мобільних додатках', summary: 'Як інтегрувати GPT у ваш застосунок...' },
  { id: '3', title: 'React Native 0.73', summary: 'Що нового в новій версії...' },
];

const HomeScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: '#eee', marginBottom: 10, padding: 15, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  summary: { fontSize: 14, color: '#555' },
});

export default HomeScreen;
