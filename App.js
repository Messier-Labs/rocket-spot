import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import { API_ENDPOINT } from 'react-native-dotenv';

import Compass from './src/components/Compass';
import Timer from './src/components/Timer';

import getBearing from './src/utils/get-bearing';
import launchPadCoords from './src/utils/launch-pads';

export default class App extends Component {
  state = {
    location: null,
    currentForwardBearing: null,
    bearingToLaunchPad: null,
    errorMessage: null,
    launchPad: 1,
    launchTime: null,
    name: null
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this.getLaunchDetails();
      this.getLocationAsync();
      Location.watchHeadingAsync(this.handleHeading);
    }
  }

  getLaunchDetails = async() => {
    try {
      let response = await fetch(`${API_ENDPOINT}/launch.js`);
      let {
        date,
        launchPad,
        name
      } = await response.json();

      this.setState({ launchTime: date, launchPad, name });
    } catch(error) {
      this.setState({ errorMessage: 'Could not fetch launch details' });
    }
  };

  getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location is required for this app',
      });
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    this.setState({ location });
    this.calculateBearing();
  };

  handleHeading = ({ trueHeading }) => {
    this.setState({ currentForwardBearing: trueHeading });
  };

  toggleLaunchPad = () => {
    let currentPad = this.state.launchPad;
    if (currentPad === 1) {
      this.setState({ launchPad: 2 });
    } else {
      this.setState({ launchPad: 1 });
    }

    this.calculateBearing();
  };

  calculateBearing = () => {
    let { launchPad, location } = this.state;

    if (!location) {
      return;
    }

    let { latitude, longitude } = location.coords;
    let bearingToLaunchPad = getBearing({ latitude, longitude }, launchPadCoords[launchPad - 1]);
    this.setState({ bearingToLaunchPad });
  };

  render() {
    let text = 'Getting your location..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.bearingToLaunchPad) {
      text = `Launch Pad ${this.state.launchPad}`;
    }

    return (
      <View style={styles.container}>
        <Timer launchTime={this.state.launchTime} />

        <Compass
          toggleLaunchPad={this.toggleLaunchPad}
          bearingToLaunchPad={this.state.bearingToLaunchPad}
          currentForwardBearing={this.state.currentForwardBearing} />

        <Text style={styles.rocket}>{this.state.name}</Text>

        <Text style={styles.launchPad}>{text}</Text>

        <Text style={styles.helperText}>Tap the circle to toggle between the launch pads</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#142634'
  },
  rocket: {
    fontSize: 24,
    color: '#d48872'
  },
  launchPad: {
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
    color: '#bdc7d1'
  },
  helperText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    color: '#5a666b'
  }
});
