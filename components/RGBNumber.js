import React, { PureComponent } from 'react'
import { Animated, View, Text } from 'react-native'
import AnimatedNumber from './AnimatedNumber.js'
import { DURATION, FONTSIZE } from '../constant.js'
export default class RGBBlock extends PureComponent {
  render() {
    let { selectedColor, displayColor } = this.props
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
        }}
      >
        {selectedColor.Drgb.map((rgbValue, i) => (
          <React.Fragment>
            <Animated.Text
              style={{ color: displayColor, fontFamily: 'BPtypewrite' }}
            >
              {['R', 'G', 'B'][i]}
            </Animated.Text>
            <AnimatedNumber
              style={{ color: displayColor, fontFamily: 'BPtypewrite' }}
              key={i}
              value={rgbValue}
              duration={DURATION}
            />
          </React.Fragment>
        ))}
      </View>
    )
  }
}
