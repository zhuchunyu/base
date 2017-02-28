import React, {Component} from 'react';
import {AppRegistry, Navigator, Text, View} from 'react-native';

import MyScene from './components/MyScene';
import Test from './components/test';
import Hello from './components/Hello';

class MyProject extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: 'My Initial Scene', index: 0}}
        renderScene={(route, navigator) => {
          if (route.title === 'Hello') {
            return <Hello navigator={navigator} route={route} />
          }
          if (route.index < 2) {
            return <MyScene
              title={route.title}
              
              // Function to call when a new scene should be displayed
              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Scene ' + nextIndex,
                  index: nextIndex
                });
              }}
              
              // Function to call to go back to the previous scene
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }}

              toHello={() => {
                const nextIndex = route.index + 1;
                navigator.push({
                  title: 'Hello',
                  index: nextIndex
                });
              }}
              
              navigator={navigator}
              route={route}
            />
          } else {
            return <Test onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }} navigator={navigator} route={route} />
          }
        }}
      />
    )
  }
}

AppRegistry.registerComponent('MyProject', () => MyProject);