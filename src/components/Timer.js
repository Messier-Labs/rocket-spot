import React, { Component, Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';

import formatTimeDifference from './../utils/format-time-difference';

export default class Timer extends Component {
  state = {
    currentTime: new Date
  };

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ currentTime: new Date }),
      1000
    );
  }

  render() {
    let afterLaunch;
    let { currentTime } = this.state;
    let launchTime = this.props.launchTime ? new Date(this.props.launchTime) : currentTime;
    let countdown;
    if (launchTime >= currentTime) {
      countdown = launchTime - currentTime;
    } else {
      afterLaunch = true;
      countdown = currentTime - launchTime;
    }

    return (
      <Fragment>
        <Text style={styles.caption}>
          {afterLaunch ? 'TIME SINCE LAUNCH' : 'TIME TO LAUNCH'}
        </Text>
        <Text style={styles.timer}>{formatTimeDifference(countdown)}</Text>
        <Text style={styles.legend}>d h m s</Text>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    letterSpacing: 5,
    fontSize: 48,
    textAlign: 'center',
    color: '#bdc7d1'
  },
  caption: {
    fontSize: 20,
    color: '#d48872',
    letterSpacing: 2
  },
  legend: {
    fontSize: 14,
    letterSpacing: 35,
    textAlign: 'center',
    color: '#5a666b'
  }
});
