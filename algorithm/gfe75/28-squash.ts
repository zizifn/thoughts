export default function squashObject(obj: Object): Object {
  throw "Not implemented!";
}

let object = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};

squashObject(object); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }

object = {
  a: { b: null, c: undefined },
};
squashObject(object); // { 'a.b': null, 'a.c': undefined }

object = { a: { b: [1, 2, 3], c: ["foo"] } };
squashObject(object); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }

object = {
  foo: {
    "": { "": 1, bar: 2 },
  },
};
squashObject(object); // { foo: 1, 'foo.bar': 2 }
