import React from 'react';
import {
  DrawerLayoutAndroid,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

class Drawer extends React.Component {
  static defaultProps = {
    onDrawerClose: () => {},
    onDrawerOpen: () => {},
    onDrawerSlide: () => {},
  };
  static propTypes = {
    ...View.propTypes,
    keyboardDismissMode: ReactPropTypes.oneOf([
      'none', // default
      'on-drag',
    ]),
    drawerBackgroundColor: ColorPropType,
    drawerPosition: ReactPropTypes.oneOf([
      DrawerConsts.DrawerPosition.Left,
      DrawerConsts.DrawerPosition.Right
    ]),
    drawerWidth: ReactPropTypes.number,
    drawerLockMode: ReactPropTypes.oneOf([
      'unlocked',
      'locked-closed',
      'locked-open'
    ]),
    onDrawerSlide: ReactPropTypes.func,
    onDrawerStateChanged: ReactPropTypes.func,
    onDrawerOpen: ReactPropTypes.func,
    onDrawerClose: ReactPropTypes.func,
    renderNavigationView: ReactPropTypes.func.isRequired,
    statusBarBackgroundColor: ColorPropType,
  };
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  renderDrawer() {
    return(
      <View>
      </View>
    );
  }
  render() {
    const { bgColor } = this.props;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => this.drawer = drawer}
        renderNavigationView={this.renderDrawer.bind(this)}
        onDrawerClose={this.props.onDrawerClose}
        onDrawerOpen={this.props.onDrawerOpen}
        onDrawerSlide={this.props.onDrawerSlide}>
      </DrawerLayoutAndroid>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
}), dispatch => ({}))(Toolbar);
