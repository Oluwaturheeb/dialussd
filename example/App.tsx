import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DialUssd from 'dialussd';

export default class App extends Component<{}> {
  state = {
    status: 'starting',
    message: '--',
  };
  componentDidMount() {
    (async () => {
      const perm = await PermissionsAndroid.request(
        'android.permission.CALL_PHONE',
      );

      if (perm == 'granted') {
        let call = await DialUssd?.dialUssd('*461*4#');
        this.setState({
          status: 'native callback received',
          message: call,
        });
      }
    })();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆DialUssd example☆</Text>
        <Text style={styles.instructions}>STATUS: {this.state.status}</Text>
        <Text style={styles.welcome}>☆NATIVE CALLBACK MESSAGE☆</Text>
        <Text style={styles.instructions}>{this.state.message}</Text>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
