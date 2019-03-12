import React, { PureComponent } from 'react'
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native'
import { DURATION, FONTSIZE, BUTTON_RATIO } from '../constant.js'

export default class MyButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{
          ...this.props.style,
        }}
        onPress={this.props.onPress}
      >
        <Animated.Text
          style={{
            ...styles.button,
            color: this.props.displayColor,
          }}
        >
          {this.props.children}
        </Animated.Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'iconfont',
    fontSize: BUTTON_RATIO * FONTSIZE,
    marginRight: 9,
  },
})
