const test = 'test';

const array = [1, 2, 3, 4, 5]
for (let index = 0, getI = () => {
  console.log(index)
  return index;
}; index < array.length; index++) {
  const element = array[index];
  console.log(element, index)
  getI()

}