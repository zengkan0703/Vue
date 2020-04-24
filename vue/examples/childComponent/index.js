Vue.config.devtool = true;
Vue.config.performance = true;
// 定时器多的话两种方式的内存差异还挺大，但是不清楚为什么重排次数也差很大

// const child = {
//   name: "child",
//   props: {
//     time: String
//   },
//   render(h) {
//     return h("h1", this.time)
//   }
// }

// new Vue ({
//   el: "#app",
//   data: {
//     time: new Date().toString()
//   },
//   components: {
//     child
//   },
//   mounted() {
//     setInterval(() => {
//       this.time = new Date().toString()
//     }, 1000)
//   },
//   render(h) {
//     return h("div", new Array(100).fill(0).map(() => {
//       return h(child, {
//         props: {
//           time: this.time
//         }
//       })
//     }))
//   }
// })

const child2 = {
  name: "child2",
  data: () => ({
    time: new Date().toString()
  }),
  mounted() {
    setInterval(() => {
      this.time = new Date().toString()
    }, 1000)
  },
  render(h) {
    return h("h1", this.time)
  }
}

new Vue({
  el: "#app",
  components: {
    child2
  },
  render(h) {
    return h("div", new Array(100).fill(0).map(() => {
      return h(child2)
    }))
  }
})