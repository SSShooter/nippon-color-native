import React, { Component, PureComponent } from "react";
import {
  Animated,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager
} from "react-native";
import { DURATION, FONTSIZE } from "../constant.js";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ColorTab extends PureComponent {
  state = {
    opacity: 0,
    translateX: 20
  };
  startAnimate() {
    this.setState({
      opacity: 1,
      translateX: 0
    });
  }
  resetState(color) {
    this.setState({
      opacity: 0,
      translateX: 20
    });
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut(); //每次组件更新前，执行LayoutAnimation动画
  }
  handlePress = color => {
    this.props.changeColor(color);
  };
  render() {
    let { color } = this.props;
    let { translateX, opacity } = this.state;
    return (
      <View style={{ opacity, transform: [{ translateX }] }}>
        <TouchableOpacity
          onPress={() => this.handlePress(color)}
          style={[styles.tab]}
        >
          <View
            style={[styles.colorBlock, { backgroundColor: "#" + color.rgb }]}
          />
          <View style={styles.monjiBlock}>
            <Text style={{ fontFamily: "XANO-mincho-U32" }}>{color.name}</Text>
            <Text style={{ fontFamily: "XANO-mincho-U32" }}>
              {"#" + color.rgb}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 35,
    display: "flex",
    flexDirection: "row",
    marginBottom: 5
  },
  colorBlock: {
    width: 10,
    height: "100%"
  },
  monjiBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  }
});
