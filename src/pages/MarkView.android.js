import React from 'react';
import {
  ListView,
  StatusBar,
  Text,
  RefreshControl,
  View,
} from 'react-native';

import styles from './MarkView.styles';
import AssistantApi from '../api';
import Toolbar from '../components/Toolbar';
import Drawer from '../components/Drawer';
import { connect } from 'react-redux';
import MarkCard from '../components/Mark/MarkCard';
import Router from '../router';

export class MarkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      isRefreshing: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
    };
  }
  componentWillMount() {
    this.load();
  }
  async load() {
    this.setState({
      isRefreshing: true,
    }, async () => {
      let filter = await AssistantApi.getFilter();
      //console.log(filter);
      let sub = await AssistantApi.getMark(filter.current.year, filter.current.term, false, this.props.link);
      // alert('OK');
      //console.log(sub);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(sub),
        isRefreshing: false,
      });
    });
  }
  renderRow(row) {
    return (
      <MarkCard
        key={row.key}
        studentName={row.studentName}
        fields={row.fields} />
    );
  }
  renderSeparator(sId, rId) {
    const { seperatorColor } = this.props;
    return (
      <View key={rId} style={{backgroundColor: seperatorColor , height: 1, flex: 1,}} />
    );
  }
  openDrawer() {
    global.drawer.openDrawer();
  }
  render() {
    const { bgColor, colors } = this.props;
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
          navIconName={"arrow-back"}
          onIconClicked={Router.pop} />
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          pageSize={15}
          initialListSize={15}
          scrollRenderAheadDistance={400}
          onEndReachedThreshold={50}
          scrollRenderAheadDistance={400}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.load.bind(this)}
              tintColor={'white'}
              title="Loading..."
              colors={[colors.dark, colors.primary, colors.light]}
              progressBackgroundColor={'white'}
            />
          }
          />
      </View>
    );
  }
}

export default connect(state => ({
  bgColor: state.config.theme.colors.primary,
  footerColor: state.config.theme.colors.light,
  seperatorColor: state.config.theme.colors.divider,
  colors: state.config.theme.colors,
}), dispatch => ({}))(MarkView);
