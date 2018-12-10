<template>
  <header class="app-header">
    <span class="left-btn">
      <slot/>
    </span>
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: {
    title: String
  }
};
</script>

<style scoped>
.app-header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #e54847;
  color: #fff;
  position: absolute;
}
h1 {
  font-size: 18px;
  font-family: "微软雅黑";
  font-weight: normal;
}
.left-btn {
  position: absolute;
  left: 10px;
  top: 0;
}
</style>
