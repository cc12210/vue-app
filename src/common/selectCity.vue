<template>
  <div class="filter">
    <div class="allCity">全城</div>
    <div class="pinpai">品牌</div>
    <div class="special">特色</div>
  </div>
</template>

<script>
export default {
  name: "selectcity",
  data() {
    return {
      
    };
  }
};
</script>

<style lang="scss">
.top {
  position: absolute;
  top: 90px;
}
.filter {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  box-sizing: border-box;
  // position: absolute;
  // top: 94px;
  display: flex;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  color: #333;
  div {
    flex: 1;
  }
  div:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 5px solid #b2b2b2;
    transform: translateY(2px);
    margin-left: 5px;
  }
}
</style>
