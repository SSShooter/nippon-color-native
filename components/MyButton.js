import React, { PureComponent } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { DURATION, FONTSIZE } from "../constant.js";

export default class MyButton extends PureComponent {
  render() {
    return (
        <Animated.Text
          style={{
            ...styles.button,
            ...this.props.style,
            color: this.props.displayColor
          }}
        >
          {this.props.children}
        </Animated.Text>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontFamily: "iconfont",
    fontSize: FONTSIZE,
    marginRight: 9
  }
});
