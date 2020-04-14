import Watcher from "./watcher";
// 模拟实现 vm.$watch 方法
/**
 * {string | Function} expOrFn
 * {Function | Object} callback
 * {Object} [options]
 *  {boolean} deep
 *  {boolean} immediate
 * 
 * 返回值：{Function} unwatch
 */
export default function $watch(expOrFn, cb, options = {}) {
  const vm = this;
  const watcher = new Watcher(vm, expOrFn, cb, options);
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unwatch() {
    watcher.teardown();
  }
}