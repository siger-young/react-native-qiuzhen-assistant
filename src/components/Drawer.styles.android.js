import {
  StyleSheet,
} from 'react-native';

import globalStyles from '../styles';

const localStyles = StyleSheet.create({
  navigation: {
    flex: 1,
    flexDirection: 'column',
  },
  navigationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationText: {
    fontSize: 16,
    color: '#000',
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
