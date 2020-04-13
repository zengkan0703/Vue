import $watch from "./observer/$watch";
import observe from "./observer/index.js";

Object.prototype.$watch = $watch;
const data = {
  a: 2,
  b: [1,2],
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
  data.b.push({f: 5})
  data.c.d.e = 90
  setTimeout(() => {
    data.$watch("b.2.f", (newVal, old) => {
      console.log(`b.2.f变化了${old} ---> ${newVal}`)
    })
    data.b[2].f = 6
  }, 500)
},1000)

// const data = {
//   list: [1,2, {a: 2}]
// };
// observe(data);
// data.$watch("list.2.a", (newVal, old) => {
//   console.log(`list.2.a变化了${old} ---> ${newVal}`)
// })
// data.$watch("list", (newVal, old) => {
//   console.log(`list 变化了${old} ---> ${newVal}`)
// })
// setTimeout(() => {
//   data.list[2].a = 6;
//   data.list.push("999")
// }, 1000)
