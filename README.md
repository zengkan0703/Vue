#### Vue 初始化的过程

也就是 new Vue 的流程

1. Vue 构造函数
2. 调用 _init(options)，这是在 initMixin 给 Vue 原型对象定义的方法
   - 用户提供的 options 与默认 options 合并
   - initLifecycle，初始化生命周期相关的变量
   - initEvents
   - initRender，初始化 render 相关
   - callHook(vm, 'beforeCreate')，触发 beforeCreate 钩子
   - initInjections，初始化 inject 相关
   - initState
     - initProps
     - initMethods
     - initData，Data 中的数据代理到 vm 上，并对 data 进行响应式处理
     - initComputed
     - initWatch
   - initProvide，初始化 provide
   - callHook(vm, 'created')，触发 created 钩子，所以在 created 生命周期中可以访问 this 上的方法和属性
   - vm.$mount($el)，执行挂载



#### mount 流程

vm.$options.el 存在 ==> 执行 entry-runtime-with-compiler.js $mount

不存在的话，必须要手动执行 $mount

entry-runtime-with-compiler.js 的 $mount ：

-  vm.$options.render 存在，直接执行原有的 runtime/index 中的 $mount
-  vm.$options.render 不存在：
   - vm.$options.template 存在：
     - vm.$options.template 是 id 选择器，查找该元素并把该元素的 innerHTML 赋值给 template
     - 通过判断 template.nodeType 判断 vm.$options.template 是 DOM 节点，把 vm.$options.template 的 innerHTML 赋值给 template
     - 报错
   - vm.$options.template 不存在，但是 el (mount 方法参数)存在，获取 el 的 outerHTML 赋值给 template
   - 经过上面两步获取到 template 之后，调用 compileToFunctions 函数获得 render 函数

runtime/index 中的 $mount：执行 core/instance/lifecycle 中的 mountComponent 方法

- 赋值 vm.$el = el
- 触发 beforeMount 钩子
- 创建组件更新函数 updateComponent
- 新建 watcher 传入 updateComponent 方法
- 判断如果是根节点，执行 mounted 钩子



