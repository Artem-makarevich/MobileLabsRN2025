import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
} from 'react-native-gesture-handler';
import { useGame } from '@/context/GameContext';

export default function GestureObject() {
  const { addScore, updateTask } = useGame();
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY()).current;

  const onSingleTap = () => {
    addScore(1);
    updateTask('tap');
  };

  const onDoubleTap = () => {
    addScore(2);
    updateTask('doubleTap');
  };

  const onLongPress = () => {
    addScore(5);
    updateTask('longPress');
  };

  const onPanGesture = Animated.event(
    [{ nativeEvent: { translationX: position.x, translationY: position.y } }],
    { useNativeDriver: false }
  );

  const onFling = (dir: 'left' | 'right') => {
    const points = Math.floor(Math.random() * 10) + 1;
    addScore(points);
    updateTask(dir === 'left' ? 'swipeLeft' : 'swipeRight');
  };

  const onPinchGesture = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: false,
  });

  const onPinchEnd = () => {
    addScore(10);
    updateTask('pinch');
  };

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onActivated={() => onFling('left')}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onActivated={() => onFling('right')}
      >
        <PanGestureHandler onGestureEvent={onPanGesture} onEnded={() => updateTask('pan')}>
          <PinchGestureHandler onGestureEvent={onPinchGesture} onEnded={onPinchEnd}>
            <LongPressGestureHandler onActivated={onLongPress} minDurationMs={1000}>
              <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
                <TapGestureHandler numberOfTaps={1} onActivated={onSingleTap}>
                  <Animated.View style={[styles.box, {
                    transform: [
                      { translateX: position.x },
                      { translateY: position.y },
                      { scale: scale },
                    ],
                  }]}
                  >

                  </Animated.View>
                </TapGestureHandler>
              </TapGestureHandler>
            </LongPressGestureHandler>
          </PinchGestureHandler>
        </PanGestureHandler>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#add8e6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 100,
  },
  text: {
    fontSize: 40,
  },
});