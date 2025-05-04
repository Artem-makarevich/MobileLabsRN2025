import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

const initialPosts = [
  {
    id: '1',
    author: 'Eurogamer',
    time: 'Yesterday • 2:20 pm',
    title: 'Florida tourist attraction sues Fortnite...',
    description: 'Coral Castle Museum, a tourist attraction near Miami...',
    image: require('@/assets/images/image2.png'),
    likes: 324,
    comments: 12,
  },
  {
    id: '2',
    author: 'IGN',
    time: 'Today • 10:05 am',
    title: 'Elden Ring wins Game of the Year!',
    description: 'The action RPG was awarded top honors at the VGAs...',
    image: require('@/assets/images/image1.jpg'),
    likes: 512,
    comments: 45,
  },
  {
    id: '3',
    author: 'PC Gamer',
    time: 'Today • 8:30 am',
    title: 'Steam Summer Sale leaks ahead of time',
    description: 'A full list of discounted titles is now circulating...',
    image: require('@/assets/images/image3.jpeg'),
    likes: 198,
    comments: 30,
  },
];

let postCount = 3;

export default function CommunityScreen() {
  const { theme } = useTheme();
  const [posts, setPosts] = useState(initialPosts);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMorePosts = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newPosts = Array.from({ length: 3 }).map((_, index) => {
        postCount += 1;
        return {
          id: postCount.toString(),
          author: `Author ${postCount}`,
          time: 'Just now',
          title: `Sample Post Title ${postCount}`,
          description: `This is a dynamically loaded post #${postCount}.`,
          image: require('@/assets/images/image2.png'), // You can alternate images if needed
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 50),
        };
      });
      setPosts((prev) => [...prev, ...newPosts]);
      setLoadingMore(false);
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Community</Text>

      <View style={styles.filterRow}>
        {['All', 'Screenshots', 'Artwork', 'Workshop'].map((filter, index) => (
          <TouchableOpacity key={index} style={[styles.filterButton, index === 0 && styles.active]}>
            <Text style={[styles.filterText, index === 0 && styles.activeText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.author, { color: theme.text }]}>{item.author}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Image source={item.image} style={styles.image} />
            <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.reactions}>
              <Text style={{ color: 'green' }}>💚 {item.likes}</Text>
              <Text style={{ color: theme.text }}>💬 {item.comments}</Text>
            </View>
          </View>
        )}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#888" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#1c1f25',
    borderRadius: 18,
  },
  filterText: { color: '#aaa' },
  active: { backgroundColor: '#2c85f7' },
  activeText: { color: '#fff' },
  card: { borderRadius: 10, padding: 12, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  author: { fontWeight: 'bold' },
  time: { color: '#aaa', fontSize: 12 },
  image: { width: '100%', height: 160, borderRadius: 10, marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  description: { color: '#bbb', fontSize: 13 },
  reactions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
