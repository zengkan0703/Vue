// 数据响应式处理
class Vue {
  constructor(options) {
    const { el, data } = options;
    this.$el = el;
    this.$data = data;
    // 对 data 进行响应式处理
    new Observer(data);
    // 把 $data 中的数据代理到 this 上，也就是 vue 实例上
    this.proxy(this, "$data");
    new Compile(el, this);
  }
  // 数据代理
  proxy(target, sourseKey) {
    const data = target[sourseKey];
    Object.keys(data).forEach(key => {
      let dep = new Dep();
      Object.defineProperty(target, key, {
        get() {
          // console.log(`读取 this.${key}`);
          Dep.target && dep.add(Dep.target);
          return data[key];
        },
        set(newVal) {
          // console.log(`设置 this.${key}: ${newVal}`);
          data[key] = newVal;
          dep.notify();
        }
      })
    })
    
  }
}

// 数据响应式处理
class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  // 数据劫持
  defineReactive(obj, key, val) {
    let value = val;
    Object.defineProperty(obj, key, {
      get() {
        // console.log(`读取 obj.${key}`);
        return value;
      },
      set(newVal) {
        if (newVal !== value) {
          // console.log(`设置 obj.${key}: ${newVal}`)
          value = newVal;
        }
      }
    })
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.el = document.querySelector(el);
    Array.from(this.el.childNodes).forEach(node => {
      this.compileNode(node);
    })
  }
  compileNode(node) {
    const res = node.textContent.match(/\{\{(.*)\}\}/);
    if (res && res[1]) {
      const key = res[1].trim();
      node.textContent = this.$vm[key];
      const watcher = new Watcher(this.$vm, key, () => {
        node.textContent = this.$vm[key];
      })
      // 把 watcher 暂存起来
      Dep.target = watcher;
      // 读取一次这个数据，然后在数据的 getter 中把 watcher 放到对应 key 的 Dep 中
      this.$vm[key];
      // watcher 放到 Dep 中之后置空 Dep.target
      Dep.target = null;
    }
  }
}
// 用来管理更新函数
class Watcher {
  constructor(vm, key, updater) {
    this.$vm = vm;
    this.$key = key;
    this.updater = updater;
  }
  update() {
    this.updater.call(this.$vm, this.$vm[this.$key])
  }
}
// 用来管理 watcher
class Dep {
  constructor() {
    this.watchers = [];
  }
  add(watcher) {
    this.watchers.push(watcher);
  }
  notify() {
    this.watchers.forEach(watcher => {
      watcher.update();
    })
  }
}

window.Vue = Vue;