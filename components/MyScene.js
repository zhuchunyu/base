import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, BackAndroid, Button } from 'react-native';
import BaseComponent from './BaseComponent';
import ButtonOpen from './ButtonOpen';

export default class MyScene extends BaseComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>点我进入下一场景</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>点我返回上一场景</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.toHello}>
          <Text>Hello</Text>
        </TouchableHighlight>
        <Button title="DETAIL" onPress={() => {
          alert('打开页面！');
        }} />
      </View>
    )
  }
}
