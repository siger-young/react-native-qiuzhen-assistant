import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './Splash.styles';
import AssistantApi from '../api';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  async componentWillMount() {
    // let data = '';
    const data = await AssistantApi.getNews(21);
    // alert(data);
    this.setState({
      text: data,
    });
  }

  render() {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>
          {this.state.text}
        </Text>
      </View>
    );
  }
}
