import React, { Component, PureComponent } from "react";
import {
  Animated,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation
} from "react-native";

export default class ColorTab extends PureComponent {
  handlePress = color => {
    this.props.changeColor(color);
  };
  render() {
    let { color } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.handlePress(color)}
        style={styles.tab}
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
