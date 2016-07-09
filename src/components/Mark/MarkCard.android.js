import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import styles from './MarkCard.styles';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class MarkCard extends React.Component {
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
    const { dark, light, primary, divider } = this.props.colors;
    return (
      <View style={styles.card}>
        <View style={styles.inner}>
          <TouchableHighlight style={styles.switcher} underlayColor={light} onPress={this.switch.bind(this)}>
            <View style={styles.switcherInner}>
              <View style={styles.left}>
                <Text style={styles.className}>
                {this.props.studentName}
                </Text>
              </View>
              <View style={styles.right}>
                <Icon style={styles.arrow} name={(this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down')} size={24} color={dark} />
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.exams}>
            {(this.state.expanded && this.props.fields) && this.props.fields.map((v, k) => {
              return(
                <View
                  key={k}
                  style={[styles.examSwitcher, { borderTopWidth: 1, borderTopColor: divider }]}>
                  <View style={styles.switcherInner}>
                    <View style={styles.left}>
                      <Text style={styles.examName}>
                      {v.field}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.examName}>
                      {v.value}
                      </Text>
                    </View>
                  </View>
                </View>
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
}), dispatch => ({}))(MarkCard);
