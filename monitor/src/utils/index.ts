export const setItem = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key) || '';
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(value);
  } catch (e) {
    // console.log(e);
    parsedValue = value;
  }
  return parsedValue;
};
