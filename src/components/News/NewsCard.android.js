import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import styles from './NewsCard.styles';
import { connect } from 'react-redux';

class NewsCard extends React.Component {
  static defaultProps = {
    title: '',
    summary: '',
    author: '佚名',
    date: '',
    action: '发布了新闻',
  };
  static propTypes = {
    author: React.PropTypes.string,
    date: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    summary: React.PropTypes.string.isRequired,
  };
  render() {
    const {
      primaryText,
      secondaryText,
      dark,
      light,
    } = this.props.colors;
    return (
      <View style={styles.card}>
        <TouchableHighlight
          underlayColor={light}
          onPress={this.props.handler}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <View style={styles.info}>
                <Text style={[styles.author, { color: dark }]}>
                  {`${this.props.author} `}
                  <Text style={[styles.action, { color: secondaryText }]}>
                    {this.props.action}
                  </Text>
                </Text>
                <Text style={[styles.date, { color: secondaryText }]}>
                  {this.props.date}
                </Text>
              </View>
              <View style={styles.title}>
                <Text
                  style={[styles.titleText, { color: primaryText }]}
                  numberOfLines={2}>
                  {this.props.title}
                </Text>
              </View>
            </View>
            <View style={styles.summary}>
              <Text
                style={[styles.summaryText, { color: primaryText }]}
                numberOfLines={3}>
                {this.props.summary}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(state => ({
  colors: state.config.theme.colors,
}), dispatch => ({}))(NewsCard);
