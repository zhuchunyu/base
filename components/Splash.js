import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ListView,
  Picker,
  AsyncStorage,
  CameraRoll
} from 'react-native';
import Login from './Login';
import BaseScene from './BaseScene';
import Hello from './Hello';
import ButtonOpen from './ButtonOpen';
import Table, {SimpleCell} from 'react-native-easy-table';
import Frisbee from 'frisbee';
import MyCamera from './MyCamera';
import Add from './Add';
import List from './List';
import CameraRollDemo from './CameraRollDemo';
import CommomAPIDemo from './CommomAPIDemo';
import AsyncStorageDemo from './AsyncStorageDemo';

//import Promise from 'bluebird';
var ImagePicker = require('react-native-image-picker');

import Storage from 'react-native-storage';

var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  
  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24,
  
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
  
  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
  //sync: require('./sync')
});

const api = new Frisbee({
  baseURI: 'http://192.168.217.71:3000'
});

class Splash extends BaseScene {
  
  constructor(props) {
    super(props);
    
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([{name: 'Jack'}]),
      text: 'Init Value!'
    };
  }
  
  _openPage() {
    this.props.navigator.push({
      title: 'Login',
      component: Login
    })
  }
  
  _openHello() {
    this.props.navigator.push({
      title: 'Hello',
      component: Hello
    })
  }
  
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
        <Text>Splash Page</Text>
        
        <TouchableOpacity onPress={this._openPage.bind(this)}>
          <Text style={{color: '#55ACEE'}}>Open New Page</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this._openHello.bind(this)}>
          <Text style={{color: '#55ACEE', fontSize: 24}}>Hello Page!</Text>
        </TouchableOpacity>
        
        <View style={{width: 350, height: 35, flexDirection: 'row'}}>
          <Button title="ButtonOpen" onPress={(() => {
            this.props.navigator.push({
              title: 'ButtonOpen',
              component: ButtonOpen
            })
          }).bind(this)}/>
          <Button title="Request" onPress={(async() => {
            let res = await api.get('/category/json').then(function (res) {
              return res.body;
            }).catch(function (err) {
              return err;
            });
            
            this.setState({text: 'success', dataSource: this.ds.cloneWithRows(res.data)});
            
            // More info on all the options is below in the README...just some common use cases shown here
            var options = {
              title: '选择',
              takePhotoButtonTitle: '拍照',
              chooseFromLibraryButtonTitle: '本地图册',
              cancelButtonTitle: '取消',
              storageOptions: {
                skipBackup: true,
                path: 'images'
              }
            };
            
            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info below in README)
             */
            ImagePicker.showImagePicker(options, (response) => {
              console.log('response', response);
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                let source = {uri: response.uri};
                
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                
                alert('url:' + response.uri);
              }
            });
          }).bind(this)}/>
          
          <Button title="照相机" onPress={(() => {
            this.props.navigator.push({
              title: '照相机',
              component: MyCamera
            })
          }).bind(this)}/>
        </View>
        <Text>{this.state.text}</Text>
        <Picker
          style={{width: 300, backgroundColor: '#F0F0F0'}}
          selectedValue={this.state.text}
          onValueChange={(lang) => this.setState({text: lang})}>
          <Picker.Item label="Java" value="java"/>
          <Picker.Item label="JavaScript" value="js"/>
        </Picker>
        <View style={{paddingTop: 5, width: 350, height: 100, backgroundColor: '#F0F0F0', marginTop: 2}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.name}</Text>}
            style={{flex: 1}}
          />
        </View>
        <View style={{width:350, height:35, justifyContent: 'center',
          alignItems: 'center', flexDirection: 'row'}}>
          <Button title="添加用户" onPress={(() => {
            this.props.navigator.push({
              title: '添加用户',
              component: Add
            })
          }).bind(this)} />
          <Button title="用户列表" onPress={(() => {
            this.props.navigator.push({
              title: '用户列表',
              component: List
            })
          }).bind(this)} />
  
          <Button title="原生相册" onPress={(() => {
            this.props.navigator.push({
              title: '原生相册',
              component: CameraRollDemo
            })
          }).bind(this)} />
  
          <Button title="组件" onPress={(() => {
            this.props.navigator.push({
              title: '组件',
              component: CommomAPIDemo
          })
          }).bind(this)} />
  
          <Button title="存储" onPress={(() => {
            this.props.navigator.push({
              title: '存储',
              component: AsyncStorageDemo
            })
          }).bind(this)} />
        </View>
      </View>
    );
  }
}

class MyTable extends Component {
  render() {
    return (
      <Table rowTitle={['A', 'B', 'C', 'D', 'E']}
             columnTitle={['a', 'b', 'c', 'd', 'e']}
             rowComponent={{com: SimpleCell, style: {height: 30}}}
             columnComponent={{com: SimpleCell}}
             crossComponent={{com: SimpleCell}}
             crossData={'X'}
             cellData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]}
             cellComponent={{com: SimpleCell, style: [{height: 30}]}}
             highlightAndColor={{color: 'red'}}
             crossHighlight
             style={{width: 350, borderColor: '#F2F2F2', borderWidth: 2}}
      />
    );
  }
}

export default Splash;