export default function getTrueFields(object) {
  let trueFields = [];

  for (let field in object) {
    if (object[field] === true) {
      trueFields.push(field);
    }
  }

  return trueFields;
}
