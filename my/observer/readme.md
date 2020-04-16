这部分主要是 Vue 中数据响应式的流程，Vue（2.x）的响应式实现主要是 `Object.defineProperty` 这个 API，其具体实现分为下面几部分
- `observe` 函数，对数据进行响应式包装，如果该对象已经存在一个 `Observer` 实例，就直接返回这个实例，否则就给这个对象创建一个 `Observer` 实例
- `Observer` 类，用来处理对象或数组，使对象或数组的每一项都变成响应式的。如果是对象，就遍历这个对象的所有 key 执行 `defineReactive` 函数；如果是数组，就把包装过的数组拦截器方法挂载到数组上
- `defineReactive` 函数，真正用来处理对象的每一个 key，用 `Object.defineProperty` 把这个 key 转为 `getter/setter` 的形式。通过 `Dep` 类在 `getter` 中收集依赖，在 `setter` 中触发依赖。
- `Dep` 类，用来管理对象中每个 key 的依赖（也就是 `Watcher`）
- `Watcher` 类，作为一个中介，管理数据变更后要执行的具体函数，数据变化之后，`Dep` 会通知 `Watcher`，`Watcher` 再执行具体的回调函数来通知外界。
- 数组拦截器，是对能改变数组本身的 6 个方法做了一层包装，在这个方法中触发数组的依赖，从而实现数组的变化通知