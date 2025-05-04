import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
import GestureObject from '../components/GestureObject';

export default function HomeScreen() {
  const [score, setScore] = useState(0);

  const addPoints = (points: number) => {
    setScore(prev => prev + points);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <GestureObject onScore={addPoints} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 32,
    marginBottom: 20,
  },
});
