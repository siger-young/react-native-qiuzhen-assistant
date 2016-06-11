import React from 'react';
import {
  ListView,
  StatusBar,
  Text,
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
      data: [{
        author: 'SigerYoung',
        date: new Date('1989/06/04'),
        title: '求真中学开展六四悼念活动',
        summary: '在1989年6月4日的学生运动中',
      }],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      page: 1,
      pageTotal: 1,
    };
  }
  async componentWillMount() {
    let sub = await AssistantApi.getSub(23);
    console.log(sub.data);
    // let data = '';
    this.setState({
      data: this.state.data.concat(sub.data),
      // dataSource: this.state.dataSource.cloneWithRows(sub.data),
      pageTotal: sub.pageTotal,
    });
  }
  async loadNext() {
    console.log(this.state.page);
    console.log(this.state.data);
    if(this.state.page === this.state.pageTotal)
      return;
    let sub = await AssistantApi.getSub(23, this.state.page + 1);
    this.setState({
      data: this.state.data.concat(sub.data),
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
    const { bgColor } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          //idden={true}
          //backgroundColor={bgColor}
          translucent={true}
          barStyle={"light-content"} />
        <Toolbar title={this.props.title} />
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator.bind(this)}
          pageSize={15}
          initialListSize={15}
          onEndReachedThreshold={50}
          onEndReached={this.loadNext.bind(this)} />
      </View>
    );
  }
}

export default connect(state => ({
  seperatorColor: state.config.theme.colors.light,
  bgColor: state.config.theme.colors.primary,
}), dispatch => ({}))(News);
