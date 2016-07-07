import React from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Drawer.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Router from '../router';

class Drawer extends React.Component {
  static defaultProps = {
    drawerWidth: 150,
    onDrawerSlide: () => {},
    onDrawerStateChanged: () => {},
    onDrawerOpen: () => {},
    onDrawerClose: () => {},
  };
  static propTypes = {
    ...View.propTypes,
    keyboardDismissMode: React.PropTypes.oneOf([
      'none', // default
      'on-drag',
    ]),
    // drawerBackgroundColor: ColorPropType,
    drawerPosition: React.PropTypes.oneOf([
      DrawerLayoutAndroid.positions.left,
      DrawerLayoutAndroid.positions.right,
    ]),
    drawerWidth: React.PropTypes.number,
    drawerLockMode: React.PropTypes.oneOf([
      'unlocked',
      'locked-closed',
      'locked-open'
    ]),
    onDrawerSlide: React.PropTypes.func,
    onDrawerStateChanged: React.PropTypes.func,
    onDrawerOpen: React.PropTypes.func,
    onDrawerClose: React.PropTypes.func,
    // renderNavigationView: React.PropTypes.func.isRequired,
    // statusBarBackgroundColor: ColorPropType,
  };
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  renderDrawer() {
    const { colors } = this.props;
    return(
      <View style={styles.navigation}>
      {
        Router.navigation && Router.navigation.map((v, k) => {
          return (
            <TouchableHighlight
              onPress={() => {
                const { navigator } = this.props;
                console.log(navigator.getCurrentRoutes());
                Router.gotoPage(v.page, {
                  test: 1
                });
              }}
              key={k}
              underlayColor={colors.light}>
              <View style={styles.navigationItem}>
                <Icon size={24} color={colors.primary} name={v.icon} />
                <Text style={styles.navigationText}>{v.title}</Text>
              </View>
            </TouchableHighlight>
          );
        })
      }
      </View>
    );
  }
  render() {
    const { bgColor } = this.props;
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => global.drawer = drawer}
        renderNavigationView={this.renderDrawer.bind(this)}
        drawerWidth={this.props.drawerWidth}
        onDrawerClose={this.props.onDrawerClose}
        // drawerBackgroundColor={bgColor}
        onDrawerOpen={this.props.onDrawerOpen}
        onDrawerSlide={this.props.onDrawerSlide}>
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  }
}

export default connect(state => ({
  colors: state.config.theme.colors,
}), dispatch => ({}))(Drawer);
