import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import DialUssd from 'dialussd';

const App = () => {
  const [response, setResponse] = useState({
    status: 'starting',
    message: '--',
  });

  useEffect(() => {
    (async () => {
      const perm = await PermissionsAndroid.request(
        'android.permission.CALL_PHONE',
      );

      if (perm == 'granted') {
        let call = await DialUssd?.send('*461*4#');
        console.log(call);
        setResponse({
          status: 'native callback received',
          message: call,
        });
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>☆DialUssd example☆</Text>
      <Text style={styles.instructions}>STATUS: {response.status}</Text>
      <Text style={styles.welcome}>☆NATIVE CALLBACK MESSAGE☆</Text>
      <Text style={styles.instructions}>{response.message}</Text>
    </View>
  );
};

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

export default App;
