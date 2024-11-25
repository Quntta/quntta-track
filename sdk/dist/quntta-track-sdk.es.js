const s = (o, n) => o + n, t = () => {
  console.log("init sdk");
}, c = () => {
  console.log("track");
};
console.log(s(1, 2));
console.log(1);
console.log("main.ts");
const l = {
  init: t,
  track: c
};
export {
  l as default
};
