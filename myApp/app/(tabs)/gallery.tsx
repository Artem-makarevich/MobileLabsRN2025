import React from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const images = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  url: `https://placekitten.com/200/20${i}`,
}));

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

const GalleryScreen = () => (
  <FlatList
    data={images}
    keyExtractor={(item) => item.id}
    numColumns={numColumns}
    renderItem={({ item }) => (
      <Image
        source={{ uri: item.url }}
        style={{ width: imageSize, height: imageSize }}
      />
    )}
  />
);

export default GalleryScreen;
