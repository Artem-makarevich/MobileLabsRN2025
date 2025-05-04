import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GestureObject from '@/components/GestureObject';
import { useGame } from '@/context/GameContext';

export default function HomeScreen() {
 const { score } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>

      <GestureObject />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  score: {
    fontSize: 32,
    marginBottom: 20,
    color: 'black',
  },
});
