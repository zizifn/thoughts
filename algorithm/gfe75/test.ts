export function isPlainObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

export function isObject(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const type = typeof value;
  return type === "object" || type === "function";
}

export function isPlainObjectAlternative(value) {
  if (!isObject(value)) {
    return false;
  }

  // For objects created via Object.create(null);
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    console.log(proto);
    proto = Object.getPrototypeOf(proto);
  }
  console.log(proto);
  console.log(Object.getPrototypeOf(value));
  return Object.getPrototypeOf(value) === proto;
}

const testPro = {
  test: 1,
};

// console.log(isPlainObject(Object.create(Object.create(Object.prototype))));
console.log(
  isPlainObjectAlternative(Object.create(Object.create(Object.prototype)))
);
