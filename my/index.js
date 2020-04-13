import $watch from "./observer/$watch";
import observe from "./observer/index.js";

Object.prototype.$watch = $watch;
const data = {
  a: 2,
  b: 3,
  c: {
    d: {
      e: 6
    }
  }
};
observe(data)
data.$watch("a", (newVal, old) => {
  console.log(`a变化了${old} ---> ${newVal}`)
})
data.$watch("b", (newVal, old) => {
  console.log(`b变化了${old} ---> ${newVal}`)
})
data.$watch("c.d.e", (newVal, old) => {
  console.log(`c.d.e变化了${old} ---> ${newVal}`)
})
setTimeout(() => {
  data.a = 100
  data.b = 30
  data.c.d.e = 90
},1000)