import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';

import styles from '../styles/Timer';

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
