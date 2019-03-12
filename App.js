import React, { Component, PureComponent } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Clipboard,
  Alert,
} from 'react-native'
import { shareOnFacebook, shareOnTwitter } from 'react-native-social-share'
import colorList from './color.js'
import ColorTab from './components/ColorTab.js'
import RGBBlock from './components/RGBBlock.js'
import RGBNumber from './components/RGBNumber.js'
import NameBlock from './components/NameBlock.js'
import BasicColorChoose from './components/BasicColorChoose.js'
import MyButton from './components/MyButton.js'
import { DURATION, FONTSIZE, BUTTON_GAP, BUTTON_RATIO } from './constant.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      baseAnimate: new Animated.Value(0),
      selectedColor: { rgb: 'ffffff', name: '日本の伝統色', color: '' },
      lastRGB: '#ffffff',
      displayWordColor: new Animated.Value(1),
      colorList,
    }
    this.colorEleList = {}
    this.handleViewableChange = ({ changed }) => {
      console.log(changed)
      if (!changed) return
      for (let i = 0; i < changed.length; i += 1) {
        if (changed[i].isViewable) {
          console.log(this.colorEleList[changed[i].item.color])
          this.colorEleList[changed[i].item.color].startAnimate()
        } else if (this.colorEleList[changed[i].item.color]) {
          this.colorEleList[changed[i].item.color].resetState(
            changed[i].item.color
          )
        }
      }
    }
    this.viewabilityConfig = {
      minimumViewTime: 100,
      viewAreaCoveragePercentThreshold: 0,
      waitForInteraction: false,
    }
  }
  handleBasicColorChange = color => {
    let basicColor =
      color === 'all' ? colorList : colorList.filter(item => item.c === color)
    this.setState({
      colorList: basicColor,
    })
    this.handleSelectedChange(basicColor[0])
  }
  handleSelectedChange = color => {
    let { selectedColor, baseAnimate, lastRGB } = this.state
    let newLastRGB = baseAnimate
      .interpolate({
        inputRange: [0, 1],
        outputRange: [lastRGB, '#' + selectedColor.rgb],
      })
      .__getValue()
    baseAnimate.setValue(0)

    Animated.timing(this.state.displayWordColor, {
      toValue: color.f === 'd' ? 1 : 0,
      duration: DURATION,
    }).start()

    this.setState(
      {
        selectedColor: color,
        lastRGB: newLastRGB,
      },
      () => {
        Animated.timing(this.state.baseAnimate, {
          // <- new state
          toValue: 1,
          duration: DURATION,
        }).start()
      }
    )
  }
  copy = () => {
    Clipboard.setString('#' + this.state.selectedColor.rgb)
    Alert.alert('已复制', '#' + this.state.selectedColor.rgb)
  }
  twitter = () => {
    shareOnFacebook({
      'text':'Global democratized marketplace for art',
      'link':'https://artboost.com/',
      'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
      //or use image
      'image': 'artboost-icon',
    },
    (results) => {
      console.log(results);
    }
  );
  }
  render() {
    let {
      selectedColor,
      baseAnimate,
      lastRGB,
      colorList,
      displayWordColor,
    } = this.state
    let displayColor = displayWordColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ffffff', '#000000'],
    })
    return (
      <View style={styles.app}>
        <StatusBar hidden={true} />
        <Animated.View
          style={{
            ...styles.display,
            backgroundColor: baseAnimate.interpolate({
              inputRange: [0, 1],
              outputRange: [lastRGB, '#' + selectedColor.rgb],
            }),
          }}
        >
          <RGBBlock
            displayColor={displayColor}
            rgb={selectedColor.Drgb}
            bgColor={selectedColor.f}
          />
          {selectedColor.Drgb ? (
            <RGBNumber
              displayColor={displayColor}
              selectedColor={selectedColor}
            />
          ) : null}
          <NameBlock
            displayColor={displayColor}
            selectedColor={selectedColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              left: FONTSIZE,
            }}
          />
          <BasicColorChoose
            onBasicColorChange={this.handleBasicColorChange}
            displayColor={displayColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              right: FONTSIZE,
              height: BUTTON_RATIO * FONTSIZE,
              width: BUTTON_RATIO * FONTSIZE,
            }}
          />
          <MyButton
            displayColor={displayColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              right: FONTSIZE + 1 * (BUTTON_GAP + FONTSIZE),
              fontSize: BUTTON_RATIO * FONTSIZE,
            }}
          >
            {'\uE64C' /* e64b */}
          </MyButton>
          <MyButton
            displayColor={displayColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              right: FONTSIZE + 2 * (BUTTON_GAP + FONTSIZE),
              fontSize: BUTTON_RATIO * FONTSIZE,
            }}
          >
            {'\ue936'}
          </MyButton>
          {/* copy */}
          <MyButton
            displayColor={displayColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              right: FONTSIZE + 3 * (BUTTON_GAP + FONTSIZE),
              fontSize: BUTTON_RATIO * FONTSIZE,
            }}
            onPress={this.copy}
          >
            {'\ue6e5'}
          </MyButton>
          {/* twitter */}
          <MyButton
            displayColor={displayColor}
            style={{
              position: 'absolute',
              bottom: FONTSIZE,
              right: FONTSIZE + 4 * (BUTTON_GAP + FONTSIZE),
              fontSize: BUTTON_RATIO * FONTSIZE,
            }}
            onPress={this.twitter}
          >
            {'\ue673'}
          </MyButton>
        </Animated.View>
        <FlatList
          style={styles.tabWrapper}
          data={colorList}
          ref={flatList => (this._flatList = flatList)}
          keyExtractor={item => item.name}
          onViewableItemsChanged={this.handleViewableChange}
          viewabilityConfig={this.viewabilityConfig}
          onEndReached={() => console.log('end')}
          renderItem={({ item: color }) => {
            return (
              <ColorTab
                ref={ref => (this.colorEleList[color.color] = ref)}
                changeColor={this.handleSelectedChange}
                color={color}
                key={color.color}
              />
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  RGBBlock: {
    backgroundColor: '#000000',
    height: 2,
    width: 0,
    marginTop: 2,
  },
  app: {
    // height: "100%",
    fontSize: FONTSIZE,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  display: {
    flexGrow: 1,
    height: '100%',
  },
  tabWrapper: {
    height: '100%',
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: 100,
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
})
