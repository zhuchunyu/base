/**
 * Index
 * @yourtion
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView
} from 'react-native';

import CalendarDemo from './DemoCalendar/CalendarDemo';
import TabMenuDemo from './DemoTabMenu/TabMenuDemo';

export default class Index extends Component {
  render() {
    return (
      <CalendarDemo />
      
      //<TabMenuDemo />
    );
  }
}

