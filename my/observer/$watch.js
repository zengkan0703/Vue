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
export default function $watch(expOrFn, cb, options) {
  const vm = this;
  new Watcher(vm, expOrFn, cb);
}