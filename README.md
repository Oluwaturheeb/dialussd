# dialussd

## Getting started

`$ yarn add dialussd`

### Mostly automatic installation

`$ react-native link dialussd`

## Usage
```javascript
import DialUssd from 'dialussd';

let const dial = async (codeToDial) => {
  let resp = await DialUssd.send(codeToDial);

  // handle the respose 
}
```
