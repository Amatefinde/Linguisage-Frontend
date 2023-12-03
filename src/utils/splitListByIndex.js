export default function splitListByIndex(list) {
  const oddObjects = [];
  const evenObjects = [];

  list.forEach((object, index) => {
    if (index % 2 === 0) {
      evenObjects.push(object);
    } else {
      oddObjects.push(object);
    }
  });

  return [evenObjects, oddObjects];
}
