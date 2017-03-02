import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ListView,
  Picker
} from 'react-native';
import Login from './Login';
import BaseScene from './BaseScene';
import Hello from './Hello';
import ButtonOpen from './ButtonOpen';
import Table, {SimpleCell} from 'react-native-easy-table';
import Frisbee from 'frisbee';
import MyCamera from './MyCamera';

//import Promise from 'bluebird';
var ImagePicker = require('react-native-image-picker');

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
              takePhotoButtonTitle:'拍照',
              chooseFromLibraryButtonTitle:'本地图册',
              cancelButtonTitle:'取消',
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
              if (response.didCancel) {
                alert('User cancelled image picker');
              } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
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
      </View>
    );
  }
}

export default Splash;