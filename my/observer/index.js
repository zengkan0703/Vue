import Dep from "./dep";
import { arrayMethods } from "./array";

// 最基础的响应式原理
function defineReactive(data, key, val) {
  const childOb = this.observe(val);
  const dep = new Dep;
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      dep.notify();
      val = newVal;
    }
  })
}

// 直接对数据进行
class Observer {
  constructor(data) {
    this.data = data;
    this.dep = new Dep(); // 方便 arrayMethods 的方法中能够拿到 dep 进行更新通知
    if (Array.isArray(data)) {
      // 数组
      arr.__proto__ = arrayMethods;
      this.arrayReactive(data);
    } else {
      this.walk(data);
    }
    data.__ob__ = this;
  }
  // 对象的每一个 key 做响应式处理
  walk(data) {
    for (let key in data) {
      defineReactive(data, key, data[key]);
    }
  }
  arrayReactive(arr) {
    // 数组中的每一项也进行响应式处理
    arr.forEach(d => observe(d));
  }
}

function observe(value) {
  if (typeof value !== "object") {
    return;
  }
  if (value.hasOwnProperty("__ob__") && value.__ob__ instanceof Observer) {
    // 存在 __ob__ ，说这个对象已经响应式处理过
    return value.__ob__;
  } else {
    return new Observer(value);
  }
}


