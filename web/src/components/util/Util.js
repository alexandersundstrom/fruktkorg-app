/**
 * Generates a GUID like id.
 *
 * @return {String} The generated id.
 */
export const generateGuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

/**
 * Flattens a given array.
 *
 * @see _flattenArray
 *
 * @param {Any[]} array The array to be flattened.
 *
 * @return {Any[]} The flattened array.
 */
export const flattenArray = array => {
  return _flattenArray(array, []);
};

/**
 * Flattens a given array.
 *
 * @param {Any[]} array   The array to be flattened.
 * @param {Any[]} result  The resulting flattened array.
 *
 * @return {Any[]} The flattened array.
 */
const _flattenArray = (array, result) => {
  for (let item of array) {
    if (item.constructor === Array) {
      result = _flattenArray(item, result);
    } else {
      result.push(item);
    }
  }

  return result;
};
