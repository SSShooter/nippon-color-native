import React, { Component, PureComponent } from "react";
import { Animated, StyleSheet, Text, View, ScrollView } from "react-native";
import colorList from "./color.js";
import ColorTab from "./components/ColorTab.js";
import RGBBlock from "./components/RGBBlock.js";
import NameBlock from "./components/NameBlock.js";
import AnimatedNumber from "./components/AnimatedNumber.js";
import { DURATION, FONTSIZE } from "./constant.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      baseAnimate: new Animated.Value(0),
      selectedColor: { rgb: "ffffff", name: "日本の伝統色" ,color:''},
      lastRGB: "#ffffff"
    };
  }
  handleChange = color => {
    let { selectedColor, baseAnimate, lastRGB } = this.state;
    let newLastRGB = baseAnimate
      .interpolate({
        inputRange: [0, 1],
        outputRange: [lastRGB, "#" + selectedColor.rgb]
      })
      .__getValue();
    baseAnimate.stopAnimation(fin => {
      this.setState(
        {
          baseAnimate: new Animated.Value(0),
          selectedColor: color,
          lastRGB: newLastRGB
        },
        () => {
          Animated.timing(this.state.baseAnimate, {
            // <- new state
            toValue: 1,
            duration: 1500
          }).start();
        }
      );
    });
  };
  render() {
    let { selectedColor, baseAnimate, lastRGB } = this.state;
    return (
      <View style={styles.app}>
        <Animated.View
          style={{
            ...styles.display,
            backgroundColor: baseAnimate.interpolate({
              inputRange: [0, 1],
              outputRange: [lastRGB, "#" + selectedColor.rgb]
            })
          }}
        >
          <RGBBlock rgb={selectedColor.Drgb} />
          {selectedColor.Drgb ? (
            <React.Fragment>
              {[0, 1, 2].map(i => (
                <AnimatedNumber
                  key={i}
                  value={selectedColor.Drgb[i]}
                  duration={1500}
                />
              ))}
            </React.Fragment>
          ) : null}
          <NameBlock
            style={{ position: "absolute", bottom: FONTSIZE, left: FONTSIZE }}
            selectedColor={selectedColor}
          />
        </Animated.View>
        <ScrollView style={styles.tabWrapper}>
          <View style={styles.tabs}>
            {colorList.map(color => (
              <ColorTab
                changeColor={this.handleChange}
                color={color}
                key={color.color}
              />
            ))}
          </View>
        </ScrollView>
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
  },
  app: {
    fontSize: FONTSIZE,
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  display: {
    flexGrow: 1,
    height: "100%"
  },
  tabWrapper: {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 100
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  }
});
