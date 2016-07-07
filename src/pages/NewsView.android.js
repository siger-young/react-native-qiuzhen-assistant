import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './Splash.styles';
import AssistantApi from '../api';
import { connect } from 'react-redux';
import Router from '../router';

export class NewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      page: 1,
    };
  }

  render() {
    const { footerColor, bgColor } = this.props;
    return (

    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
  footerColor: state.config.theme.colors.light,
}), dispatch => ({}))(NewsView);
