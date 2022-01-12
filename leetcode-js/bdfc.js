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

function stringToObj(obj) {
  let rsult = {};
  for (const [keys, value] of Object.entries(obj)) {
    /** @type {string} */
    const keysAlias = keys;
    let temp = rsult;
    const keyArray = keysAlias.split(".");

    keyArray.forEach((key, index) => {
      if (!temp.hasOwnProperty(key)) {
        temp[key] = {};
        if (index === keyArray.length - 1) {
          temp[key] = value;
        }
      }
      temp = temp[key];
    })

    // rsult = { ...temp }
  }
  return rsult;

}
console.log(stringToObj(obj1));

function transform(obj) {
  const stack = [...Object.entries(obj)];
  const nodes = [];
  // let keys = [];
  const resut = {};

  while (stack.length) {
    const [key, value, path] = stack.pop();
    nodes.push([key, value, path || key]);
    if (typeof value === 'object') {
      for (const [key1, value1] of Object.entries(value)) {
        stack.push([key1, value1, `${path || key}.${key1}`]);
      }
    } else {
      resut[path] = value;
    }
  }
  return [resut, nodes];
}
const [result, nodes] = transform(entry);
console.log(result);
console.log(nodes);

// function fun1(obj, str = '', result = {}) {

//   Object.keys(obj).forEach((key) => {

//     if (typeof obj[key] == 'object') {
//       fun1(obj[key], str + key + '.', result)
//     } else {
//       str += key
//       result[str] = obj[key]
//     }
//   })
//   return result
// }
// console.log(fun1(entry));



// const result = {};
// let resultKey = '';
// for (const [key, value] of nodes) {
//   if (typeof value === 'string') {
//     result[resultKey.slice(1)] = value;
//     resultKey = '';
//   }
//   resultKey = `${ resultKey }.${ key } `

// }
// console.log(result);

// 要求转换成如下对象
const output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}