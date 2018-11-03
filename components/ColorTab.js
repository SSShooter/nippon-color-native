import React, { Component, PureComponent } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { DURATION, FONTSIZE } from '../constant.js'

export default class ColorTab extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
    translateX: new Animated.Value(-20),
  }
  componentDidMount() {
    // this.startAnimate();
  }
  startAnimate() {
    this.state.translateX.stopAnimation(fin => {
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 450,
      }).start()
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 450,
      }).start()
    })
  }
  resetState() {
    // TODO figure out Not working reason
    // this.setState({
    //   opacity: new Animated.Value(0),
    //   translateX: new Animated.Value(-20)
    // });
    this.state.translateX.stopAnimation(fin => {
      Animated.timing(this.state.translateX, {
        toValue: -20,
        duration: 500,
      }).start()
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 500,
      }).start()
    })
  }
  handlePress = color => {
    this.props.changeColor(color)
  }
  render() {
    let { color } = this.props
    let { translateX, opacity } = this.state
    return (
      <Animated.View style={{ opacity, transform: [{ translateX }] }}>
        <TouchableOpacity
          onPress={() => this.handlePress(color)}
          style={[styles.tab]}
        >
          <View
            style={[styles.colorBlock, { backgroundColor: '#' + color.rgb }]}
          />
          <View style={styles.monjiBlock}>
            <Text
              style={{
                fontSize: 1.2 * FONTSIZE,
                fontFamily: 'XANO-mincho-U32',
              }}
            >
              {color.name}
            </Text>
            <Text style={{ fontSize: 1 * FONTSIZE, fontFamily: 'BPtypewrite' }}>
              {'#' + color.rgb}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 3 * FONTSIZE,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  colorBlock: {
    width: 10,
    height: '100%',
    marginRight: 0.5 * FONTSIZE,
  },
  monjiBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
})
