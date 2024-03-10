# dialussd

## Getting started

`$ yarn add dialussd`

### Mostly automatic installation

## Usage
```javascript
import DialUssd from 'dialussd';

const dial = async (codeToDial) => {
  let resp = await DialUssd.send(codeToDial);

  // handle the respose 
}
```
