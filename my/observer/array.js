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
      const value = arrayPrototype[method](...params);
      const ob = this.__ob__;
      // 数组有变化时通知更新
      ob.dep.notify();
      // 对加入数组的元素做响应式处理
      ob.arrayReactive(inserted);
      return value;
    }
  })
})
