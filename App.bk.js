/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0), // 透明度初始值设为0
    moveAnim: new Animated.Value(100) // 透明度初始值设为0
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.moveAnim, // 动画中的变量值
        {
          toValue: 0, // 透明度最终变为1，即完全不透明
          duration: 500 // 让动画持续一段时间
        }
      ), // 开始执行动画

      Animated.timing(
        this.state.fadeAnim, // 动画中的变量值
        {
          toValue: 1, // 透明度最终变为1，即完全不透明
          duration: 500 // 让动画持续一段时间
        }
      )
    ]).start();
  }

  render() {
    let { fadeAnim,moveAnim } = this.state;

    return (
      <Animated.View // 使用专门的可动画化的View组件
        style={{
          ...this.props.style,
          position: "absolute",
          top: moveAnim, // 将透明度指定为动画变量值
          opacity: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Here's something new</Text>
        <FadeInView
          style={{ width: 250, height: 50, backgroundColor: "powderblue" }}
        >
          <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
            Fading in
          </Text>
        </FadeInView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
