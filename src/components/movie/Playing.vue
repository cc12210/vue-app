<template>
  <div class="playing">
    <li v-for="(item,index) in playList" :key="index" class="playing_item" @click="goMovieInfo(item.id)">
      <!-- <a href="javascript://" class="a_container"> -->
      <div class="playImg">
        <img :src="item.img" alt="">
      </div>
      <div class="playContent">
        <div class="movieInfo">
          <p class="movie_tit">
            <span class="movie_title">{{item.nm}}</span>
            <span v-if="item.version=='v3d imax'" class="max3d is3d"></span>
            <span v-else-if="item.version=='v3d'" class="v3d is3d"></span>
          </p>
          <p class="grade sc" v-if="item.sc>0">
            <span id="cancelColor">观众评&nbsp;</span>{{item.sc}}</p>
          <p class="grade sc" v-else>{{item.wish}}
            <span id="cancelColor">&nbsp;人想看</span>
          </p>
          <p class="star" v-if="item.star!=''">主演：{{item.star}}</p>
          <p class="star">{{item.showInfo}}</p>
        </div>
        <div class="buy_ticket">
          <span class="buy_now" v-if="item.globalReleased">购票</span>
          <span class="buy_after" v-else>预售</span>
        </div>
      </div>
      <!-- </a> -->
    </li>
  </div>
</template>

<script>
import Vue from "vue";
import vuex from "vuex";
import {
  getPlayingList,
  getMorePlayingList
} from "../../services/movieService";
export default {
  data() {
    return {
      playList: [],
      playIds: []
    };
  },
  methods: {
    //请求下一页数据
    getMoreData() {
      //   深拷贝id的值,不然分割会出问题
      let ids = [...this.playIds];
      // 分割id数据
      ids = ids.splice(this.playList.length, 10);
      //组装请求参数
      let movieIds = ids.join(",");
      getMorePlayingList(movieIds, this.$store.state.ciId).then(result => {
        this.playList = [...this.playList, ...result];
        if (this.playList.length != this.playIds.length) {
          this.$center.$emit("changeLoadMore");
        } else {
          return;
        }
      });
    },
    goMovieInfo(movieId) {
      this.$router.push({
        path: "/movieInfo",
        name: "movieInfo",
        params: {
          id: movieId
        }
      });
    }
  },
  created() {
    getPlayingList(this.$store.state.ciId).then(({ data, ids }) => {
      this.playList = data;
      this.playIds = ids;
    });
    console.log(this.$store.state);
  },
  mounted() {
    this.$center.$on("morePlaying", () => {
      this.getMoreData();
    });
  }
};
</script>

<style lang="scss">
.playing {
  width: 100%;
  // height: 100%;
  padding: 0 10px;
  .playing_item {
    display: flex;
    padding: 5px;
    .playImg {
      width: 64px;
      height: 90px;
      img {
        width: 64px;
      }
    }
    .playContent {
      width: 80%;
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      position: relative;
      .movieInfo {
        width: 70%;
        text-indent: 10px;
        .movie_title {
          font-size: 17px;
          color: #333;
          font-weight: 700;
          display: inline-block;
          width: 70%;
          text-indent: 0px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          position: relative;
        }
        .is3d {
          position: absolute;
          top: 10px;
        }
        .grade,
        .star,
        .showInfo {
          font-size: 13px;
          color: #666;
        }
        .star {
          margin-top: 6px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .sc {
          color: #faaf00;
          font-weight: 700;
          font-size: 15px;
        }
        #cancelColor {
          font-size: 13px;
          color: #666;
          font-weight: normal;
        }
        .max3d,
        .v3d {
          display: inline-block;
          width: 43px;
          height: 14px;
          background: url(../../assets/3dmax.png) no-repeat;
          background-size: 100%;
        }
        .v3d {
          background: url(../../assets/3d.png) no-repeat;
          background-size: 50%;
        }
      }
      .buy_ticket {
        position: absolute;
        top: 40px;
        right: 20px;
        .buy_now,
        .buy_after {
          display: block;
          width: 47px;
          height: 27px;
          line-height: 28px;
          text-align: center;
          background-color: #f03d37;
          color: #fff;
          border-radius: 4px;
          white-space: nowrap;
          font-size: 12px;
          cursor: pointer;
        }
        .buy_after {
          background: #3c9fe6;
        }
      }
    }
  }
}
</style>
