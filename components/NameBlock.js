import React, { PureComponent } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { DURATION, FONTSIZE } from "../constant.js";

export default class NameBlock extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(100)
  };
  componentWillReceiveProps() {
    this.setState(
      {
        opacity: new Animated.Value(0),
        translateX: new Animated.Value(100)
      },
      () => {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: DURATION
        }).start();
        Animated.timing(this.state.translateX, {
          toValue: 0,
          duration: DURATION
        }).start();
      }
    );
  }
  render() {
    let { selectedColor, style } = this.props;
    let { opacity, translateX } = this.state;
    return (
      <Animated.View
        style={[styles.box, style, { opacity, transform: [{ translateX }] }]}
      >
        <View>
          {Array.from(selectedColor.name).map(word => (
            <Text style={styles.kanji}>{word}</Text>
          ))}
        </View>
        <View>
          {Array.from(selectedColor.color).map(word => (
            <Text style={styles.romaji}>{word}</Text>
          ))}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  kanji: {
    fontFamily: "XANO-mincho-U32",
    fontSize: FONTSIZE * 3,
    marginRight: 9
  },
  romaji: {
    transform: [{ rotateZ: "90deg" }]
  }
});
