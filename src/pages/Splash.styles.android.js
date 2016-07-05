import {
  StyleSheet,
} from 'react-native';

import globalStyles from '../styles';

const localStyles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  footerAuthor: {
    fontSize: 12,
  },
});
export default {
  ...globalStyles,
  ...localStyles,
};
