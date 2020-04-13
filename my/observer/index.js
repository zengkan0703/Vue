import Dep from "./dep";
import { arrayMethods } from "./array";

// 最基础的响应式原理
function defineReactive(data, key, val) {
  const childOb = observe(val);
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      if (childOb) {
        // 为什么要给孩子的 dep 收集依赖？
        // 这个主要是为了收集数组的依赖
        // 比如数据 data: { a: [1, 2] }, 在操作 data.a 时，必然会先触发 data.a 的 getter，
        // 所以在 data.a 中触发 data.a 这个数组的依赖收集，就可以在 data.a 变化时发出通知了
        childOb.dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  })
}

// 直接对数据进行
class Observer {
  constructor(data) {
    this.dep = new Dep(); // 方便 arrayMethods 的方法中能够拿到 dep 进行更新通知
    if (Array.isArray(data)) {
      // 数组
      data.__proto__ = arrayMethods;
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

export default function observe(value) {
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


