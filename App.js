import React, { Component, PureComponent } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar
} from "react-native";
import colorList from "./color.js";
import ColorTab from "./components/ColorTab.js";
import RGBBlock from "./components/RGBBlock.js";
import RGBNumber from "./components/RGBNumber.js";
import NameBlock from "./components/NameBlock.js";
import BasicColorChoose from "./components/BasicColorChoose.js";
import { DURATION, FONTSIZE } from "./constant.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      baseAnimate: new Animated.Value(0),
      selectedColor: { rgb: "ffffff", name: "日本の伝統色", color: "" },
      lastRGB: "#ffffff",
      displayWordColor: new Animated.Value(1)
    };
    this.colorEleList = {};
    this.handleViewableChange = ({ changed }) => {
      for (let i = 0; i < changed.length; i += 1) {
        if (changed[i].isViewable) {
          this.colorEleList[changed[i].item.color].startAnimate();
        } else {
          this.colorEleList[changed[i].item.color].resetState(
            changed[i].item.color
          );
        }
      }
    };
    this.viewabilityConfig = {
      minimumViewTime: 100,
      viewAreaCoveragePercentThreshold: 0,
      waitForInteraction: false
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
    baseAnimate.setValue(0);

    Animated.timing(this.state.displayWordColor, {
      toValue: color.f === "d" ? 1 : 0,
      duration: DURATION
    }).start();

    this.setState(
      {
        selectedColor: color,
        lastRGB: newLastRGB
      },
      () => {
        Animated.timing(this.state.baseAnimate, {
          // <- new state
          toValue: 1,
          duration: DURATION
        }).start();
      }
    );
  };
  render() {
    let { selectedColor, baseAnimate, lastRGB, displayWordColor } = this.state;
    let displayColor = displayWordColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#ffffff", "#000000"]
    });
    return (
      <View style={styles.app}>
        <StatusBar hidden={true} />
        <Animated.View
          style={{
            ...styles.display,
            backgroundColor: baseAnimate.interpolate({
              inputRange: [0, 1],
              outputRange: [lastRGB, "#" + selectedColor.rgb]
            })
          }}
        >
          <RGBBlock
            displayColor={displayColor}
            rgb={selectedColor.Drgb}
            bgColor={selectedColor.f}
          />
          {selectedColor.Drgb ? (
            <RGBNumber
              displayColor={displayColor}
              selectedColor={selectedColor}
            />
          ) : null}
          <NameBlock
            style={{
              position: "absolute",
              bottom: FONTSIZE,
              left: FONTSIZE
            }}
            selectedColor={selectedColor}
          />
          <BasicColorChoose
            displayColor={displayColor}
            style={{
              position: "absolute",
              bottom: 2 * FONTSIZE,
              right: 2 * FONTSIZE
            }}
          />
        </Animated.View>
        <FlatList
          style={styles.tabWrapper}
          data={colorList}
          ref={flatList => (this._flatList = flatList)}
          keyExtractor={item => item.name}
          onViewableItemsChanged={this.handleViewableChange}
          viewabilityConfig={this.viewabilityConfig}
          onEndReached={() => console.log("end")}
          renderItem={({ item: color }) => {
            return (
              <ColorTab
                ref={ref => (this.colorEleList[color.color] = ref)}
                changeColor={this.handleChange}
                color={color}
                key={color.color}
              />
            );
          }}
        />
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
    // height: "100%",
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
    height: "100%",
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
