import React, { PureComponent } from 'react'
import { Animated, View, Text } from 'react-native'
import AnimatedNumber from './AnimatedNumber.js'
import { DURATION, FONTSIZE } from '../constant.js'
export default class CMYKNumber extends PureComponent {
  render() {
    let { selectedColor, displayColor } = this.props
    return (
      <View
        style={{
          width: FONTSIZE * 2,
          display: 'flex',
          flexDirection: 'column',
          margin: 15,
          ...this.props.style,
        }}
      >
        {selectedColor.cmyk.map((cmykValue, i) => (
          <React.Fragment>
            <Animated.Text
              style={{ color: displayColor, fontFamily: 'BPtypewrite' }}
            >
              {['c', 'm', 'y', 'k'][i]}
            </Animated.Text>
            <AnimatedNumber
              style={{
                color: displayColor,
                fontSize: FONTSIZE * 1.2,
                fontFamily: 'BPtypewrite',
                textAlign: 'right',
              }}
              key={i}
              value={cmykValue}
              duration={DURATION}
            />
          </React.Fragment>
        ))}
      </View>
    )
  }
}
