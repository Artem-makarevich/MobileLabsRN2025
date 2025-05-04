import React, { useState, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from 'react-native-gesture-handler';

export default function GestureObject({ onScore }: { onScore: (points: number) => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY()).current;

  return (
    <FlingGestureHandler
      direction={Directions.RIGHT | Directions.LEFT}
      onHandlerStateChange={() => onScore(Math.floor(Math.random() * 10 + 1))}>
      <PanGestureHandler onGestureEvent={Animated.event([{
        nativeEvent: { translationX: translate.x, translationY: translate.y },
      }], { useNativeDriver: false })}>
        <PinchGestureHandler onGestureEvent={Animated.event([{
          nativeEvent: { scale: scale },
        }], { useNativeDriver: false })}>
          <LongPressGestureHandler
            minDurationMs={3000}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === 4) onScore(20);
            }}>
            <TapGestureHandler
              numberOfTaps={2}
              onActivated={() => onScore(4)}>
              <TapGestureHandler
                onActivated={() => onScore(2)}>
                <Animated.View
                  style={[styles.box, {
                    transform: [
                      { scale },
                      { translateX: translate.x },
                      { translateY: translate.y },
                    ],
                  }]}
                />
              </TapGestureHandler>
            </TapGestureHandler>
          </LongPressGestureHandler>
        </PinchGestureHandler>
      </PanGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    borderRadius: 50,
  },
});