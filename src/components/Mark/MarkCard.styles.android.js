import {
  StyleSheet,
} from 'react-native';

import globalStyles from '../../styles';

const localStyles = StyleSheet.create({
  card: {
    flex: 1,
    // padding: 10,
    backgroundColor: 'white',
  },
  inner: {
    //flexDirection: 'column',
    backgroundColor: 'white',
  },
  className: {
    color: 'black',
    fontSize: 20,
  },
  switcher: {
    padding: 10,
  },
  switcherInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    alignSelf: 'flex-start',
  },
  right:{
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  examName: {
    fontSize: 16
  },
  examSwitcher: {
    padding: 5,
  },
});
export default {
  ...globalStyles,
  ...localStyles,
};
