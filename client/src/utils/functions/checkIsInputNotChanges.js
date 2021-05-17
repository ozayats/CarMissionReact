export const checkIsInputNotChanges = (values, sourceObj) => {
  let isNotChanged;
  for (const key in values) {
    if (sourceObj[key] === values[key]) {
      isNotChanged = true;
    } else if (Array.isArray(sourceObj[key])) {
      return (
        sourceObj[key].length === values[key].length &&
        sourceObj[key].every((val, index) => val === values[key][index])
      );
    } else {
      isNotChanged = false;
      return isNotChanged;
    }
  }
  return isNotChanged;
};
