import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './ExamCard.styles';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ExamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }
  static defaultProps = {
    className: '',
    exams: [],
  };
  static propTypes = {
    //className: React.PropTypes.string.isRequired,
    //exams: React.PropTypes.array.isRequired,
    //onClick: React.PropTypes.func.isRequired,
  };
  switch() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  render() {
    console.log(this.props.handler);
    const { dark, light, primary, divider } = this.props.colors;
    return (
      <View style={styles.card}>
        <View style={styles.inner}>
          <TouchableHighlight style={styles.switcher} underlayColor={light} onPress={this.switch.bind(this)}>
            <View style={styles.switcherInner}>
              <View style={styles.left}>
                <Text style={styles.className}>
                {this.props.className}
                </Text>
              </View>
              <View style={styles.right}>
                <Icon style={styles.arrow} name={(this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down')} size={24} color={dark} />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.exams}>
            {(this.state.expanded && this.props.exams) && this.props.exams.map((v, k) => {
              return(
                <TouchableHighlight
                  key={k}
                  style={[styles.examSwitcher, { borderTopWidth: 1, borderTopColor: divider }]}
                  underlayColor={light}
                  onPress={() => {this.props.handler(v.examLink)}}>
                  <View style={styles.switcherInner}>
                    <View style={styles.left}>
                      <Text style={styles.examName}>
                      {v.examName}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Icon style={styles.arrow} name={'keyboard-arrow-right'} size={24} color={primary} />
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  colors: state.config.theme.colors,
}), dispatch => ({}))(ExamCard);
