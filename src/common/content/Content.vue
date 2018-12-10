<template>
  <div class="content" ref="content">
    <div class="wrap">
      <slot/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.prototype.$center = new Vue();
export default {
  name: "app-content",
  data() {
    return {
      canLoad: 1
    };
  },
  methods: {
    refresh() {
      this.contetnScroll.refresh();
      this.contetnScroll.scrollTo(0, 0);
    },
    changeLoadMore() {
      setTimeout(() => {
        this.canLoad = 1;
      }, 500);
    }
  },
  mounted() {
    this.contetnScroll = new IScroll(this.$refs.content, {
      click: true, //默认为false, 识别滚动视图内部的点击事件
      tap: true //默认为false, 识别滚动视图内部的移动端点击事件
    });
    this.contetnScroll.on("beforeScrollStart", () => {
      this.contetnScroll.refresh();
    });
    this.contetnScroll.on("scrollEnd", () => {
      // console.log('滑动结束');
      if (
        this.contetnScroll.y <= this.contetnScroll.maxScrollY &&
        this.canLoad == 1
      ) {
        this.canLoad = 0;
        //   触发加载更多
        this.$center.$emit("morePlaying");
      }
    });
    this.$center.$on("changeLoadMore", () => {
      this.changeLoadMore();
    });
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0px;
  overflow: hidden;
}
</style>
