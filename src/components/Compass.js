import React, { Component } from 'react';
import Svg, { Circle } from 'react-native-svg';

export default class Compass extends Component {
  render() {
    let cx = 135;
    let cy = 135;
    let radius = 100;

    let bearingCy = cy + radius;
    let bearingRadius = radius / 10;

    let bearingToLaunchPad = this.props.bearingToLaunchPad || 0;
    let currentForwardBearing = (bearingToLaunchPad - (this.props.currentForwardBearing || 0)) + 180;

    return (
      <Svg viewbox='0 0 270 270' width='270' height='270' xmlns='http://www.w3.org/2000/svg'>
        <Circle
          onPress={this.props.toggleLaunchPad}
          stroke='#5a666b'
          strokeWidth='3'
          fill='none'
          cx={cx}
          cy={cy}
          r={radius} />
        
        <Circle
          transform={`rotate(${currentForwardBearing} ${cx} ${cy})`}
          stroke='#bf263c'
          strokeWidth='3'
          fill='#142634'
          cx={cx}
          cy={bearingCy}
          r={bearingRadius + 6} />

        <Circle
          transform={`rotate(180 ${cx} ${cy})`}
          stroke='#d48872'
          strokeWidth='10'
          fill='#d48872'
          cx={cx}
          cy={bearingCy}
          r={bearingRadius} />
      </Svg>
    );
  }
}
