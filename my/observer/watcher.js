import Dep from "./dep";

// 用来管理具体的更新函数
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parseExp(expOrFn);
    }
    this.depsId = new Set();
    this.deps = [];
    this.cb = cb;
    // this.get() 要放在最后，在这里面就会进行依赖收集
    // 如果放在前面，this.depsId  this.deps 就会在没有声明时使用，导致报错
    this.value = this.get();
  }
  get() {
    Dep.target = this;
    // 访问对应的值，来触发该值的 getter，从而触发 Dep 收集依赖
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = undefined;
    return value;
  }
  addDep(dep) {
    // 避免重复插入
    if (!this.depsId.has(dep.id)) {
      this.deps.push(dep);
      dep.addSub(this);
      this.depsId.add(dep.id);
    }
  }
  update() {
    const oldVal = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldVal);
  }
}
// 解析路径，返回获取目标值的函数
function parseExp(exp) {
  if (/[^\w.]/.test(exp)) {
    // 表达式不合法
    return;
  }
  const arr = exp.split(".");
  return function(obj) {
    // 遍历，访问这个属性链上的所有值
    for (let i = 0; i < arr.length; i++) {
      obj = obj[arr[i]];
    }
    return obj
  }
}
