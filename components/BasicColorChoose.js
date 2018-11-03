import React, { PureComponent } from "react";
import { Animated, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { DURATION, FONTSIZE } from "../constant.js";
export default class BasicColorChoose extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      currentColor: {},
      list: [
        { hex: "fffffb", color: "w", position: new Animated.Value(0) },
        { hex: "0c0c0c", color: "b", position: new Animated.Value(0) },
        { hex: "8A6BBE", color: "p", position: new Animated.Value(0) },
        { hex: "58B2DC", color: "c", position: new Animated.Value(0) },
        { hex: "00AA90", color: "g", position: new Animated.Value(0) },
        { hex: "F7C242", color: "y", position: new Animated.Value(0) },
        { hex: "CB1B45", color: "r", position: new Animated.Value(0) },
        { hex: "all", color: "all", position: new Animated.Value(0) }
      ]
    };
  }
  open() {
    let animateList = this.state.list.map((color, index) => {
      return Animated.timing(color.position, {
        toValue: -2 * FONTSIZE * index
      });
    });
    Animated.parallel(animateList).start(() => {
      this.setState({
        isExpanded: true
      });
    });
  }
  close(color) {
    let animateList = this.state.list.map(color => {
      return Animated.timing(color.position, {
        toValue: 0
      });
    });
    this.setState(
      {
        isExpanded: false,
        currentColor: color
      },
      () => {
        Animated.parallel(animateList).start();
        this.props.onBasicColorChange(color)
      }
    );
  }
  toggle = color => {
    if (this.state.isExpanded) {
      this.close(color);
    } else {
      this.open();
    }
  };
  render() {
    let { list } = this.state;
    let { displayColor, ...otherProps } = this.props;
    return (
      <View {...otherProps}>
        {list.map(color => (
          <TouchableOpacity
            onPress={() => this.toggle(color.color)}
            style={{
              zIndex: this.state.currentColor === color.color ? 3 : 1
            }}
          >
            {color.color !== "all" ? (
              <Animated.View
                style={{
                  position: "absolute",
                  backgroundColor: "#000000",
                  height: 1.2 * FONTSIZE,
                  width: 1.2 * FONTSIZE,
                  borderRadius: 50,
                  borderWidth: 0.1 * FONTSIZE,
                  transform: [{ translateY: color.position }],
                  backgroundColor: "#" + color.hex,
                  borderColor: displayColor
                }}
              />
            ) : (
              <Animated.View
                style={{
                  position: "absolute",
                  transform: [{ translateY: color.position }],
                  borderColor: displayColor,
                  height: 1.2 * FONTSIZE,
                  width: 1.2 * FONTSIZE,
                  borderWidth: 0.1 * FONTSIZE,
                  borderRadius: 50
                }}
              >
                <LinearGradient
                  colors={[
                    "#fffffb",
                    "#cb1b45",
                    "#f7c242",
                    "#7db9de",
                    "#00aa90",
                    "#8a6bbe",
                    "#fffffb"
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    // because of the default border-box, should minus the boder width
                    height: 1 * FONTSIZE,
                    width: 1 * FONTSIZE,
                    borderRadius: 50
                  }}
                />
              </Animated.View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
