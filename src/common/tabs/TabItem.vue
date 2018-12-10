<template>
    <li class="tab" :class="{active:isActive}" @click="clickActive">
        {{name}}
    </li>
</template>

<script>
export default {
  name: "tab-item",
  props: {
    name: String
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    clickActive() {
      this.$parent.cancelTabActive(this.name);
      this.isActive = true;
    }
  }
};
</script>

<style>
.tab {
  border-top: 1px solid #ddd;
}
.active {
  color: #e54847;
}
.tabs .tab {
  flex: 1;
  line-height: 49px;
  text-align: center;
  cursor: pointer;
}
</style>
