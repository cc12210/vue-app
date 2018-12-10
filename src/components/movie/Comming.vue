<template>
  <div class="comming">
    <p class="moreExpected_title">近期最受期待</p>
    <div class="bannerL">
      <div class="wrap" ref="wrap">
        <div class="wrap_t" ref="wrap_t">
          <li v-for="(item,index) in moreExpectedMovie" :key="index">
            <div><img :src="item.img" alt=""></div>
            <h5 class="moreExp_tit">{{item.nm}}</h5>
            <p class="moreExp_date">{{item.comingTitle}}</p>
          </li>
        </div>
      </div>
    </div>
    <!-- 这个是分割的div -->
    <div class="hr"></div>

    <div class="commingMovieList" v-for="(list,key) in comingMap" :key="list.id">
      <p class="dateTitle">{{key}}</p>
      <ul>
        <li class="comingMovie" v-for="(item,index) in list" :key="index">
          <div class="comingImg"><img :src="item.img" alt=""></div>
          <div class="commingInfoAll">
            <div class="commingInfo">
              <span class="movie_title">{{item.nm}}</span>
              <span v-if="item.version=='v3d imax'" class="max3d"></span>
              <span v-else-if="item.version=='v3d'" class="v3d"></span>
              <p class="grade sc" v-if="item.sc>0">
                <span id="cancelColor">观众评&nbsp;</span>{{item.sc}}</p>
              <p class="grade sc" v-else>{{item.wish}}
                <span id="cancelColor">&nbsp;人想看</span>
              </p>
              <p class="star" v-if="item.star!=''">主演：{{item.star}}</p>
              <p class="star">{{item.rt}} 上映</p>
            </div>
            <div class="buy_ticket">
              <span href="javascript://" class="buy_now" v-if="item.showst=='1'">想看</span>
              <span href="javascript://" class="buy_after" v-else-if="item.showst=='4'">预售</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getCommingList,
  moreExpected,
  getMoreComingList
} from "../../services/movieService";
export default {
  data() {
    return {
      comingMap: {},
      comingMapId: [],
      moreExpectedMovie: [],
      originData: [],
      offset: 0,
      flag: true,
      width: 0
    };
  },
  methods: {
    //请求下一页数据
    getMoreData() {
      var _this = this;
      //   深拷贝id的值,不然分割会出问题
      let ids = [...this.comingMapId];
      // 分割id数据
      ids = ids.splice(this.originData.length, 10);
      //组装请求参数
      let movieIds = ids.join(",");
      getMoreComingList(movieIds).then(({ dataMap, originData }) => {
        // this.playList = [...this.playList, ...result];
        // console.log(dataMap);
        // console.log(originData);
        // for(var i in dataMap){
        //   console.log(dataMap[i]);
        // }
      });
    },
    getMoreExp() {
      this.flag = false;
      this.offset += 10;
      this.width += 1100;
      moreExpected(this.offset).then(result => {
        setTimeout(() => {
          this.flag = true;
        }, 500);
        this.moreExpectedMovie = [...this.moreExpectedMovie, ...result];
        this.$refs.wrap_t.style.width = 1100 + this.width + "px";
      });
    }
  },
  created() {
    getCommingList().then(({ dataMap, ids, originData }) => {
      this.comingMap = dataMap;
      this.comingMapId = ids;
      this.originData = originData;
      this.getMoreData();
    });
    moreExpected(this.offset).then(result => {
      // console.log(result);
      // 更受期待的电影
      this.moreExpectedMovie = result;
    });
  },
  mounted() {
    let wrap_scroll = new IScroll(this.$refs.wrap, {
      scrollX: true
    });
    wrap_scroll.on("beforeScrollStart", () => {
      wrap_scroll.refresh();
    });
    wrap_scroll.on("scrollEnd", () => {
      if (
        wrap_scroll.x <= wrap_scroll.maxScrollX &&
        this.flag &&
        this.offset <= 100
      ) {
        this.getMoreExp();
      }
    });
  }
};
</script>

<style lang="scss">
.moreExpected_title {
  padding: 10px;
  font-size: 14px;
  color: #333;
}
.bannerL {
  // height: 200px;
  width: 100%;
  padding-bottom: 20px;
  overflow: hidden;
  // display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    // width: 99%;
    overflow: hidden;
    white-space: nowrap;
    .wrap_t {
      min-width: 1100px;
    }
    li {
      display: inline-block;
      padding: 0 8px;
      width: 90px;
      .moreExp_tit {
        font-size: 13px;
        color: #222;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .moreExp_date {
        font-size: 12px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      img {
        width: 85px;
        height: 115px;
        // display: inline-block;
      }
    }
  }
}
.hr {
  height: 10px;
  background: #f5f5f5;
}
.commingMovieList {
  padding: 0 10px;
  .dateTitle {
    padding: 10px;
    padding-left: 0;
    font-size: 14px;
    color: #333;
  }
  .comingMovie {
    display: flex;
    position: relative;
    box-sizing: border-box;
    padding: 3px;
    .comingImg {
      img {
        width: 64px;
        height: 90px;
      }
    }
    .commingInfoAll {
      width: 80%;
      border-bottom: 1px solid #f0f0f0;
    }
    .commingInfo {
      width: 70%;
      text-indent: 10px;
      padding-bottom: 10px;
      .movie_title {
        font-size: 17px;
        color: #333;
        font-weight: 700;
        display: inline-block;
        width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-indent: 0;
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
  }
  .buy_ticket {
    position: absolute;
    right: 20px;
    top: 40px;
    .buy_now,
    .buy_after {
      display: block;
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      background-color: #faaf00;
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
</style>
