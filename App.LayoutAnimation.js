import React, { Component, PureComponent } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  View,
  UIManager,
  LayoutAnimation
} from "react-native";
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class RGBBlock extends PureComponent {
  state = {
    r: 0,
    g: 0,
    b: 0,
    color: 233221
  };
  randomHexColor = () => {
    //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) {
      //while循环判断hex位数，少于6位前面加0凑够6位
      hex = "0" + hex;
    }
    return hex; //返回‘#'开头16进制颜色
  };
  componentWillReceiveProps = props => {
    LayoutAnimation.easeInEaseOut();
    let { rgb } = props;
    this.setState({
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      color: this.randomHexColor()
    });
  };
  render() {
    let { r, g, b, color } = this.state;
    return (
      <View>
        <View
          style={{
            ...styles.RGBBlock,
            width: r,
            backgroundColor: "#" + color
          }}
        />
        <View
          style={{
            ...styles.RGBBlock,
            width: g,
            backgroundColor: "#" + color
          }}
        />
        <View
          style={{
            ...styles.RGBBlock,
            width: b,
            backgroundColor: "#" + color
          }}
        />
      </View>
    );
  }
}
export default class App extends Component {
  state = {
    rgb: [0, 0, 0]
  };
  changeRGB = () => {
    this.setState({
      rgb: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
    });
  };
  render() {
    return (
      <View style={styles.app}>
        <View style={styles.display}>
          <RGBBlock rgb={this.state.rgb} />
          <Text>222</Text>
          <Button
            onPress={this.changeRGB}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={styles.tabWrapper}>
          <Text>222</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RGBBlock: {
    backgroundColor: "#000",
    height: 2,
    width: 100
  },
  app: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  display: {
    flexGrow: 1
  },
  tabWrapper: {
    flexShrink: 0,
    flexBasis: 100
  }
});
