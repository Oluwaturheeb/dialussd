import { NativeModules } from 'react-native';

const Module = NativeModules;

let DialUssd = {
  send (code) {
    return Module.DialUssd.send(code);
  }
};

export default DialUssd;
