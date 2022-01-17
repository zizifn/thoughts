import lodash from 'lodash'
const { isEqual, isObject } = lodash;

const entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
        dd1: {
          ddd1: '12344'
        }
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  },
  d: {
    d1: {
      d11: 'ddddd'
    },
    d2: {
      d22: 'ddddd'
    }
  }
}

const obj1 = {
  'd.d2.d22': 'ddddd',
  'd.d1.d11': 'ddddd',
  'a.e': 'ae',
  'a.d.xx': 'adxx',
  'a.b.c.dd1.ddd1': '12344',
  'a.b.c.dd': 'abcdd'
};

function transform(obj) {

  const stack = [...Object.entries(obj).map(([key, value], index) => [key, value, key])];
  const nodes = [];
  const result = {};
  for (; stack.length;) {
    const [key, value, path] = stack.pop();
    nodes.push([key, value, path])
    if (isObject(value)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        stack.push([subKey, subValue, `${path}.${subKey}`])
      }
    } else {
      result[path] = value;
    }
  }
  // console.log(nodes);
  console.log(result);
  return result
}

if (!isEqual(transform(entry), obj1)) {
  console.error('[transform]------------- not equal');
}

function stringToObj(strObj1) {
  /** @type {Object.<string, any>} */
  const result = {};
  Object.keys(strObj1).forEach((key, index) => {
    const keyArray = key.split('.');
    let temp = result;
    keyArray.forEach((value, index) => {
      if (!temp[value]) {
        temp[value] = {};
        if (index === keyArray.length - 1) {
          temp[value] = strObj1[key]
        }
      }
      temp = temp[value]
    })
  })
  // console.log(result);
  return result;
}

if (!isEqual(stringToObj(obj1), entry)) {
  console.error('[stringToObj]--------not equal');
}