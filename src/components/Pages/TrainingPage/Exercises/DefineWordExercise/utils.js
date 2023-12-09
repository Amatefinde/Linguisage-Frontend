export default function pickTwoRandom(arr) {
  if (!arr || arr.length === 0) {
    return []; // Return empty array if array is empty
  } else if (arr.length === 1) {
    return [arr[0]]; // Return only one element if array has only one element
  } else {
    const indices = new Set();
    while (indices.size < 2) {
      indices.add(Math.floor(Math.random() * arr.length)); // Generate unique random indices
    }
    return Array.from(indices, (index) => arr[index]); // Convert set to array and pick elements
  }
}
