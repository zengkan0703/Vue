/* global Vue */
new Vue({
  el: "#app",
  data: {
    name: "曾侃"
  },
  render(h) {
    return h("div", {}, [
      "aaa",
      {text: "777"}
    ])
  }
})