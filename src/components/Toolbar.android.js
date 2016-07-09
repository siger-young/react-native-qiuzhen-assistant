import React from 'react';
import {
  StatusBar,
  View,
} from 'react-native';

import styles from './Toolbar.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

class Toolbar extends React.Component {
  static defaultProps = {
    actions: [],
    navIconName: 'menu',
    onIconClicked: () => {},
    title: '',
    titleColor: 'white',
    iconColor: 'white',
  };
  static propTypes = {
    actions: React.PropTypes.array,
    navIconName: React.PropTypes.string,
    onIconClicked: React.PropTypes.func,
    title: React.PropTypes.string,
    titleColor: React.PropTypes.string,
    iconColor: React.PropTypes.string,
  };
  render() {
    const bgColor = this.props.color || this.props.bgColor;
    return (
      <MaterialIcons.ToolbarAndroid
        style={[{ height: 56, backgroundColor: bgColor }, this.props.style]}
        actions={this.props.actions }
        navIconName={this.props.navIconName}
        onIconClicked={this.props.onIconClicked}
        titleColor={this.props.titleColor}
        iconColor={this.props.iconColor}
        title={this.props.title}>
      </MaterialIcons.ToolbarAndroid>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
}), dispatch => ({}))(Toolbar);
