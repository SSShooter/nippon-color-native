import React, { Component, PureComponent } from 'react'
import { Animated, Text } from 'react-native'
export default class AnimatedNumber extends PureComponent {
  state = {
    value: 0,
  }
  componentWillReceiveProps(nextProps) {
    clearInterval(this.timer)
    this.animate(nextProps)
  }
  componentDidMount() {
    this.animate()
  }
  animate = nextProps => {
    let { duration, value, easing, initValue } = nextProps || this.props
    let step = ~~(duration / 16.7)
    let from = this.state.value
    let to = value

    let range = (to - from) / step
    let p = 0
    this.timer = setInterval(() => {
      p += 1
      if (p > step) clearInterval(this.timer)
      else
        this.setState({
          value: p === step ? to : ~~(from + range * p),
        })
    }, 16.7)
  }
  render() {
    return (
      <Animated.Text
        style={{ ...this.props.style }}
      >
        {this.state.value}
      </Animated.Text>
    )
  }
}
