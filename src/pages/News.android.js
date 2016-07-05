import React from 'react';
import {
  ListView,
  StatusBar,
  Text,
  RefreshControl,
  View,
} from 'react-native';

import styles from './News.styles';
import AssistantApi from '../api';
import Toolbar from '../components/Toolbar';
import NewsCard from '../components/News/NewsCard';
import { connect } from 'react-redux';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
<<<<<<< HEAD:src/pages/News.android.js
<<<<<<< HEAD:src/pages/News.android.js
      isRefreshing: true,
=======
>>>>>>> d72904313486d7a0cc74b70b698cbc75e373d2e2:src/pages/News.js
=======
>>>>>>> d72904313486d7a0cc74b70b698cbc75e373d2e2:src/pages/News.js
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      page: 1,
      pageTotal: 1,
    };
  }
  async componentWillMount() {
    this.setState({
      isRefreshing: true,
    }, async () => {
      let sub = await AssistantApi.getSub(23, 1, 5);
      console.log(sub.data);
      // let data = '';
      this.setState({
        isRefreshing: false,
        data: this.state.data.concat(sub.data),
        // dataSource: this.state.dataSource.cloneWithRows(sub.data),
        pageTotal: sub.pageTotal,
      });
    });

  }
  async loadNext() {
    this.setState({
      isRefreshing: true,
    });
    console.log(this.state.page);
    console.log(this.state.data);
    if(this.state.page === this.state.pageTotal || this.state.data === [])
      return;
    let sub = await AssistantApi.getSub(23, this.state.page + 1, 5);
    this.setState({
      isRefreshing: false,
      data: this.state.data.concat(sub.data),
      dataSource: this.state.dataSource.cloneWithRows(this.state.data.concat(sub.data)),
      // dataSource: this.state.dataSource.cloneWithRows(sub.data.concat(this.state.data)),
      page: this.state.page + 1,
    });
  }
  renderRow(row) {
    try {
    const dateString = `${row.date.getFullYear()}年${row.date.getMonth()+1}月${row.date.getDate()+1}日`;
    return (
      <NewsCard
        key={row.key}
        author={row.author}
        date={dateString}
        title={row.title}
        summary={row.summary} />
    );
    } catch(err) {
      alert(err.title);
      console.log(row);
    }
  }
  renderSeparator() {
    const { seperatorColor } = this.props;
    return (
      <View style={{backgroundColor: seperatorColor , height: 5, flex: 1,}} />
    );
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
        <Toolbar title={this.props.title} />
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator.bind(this)}
          pageSize={15}
          initialListSize={15}
          scrollRenderAheadDistance={400}
          onEndReachedThreshold={50}
          scrollRenderAheadDistance={400}
          onEndReached={this.loadNext.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
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
  seperatorColor: state.config.theme.colors.light,
  bgColor: state.config.theme.colors.primary,
  colors: state.config.theme.colors,
}), dispatch => ({}))(News);
