import React from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const images = [
  { id: '1', image: require('@/assets/images/image1.jpg') },
  { id: '2', image: require('@/assets/images/image2.png') },
  { id: '3', image: require('@/assets/images/image3.jpeg') },
  { id: '4', image: require('@/assets/images/image4.jpg') },
  { id: '4', image: require('@/assets/images/image1.jpg') },
  { id: '4', image: require('@/assets/images/image3.jpeg') },

];

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
        source={item.image}
        style={{ width: imageSize, height: imageSize }}
      />
    )}
  />
);

export default GalleryScreen;
