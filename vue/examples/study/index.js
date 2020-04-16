/* global Vue */
const a = new Vue({
  el: "#app",
  data: {
    name: "曾侃",
    config: {
      age: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this.name = "zengkan";
    },1000)
  },
  render(h) {
    return h("div", {}, [
      this.name,
      {text: "777"}
    ])
  }
})
console.log(a)