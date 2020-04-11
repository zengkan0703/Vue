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