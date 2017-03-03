import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button
} from 'react-native';
import Welcome from './Welcome';
import BaseScene from './BaseScene';

class Add extends BaseScene {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      age: null,
    }
  }
  
  _openPage() {
    this.props.navigator.push({
      component: Welcome,
      params: {
        name: this.state.name,
        age: this.state.age,
        changeMyAge: (age) => {
          this.setState({age})
        }
      }
    })
  }
  
  render() {
    return (
      <View style={{ backgroundColor: '#F0F0F0'}}>
        <View style={{height: 40, backgroundColor: '#AAAAAA', flexDirection: 'row', justifyContent: 'center'}}>
          <Text>hello</Text>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({name})}
            placeholder={'Enter your name'}
            style={{height: 40, width: 200}}/>
        </View>
        <Text>Form Page</Text>
        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          placeholder={'Enter your name'}
          style={{height: 40, width: 200}}/>
        <Text>My age: {this.state.age ? this.state.age : 'Unknown'}</Text>
        <TouchableOpacity onPress={this._openPage.bind(this)}>
          <Text style={{color: '#55ACEE'}}>Update my age</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default Add;