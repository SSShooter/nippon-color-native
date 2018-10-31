import React, { PureComponent } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { DURATION, FONTSIZE } from "../constant.js";
export default class RGBBlock extends PureComponent {
  state = {
    r: new Animated.Value(0),
    g: new Animated.Value(0),
    b: new Animated.Value(0),
  };
  componentWillReceiveProps = nextProps => {
    let { rgb } = nextProps;
    let { r, g, b } = this.state;
    let animations = [r, g, b].map((originValue, index) =>
      Animated.timing(originValue, {
        toValue: rgb[index],
        duration: DURATION
      })
    );
    Animated.parallel(animations).start();
  };
  render() {
    let { r, g, b } = this.state;
    let {displayColor} = this.props
    return (
      <View>
        {[r, g, b].map((width, index) => (
          <Animated.View
            key={index}
            style={{
              ...styles.RGBBlock,
              width:width.interpolate({
                inputRange: [0, 255],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: displayColor
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RGBBlock: {
    backgroundColor: "#000000",
    height: 2,
    width: 0,
    marginTop: 2
  }
});
