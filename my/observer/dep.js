// Dep 用来存储和管理 Watcher
let _uid = 0;
export default class Dep {
  constructor() {
    this.subs = [];
    this.id = _uid++;
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(sub) {
    this.subs.push(sub);
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