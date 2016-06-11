import {
  StyleSheet,
} from 'react-native';

import globalStyles from '../../styles';

const localStyles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  inner: {
    backgroundColor: 'white',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  title: {
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    paddingVertical: 10,
  },
  summaryText: {
    fontSize: 12,
  }
});
export default {
  ...globalStyles,
  ...localStyles,
};
