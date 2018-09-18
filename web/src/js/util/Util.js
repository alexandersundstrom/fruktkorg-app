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

export const flattenArray = array => {
  return _flattenArray(array, []);
};

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
