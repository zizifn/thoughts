// Implement a deepClone function that performs a deep clone operation
// on JavaScript objects.
// You can assume the input only contains
// JSON-serializable values (null, boolean, number, string, Array, Object)
// and will not contain any other objects like Date, Regex, Map or Set.

export default function deepClone<T>(value: T): T {
  if (!value) {
    return value;
  }
  const type = typeof value;
  if (type === "number" || type === "string" || type === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    const arrayItem = [];
    for (const item of value) {
      arrayItem.push(deepClone(item));
    }
    return arrayItem as unknown as T;
  }
  // is Object
  if (type === "object") {
    const obj: Record<string, any> = {};
    for (const [key, objValue] of Object.entries(
      value as Record<string, any>
    )) {
      obj[key] = deepClone(objValue);
    }
    return obj as T;
  }
  return value;
}

const obj1 = { user: { role: "admin" } };
const clonedObj1 = deepClone(obj1);
console.log(clonedObj1);

clonedObj1.user.role = "guest"; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: "baz" }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = "bax"; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.
