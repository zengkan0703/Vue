// Dep 用来存储和管理 Watcher
export default class Dep {
  constructor() {
    this.subs = [];
  }
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target)
    }
  }
  notify() {
    for(let i = 0; i < this.subs.length; i++) {
      this.subs[i].update();
    }
  }
  removeSub(sub) {
    const index = this.subs.findIndex(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }
}