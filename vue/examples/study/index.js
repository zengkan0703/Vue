/* global Vue */
const a = new Vue({
  el: "#app",
  data: {
    name: "曾侃",
    config: {
      age: 20
    }
  },
  render(h) {
    return h("div", {}, [
      "aaa",
      {text: "777"}
    ])
  }
})
console.log(a)