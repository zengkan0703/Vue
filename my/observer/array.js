// 改变原数组的方法
const methodsKeys = [
  "push", "pop", "splice", "unshift", "shift", "reverse", 
]
const arrayPrototype = Array.prototype;
export const arrayMethods = Object.create(arrayPrototype);

methodsKeys.forEach(method => {
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    value: function(...params) {
      let inserted;
      switch(method) {
        case "push":
        case "unshift":
          inserted = params;
          break;
        case "splice":
          inserted = [params[2]];
          break;
      }
      // 要用 call 或者 apply 绑定下 this，否则就不是给当前数组执行的
      const value = arrayPrototype[method].call(this, ...params);
      const ob = this.__ob__;
      // 数组有变化时通知更新
      ob.dep.notify();
      // 对加入数组的元素做响应式处理
      ob.arrayReactive(inserted);
      return value;
    }
  })
})
