import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  Text,
  WebView,
} from 'react-native';

import styles from './NewsView.styles';
import AssistantApi from '../api';
import Toolbar from '../components/Toolbar';
import { connect } from 'react-redux';
import Router from '../router';

export class NewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true,
      html: '',
    };
  }
  componentWillMount() {
    this.load();
  }
  async load() {
    this.setState({
      isRefreshing: true,
    }, async () => {
      //console.log(filter);
      let html = await AssistantApi.getArticle(this.props.url);
      // alert('OK');
      console.log(html);
      this.setState({
        html,
        isRefreshing: false,
      });
    });
  }
  render() {
    const { colors, bgColor } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          //idden={true}
          backgroundColor={bgColor}
          translucent={true}
          barStyle={"light-content"} />
        <Toolbar
          title={this.props.title}
          onIconClicked={Router.pop} />
        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.load.bind(this)}
            tintColor={'white'}
            title="Loading..."
            colors={[colors.dark, colors.primary, colors.light]}
            progressBackgroundColor={'white'}
          />
        }>
          <WebView
            source={
              {
                html: this.state.html,
                baseUrl: this.props.url,
              }
            }>
          </WebView>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
  colors: state.config.theme.colors,
}), dispatch => ({}))(NewsView);
