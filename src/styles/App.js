import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
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
