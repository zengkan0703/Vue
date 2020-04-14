import $watch from "./observer/$watch";
import observe from "./observer/index.js";

Object.prototype.$watch = $watch;
Object.defineProperty(Object.prototype, "$watch", {
  enumerable: false,
  value: $watch
})
const data = {
  a: 2,
  f: 2,
  b: [1,2],
  c: {
    d: {
      e: 6
    }
  }
};
observe(data)
const unwatchA = data.$watch("a", (newVal, old) => {
  console.log(`a变化了${old} ---> ${newVal}`)
}, {immediate:true})
data.$watch("b", (newVal, old) => {
  console.log(`b变化了${old} ---> ${newVal}`)
})
data.$watch("c.d.e", (newVal, old) => {
  console.log(`c.d.e变化了${old} ---> ${newVal}`)
})
data.$watch("c", (newVal, old) => {
  console.log(`c 或者 c 的子值变化了`, newVal)
}, {deep: true})
setTimeout(() => {
  data.a = 100
  data.f = 200
  data.b.push({f: 5})
  data.c.d.e = 90
  setTimeout(() => {
    // 测试下新 push 进来的数组元素是否响应
    data.$watch("b.2.f", (newVal, old) => {
      console.log(`b.2.f变化了${old} ---> ${newVal}`)
    })
    data.b[2].f = 6
  }, 500)
},1000)

setTimeout(() => {
  // 取消监听
  unwatchA();
  data.a = 10;
}, 2000)

// $watch 第一个参数是函数 
data.$watch(function() {
  return data.a + data.f
}, (newVlaue, old) => {
  console.log(`data.a + data.f 变化了，${old} ===> ${newVlaue}`)
})