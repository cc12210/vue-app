<template>
  <nav class="tabs">
    <slot/>
  </nav>
</template>

<script>
export default {
  name: "tabs",
  props: {
    value: Number
  },
  methods: {
    //处理tab的点击事件
    cancelTabActive(tabName) {
      let vnode = this.$slots.default;
      let tabItems = vnode.map((item, index) => {
        return item.componentInstance;
      });
      tabItems.map((item, index) => {
        item.isActive = false;
        if (item.name == tabName) {
          //拿到下标之后触发点击事件
          // this.$emit("tabChange", index);
          this.$emit("input", index);
        }
      });
    }
  },
  mounted() {
    this.$slots.default[0].componentInstance.isActive = true;
  }
};
</script>

<style>
.tabs {
  width: 100%;
  height: 49px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
}
</style>
