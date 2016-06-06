import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './News.styles';
import AssistantApi from '../api';
import Toolbar from '../components/Toolbar';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  async componentWillMount() {
    // let data = '';

  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title={'新闻'}
          />
      </View>
    );
  }
}
