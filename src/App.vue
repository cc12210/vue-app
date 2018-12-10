<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <tabs v-model="selectIndex">
      <tab-item v-for="(tabItem,index) in tabList" :key="index" :name="tabItem.name">
      </tab-item>
    </tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      tabList: [
        { name: "电影", path: "/movie" },
        { name: "影院", path: "/cinema" },
        { name: "我的", path: "/mine" }
      ]
    };
  },
  watch: {
    selectIndex: {
      handler(value) {
        this.$router.push(this.tabList[value].path);
      }
    }
  },
  methods: {
    // tabChangeAction(index){
    //   console.log('点击了',index)
    // }
  }
};
</script>


<style lang="scss">
.page {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>
