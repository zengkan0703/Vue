// [Vue warn]: Error in nextTick: "NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
// 这个例子主要用来熟悉这个报错
const pop = {
  name: "Pop",
  mounted() {
    if (this.$el) {
      document.body.appendChild(this.$el);
    }
  },
  destroyed() {
    if (document.body.contains(this.$el)) {
      document.body.removeChild(this.$el);
    }
  },
  render(h) {
    return h("div", [
      h("h1", "一则头条")
    ])
  }
}

new Vue({
  el: "#app",
  components: {
    pop
  },
  data: {
    show: false,
    show2: true
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      this.show2 = !this.show2;
    }
  },
  template: `
    <div>
      <pop v-if="show2"></pop>
      <h2 v-if="show">hhhh</h2>
      <button @click="handleClick">点击</button>
    </div>
  `
})