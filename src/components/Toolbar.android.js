import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

class Toolbar extends React.Component {
  static defaultProps = {
    actions: [],
    onIconClicked: () => {},
    
    navIconName: 'menu',
  };
  static propTypes = {
    actions: React.PropTypes.array,
    navIconName: React.PropTypes.string,
    onIconClicked: React.PropTypes.func,
  };
  render() {
    const { bgColor } = this.props;
    return (
      <MaterialIcons.ToolbarAndroid
        style={{ height: 56, backgroundColor: bgColor }}
        actions={this.props.actions }
        navIconName={this.props.navIconName}
        onIconClicked={this.props.onIconClicked}
        titleColor={'white'}
        iconColor={'white'}>
      </MaterialIcons.ToolbarAndroid>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
}), dispatch => {})(Toolbar);
