/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Frisbee from 'frisbee';
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView
} from 'react-native';
import BaseComponent from './BaseComponent';

const api = new Frisbee({
  baseURI: 'http://192.168.28.2:3000'
});

class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: 'init' };
    
    // 每1000毫秒对showText状态做一次取反操作
    setInterval(async() => {
      let res = await api.get('/debug').then(function (res) {
        return res.body;
      }).catch(function (err) {
        return err;
      });
      /*if (res) {
        this.setState({ showText: res.world });
      } else {
        this.setState({ showText: 'Is Error!' });
      }*/
    }, 2000);
  }
  
  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText;
    return (
      <Text>{display}</Text>
    );
  }
}

class FixedDimensionsBasics extends Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
      </View>
    );
  }
}

class FlexDimensionsBasics extends Component {
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={{height: 60, width:385}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} ><Text>hello</Text></View>
        <View style={{flex: 2, backgroundColor: 'skyblue', flexDirection: 'row'}}>
          <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
          <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
          <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
          <Image source={require('../images/Bananavarieties.jpg')} style={{width: 50, height: 30}}/>
        </View>
      </View>
    );
  }
}

class FlexDirectionBasics extends Component {
  render() {
    return (
      // 尝试把`flexDirection`改为`column`看看
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class JustifyContentBasics extends Component {
  render() {
    return (
      // 尝试把`justifyContent`改为`center`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class AlignItemsBasics extends Component {
  render() {
    return (
      // 尝试把`alignItems`改为`flex-start`看看
      // 尝试把`justifyContent`改为`flex-end`看看
      // 尝试把`flexDirection`改为`row`看看
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, borderColor:'#F2F2F2', borderWidth:2}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 2, fontSize: 14, width:300, borderColor:'#F2F2F2', borderWidth:2}}>
          {this.state.text?this.state.text:'No Message!'}
        </Text>
      </View>
    );
  }
}

class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel'
      ])
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}


export default class Hello extends BaseComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Bananas />
        <Greeting name='Rexxar' />
        <Blink text='I love to blink' />
        <FlexDimensionsBasics />
        <PizzaTranslator />
        <View style={{width:385, height:60}}>
          <ListViewBasics/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 24,
    color: '#FF0000',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
