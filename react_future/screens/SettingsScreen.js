import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, View, TouchableHighlight } from 'react-native'
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  handleLogout() {

    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
    }, function (error) {
      console.error('Sign Out Error', error);
    });

  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (<View>
      <TouchableHighlight
        style={{
          height: 40,
          width: 160,
          borderRadius: 10,
          backgroundColor: "red",
          marginLeft: 50,
          marginRight: 50,
          marginTop: 20,
          padding: 10
        }} onPress={this.handleLogout}>
        <Text>Se déconnecter</Text>
      </TouchableHighlight>
    </View>

    )
  }
}
