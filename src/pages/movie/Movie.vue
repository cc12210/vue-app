<template>
  <!-- <keep-alive> -->
  <div class="page" id="movie">
    <app-header title="猫眼电影"></app-header>
    <div class="sub-header">
      <span class="city-icon" @click="changeCity">{{this.$store.state.ci}}</span>
      <nav>
        <li v-for="(item,index) in navList" :class="{active:navIndex==index}" :key="index" @click="changeAction(index)">
          {{item}}
        </li>
      </nav>
      <span class="search-icon">
        <img src="../../assets/search.png" alt="">
      </span>
    </div>
    <app-content ref="content" class="content" :style="{top:'94px',bottom:'49px'}">
      <keep-alive>
        <!-- 正在热映 -->
        <playing v-if="navIndex==0" />
        <!-- 即将上映 -->
        <coming v-else-if="navIndex==1" />
      </keep-alive>
    </app-content>
  </div>
  <!-- </keep-alive> -->
</template>

<script>
import Playing from "../../components/movie/Playing";
import Coming from "../../components/movie/Comming";
export default {
  components: {
    coming: Coming,
    playing: Playing
  },
  data() {
    return {
      navIndex: 0,
      navList: ["正在热映", "即将上映"]
    };
  },
  methods: {
    changeAction(index) {
      this.navIndex = index;
      this.$refs.content.refresh();
    },
    changeCity() {
      this.$router.push("/citypage");
    }
  }
};
</script>

<style lang="scss">
.sub-header {
  width: 100%;
  height: 44px;
  position: absolute;
  top: 50px;
  left: 0;
  border-bottom: 1px solid #cec7c7;
  display: flex;
  line-height: 44px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  .city-icon {
    font-size: 15px;
    font-weight: normal;
    text-align: right;
  }
  .city-icon::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 5px solid #666;
    transform: translateY(2px);
    margin-left: 5px;
  }
  span {
    flex: 1;
  }
  nav {
    width: 70%;
    display: flex;
    li {
      flex: 1;
      margin: 0 12px;
      text-align: center;
      font-size: 15px;
    }
  }
  .search-icon img {
    width: 22px;
    margin: 12px 20px;
  }
  .active {
    border-bottom: 2px solid #e54847;
  }
}
</style>
