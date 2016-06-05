import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './Splash.styles';
import AssistantApi from '../api';
import { connect } from 'react-redux';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      page: 1,
    };
  }
  async componentDidMount() {
    // const sub = await AssistantApi.getFilter();
    // console.log(sub);
    // this.setState({
    //   text: sub.data,
    // });
    // setInterval(async () => {
    //   const data = await AssistantApi.getSub(21, this.state.page);
    //   this.setState({
    //     text: data
    //   });
    //   this.setState({
    //     page: this.state.page + 1,
    //   });
    // }, 10000);
  }

  render() {
    const { footerColor, bgColor } = this.props;
    return (
      <View style={[styles.splashContainer, { backgroundColor: bgColor }]}>
        <View style={styles.header}>
          <Text style={styles.title}>
            求真帮
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerAuthor, { color: footerColor }]}>
            Powered by Siger Young
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
  footerColor: state.config.theme.colors.light,
}), dispatch => ({}))(Splash);
