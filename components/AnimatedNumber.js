import React, { Component, PureComponent } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  Alert,
  View,
  ScrollView
} from "react-native";
export default class AnimatedNumber extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      value: 0
    };
  }
  componentWillReceiveProps(props) {
    clearInterval(this.timer);
    this.animate();
  }
  componentDidMount() {
    this.animate();
  }
  animate = () => {
    let { duration, value, easing, initValue } = this.props;
    let step = ~~(duration / 16.7);
    let from = this.state.value;
    let to = value;

    let range = (to - from) / step;
    let p = 0;
    this.timer = setInterval(() => {
      p += 1;
      if (p > step) clearInterval(this.timer);
      else
        this.setState({
          value: p === step ? to : ~~(from + range * p)
        });
    }, 16.7);
  };
  render() {
    return <Text>{this.state.value}</Text>;
  }
}
