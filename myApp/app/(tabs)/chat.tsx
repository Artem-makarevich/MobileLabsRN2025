import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/theme/ThemeContext';

const initialChats = [
  {
    id: '1',
    name: 'Mark Dyson',
    message: "I'm already starting to play",
    time: '14 Jun',
    avatar: require('@/assets/images/avatar1.png'),
    online: true,
    unread: true,
  },
  {
    id: '2',
    name: 'Player123',
    message: 'You: Ok',
    time: '14 Jun',
    avatar: require('@/assets/images/avatar2.png'),
    online: false,
    unread: false,
  },
];

let chatCount = 2;

export default function ChatScreen() {
  const { theme } = useTheme();
  const [chats, setChats] = useState(initialChats);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMoreChats = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newChats = Array.from({ length: 5 }).map((_, i) => {
        chatCount += 1;
        return {
          id: `${chatCount}`,
          name: `User${chatCount}`,
          message: `Message from user ${chatCount}`,
          time: 'Now',
          avatar: require('@/assets/images/avatar1.png'),
          online: Math.random() > 0.5,
          unread: Math.random() > 0.5,
        };
      });

      setChats((prev) => [...prev, ...newChats]);
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Chat</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.activeTabText}>Open chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.inactiveTabText}>My friends</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatRow}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
              <Text style={styles.message}>{item.message} • {item.time}</Text>
            </View>
            {item.unread && <View style={styles.unreadBadge} />}
          </View>
        )}
        onEndReached={loadMoreChats}
        onEndReachedThreshold={0.4}
        ListFooterComponent={loadingMore ? <ActivityIndicator color="#999" style={{ marginTop: 12 }} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  tabRow: { flexDirection: 'row', marginBottom: 12 },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#1c1f25',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: { backgroundColor: '#2c85f7' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  inactiveTabText: { color: '#aaa' },
  chatRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#333',
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 12, color: '#999' },
  unreadBadge: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: '#2c85f7',
  },
});
