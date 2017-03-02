import React, {Component} from 'react';
import {AppRegistry, Navigator, Text, View, TouchableOpacity, Platform} from 'react-native';

import MyScene from './MyScene';
import Test from './test';
import Hello from './Hello';

class MyProject extends Component {
  _renderNavBar() {
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    };
    
    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>Logo</Text>
            </TouchableOpacity>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if(index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>next</Text>
            </TouchableOpacity>
          );
        }
      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.title ? route.title : 'Splash'}</Text>
          </View>
        );
      }
    };
    
    return (
      <Navigator.NavigationBar
        style={{
          alignItems: 'center',
          backgroundColor: '#55ACEE',
          shadowOffset:{
            width: 1,
            height: 0.5,
          },
          shadowColor: '#55ACEE',
          shadowOpacity: 0.8,
        }}
        routeMapper={routeMapper}
      />
    );
  }
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
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
        navigationBar={this._renderNavBar()}
      />
    )
  }
}

AppRegistry.registerComponent('MyProject', () => MyProject);