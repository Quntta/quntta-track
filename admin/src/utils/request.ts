export default function (path: string, id: string) {
  return new Promise((resolve, reject) => {
    const result = Math.random() > 0.5;
    setTimeout(() => {
      if (!result) {
        reject('request error');
        return;
      }
      resolve({ name: 'quntta', age: 18, path: path, id });
    }, 1000);
  });
}
