export const isNullOrEmpty = value => {
  if (!value && value !== 0 && value !== false) {
    return true;
  }
  return false;
};

export const filterRequestEmptyParams = (
  obj,
  emptyFilter = value => !isNullOrEmpty(value)
) => {
  // in case that remove property from original object, create a brand new object
  // empty property indicate that the property cannot be undefined, null and empty string
  if (typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Array) {
    return obj.map(item => {
      // array is an spetical case
      return filterRequestEmptyParams(item);
    });
  }
  return Object.keys(obj)
    .filter(key => emptyFilter(obj[key]))
    .reduce((newObj, key) => {
      if (typeof obj[key] === 'object') {
        Object.assign(newObj, {
          [key]: filterRequestEmptyParams(obj[key])
        });
      } else {
        Object.assign(newObj, {
          [key]: obj[key]
        });
      }
      return newObj;
    }, {});
};
