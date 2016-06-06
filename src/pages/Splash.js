import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './Splash.styles';
import AssistantApi from '../api';
import { connect } from 'react-redux';
import Router from '../router';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      page: 1,
    };
  }
  componentDidMount() {
    setTimeout(()=>{
      Router.replace(Router.pages.News)
    }, 5000);
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
