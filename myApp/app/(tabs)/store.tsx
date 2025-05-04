// src/screens/StoreScreen.js
import React from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import useInfiniteScroll from '@/utils/infinityScroll';

const fetchGames = async (page) => {
  await new Promise((res) => setTimeout(res, 300));
  return Array.from({ length: 10 }, (_, i) => ({
    id: `game-${page}-${i}`,
    title: `Game ${page}-${i}`,
    description: 'Windows',
    price: '$19.99',
    discount: i % 3 === 0 ? '-50%' : null,
    image: require('@/assets/images/image2.png'),
  }));
};

export default function StoreScreen() {
  const { items, loadMore, loading } = useInfiniteScroll(fetchGames);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Store</Text>
      <Image source={require('@/assets/images/image1.jpg')} style={styles.banner} />

      <View style={styles.tabs}>
        <TabButton label="Top Sellers" active />
        <TabButton label="Free to play" />
        <TabButton label="Early Access" />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Image source={item.image} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
            <View style={styles.priceWrap}>
              {item.discount && <Text style={styles.discount}>{item.discount}</Text>}
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const TabButton = ({ label, active }) => (
  <TouchableOpacity style={[styles.tab, active && styles.activeTab]}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12161c', paddingHorizontal: 16 },
  header: { fontSize: 24, fontWeight: 'bold', color: 'white', marginVertical: 16 },
  banner: { width: '100%', height: 180, borderRadius: 12, marginBottom: 16 },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#1c1f25' },
  activeTab: { backgroundColor: '#2c85f7' },
  tabText: { color: '#aaa', fontSize: 12 },
  activeTabText: { color: 'white' },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1e24', borderRadius: 10, marginBottom: 10, padding: 10,
  },
  icon: { width: 50, height: 50, marginRight: 12, borderRadius: 6 },
  itemTitle: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  desc: { color: '#888', fontSize: 12 },
  priceWrap: { alignItems: 'flex-end' },
  price: { color: '#fff', fontWeight: 'bold' },
  discount: { color: '#4caf50', fontSize: 12, marginBottom: 2 },
});
