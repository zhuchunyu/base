import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, BackAndroid } from 'react-native';

export default class BaseComponent extends Component {
  constructor(props) {
    super(props);
  
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (props.navigator && props.navigator.getCurrentRoutes().length > 1) {
        props.navigator.pop();
        return true;
      } else {
        return false;
      }
    });
  }
}