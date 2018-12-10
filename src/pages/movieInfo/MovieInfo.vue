<template>
  <div class="page" id="movieInfo">
    <app-header :title="detailMovie.nm">
      <span class="backLastPage" @click="backLastPage">&lt;</span>
    </app-header>
    <div class="wrapScroll" :style="{top:'50px',bottom:'0'}" ref="wrapScroll">
      <!-- 这个是滑动的容器 -->
      <div>
        <div class="detailMovie">
          <div v-if="detailMovie.albumImg" class="bgImg" :style="{background:'url('+detailMovie.albumImg+') no-repeat'}">
          </div>
          <div v-else class="bgImg" :style="{background:'url('+detailMovie.img+') no-repeat'}"></div>
          <div class="filterImg"></div>
          <div class="movieImg">
            <img :src="detailMovie.img" alt="">
          </div>
          <div class="movieInfo">
            <span class="goMovieContent">&gt;</span>
            <span class="movie_title">{{detailMovie.nm}}</span>
            <p class="movie_en_name">{{detailMovie.enm}}</p>
            <p class="movie_grade" v-if="detailMovie.sc>0">
              <span class="movie_sc">{{detailMovie.sc}}</span>
              <span class="movie_snum">{{detailMovie.snum}}人评价</span>
            </p>
            <p class="movie_grade" v-else>
              <span class="movie_wish">{{detailMovie.wish}}人想看</span>
            </p>
            <p class="movie_catgroy">
              <span class="movie_cat">{{detailMovie.cat}}</span>
              <img v-if="detailMovie.version=='v3d imax'" src="../../assets/3dmax2.png" alt="" :style="{width:'42px'}" class="catgroy_img">
            </p>
            <p class="movie_src">
              <span>{{detailMovie.src}}/{{detailMovie.dur}}分钟</span>
            </p>
            <p class="movie_time">{{detailMovie.pubDesc}}</p>
          </div>
        </div>
        <div class="display_date">
          <ul>
            <li v-for="(showOneDay,index) in showDays.dates" :key="index" :class="{chooseDate:dateIndex==index}">
              {{showOneDay.date}}
            </li>
          </ul>
        </div>
        <selectcity></selectcity>
        <div class="cinema_list">
          <li v-for="(city,index) in detailCinema" :key="index" class="cinema_list">
            <h4 class="cityName">{{city.nm}}&nbsp;&nbsp;
              <span class="sellPrice">{{city.sellPrice}}&nbsp;
                <span class="yuanqi">元起</span>
              </span>
            </h4>
            <span class="city_addr">{{city.addr}}</span>
            <span class="city_distance">{{city.distance}}</span>
            <p class="tag">
              <span v-if="city.tag.allowRefund==1" class="allowRefund">退</span>
              <span v-if="city.tag.endorse==1" class="endorse">改签</span>
              <span v-if="city.tag.snack==1" class="snack">小吃</span>
              <span v-if="city.tag.vipTag=='折扣卡'" class="vipTag">折扣卡</span>
              <span v-if="city.tag.hallType!=''">
                <span v-for="(hall,index) in city.tag.hallType" :key="index" class="hall_tag">{{hall}}</span>
              </span>
              <br/>
              <img src="../../assets/kaika.png" alt="" v-if="city.promotion.cardPromotionTag" :style="{width:'15px'}">
              <span v-if="city.promotion.cardPromotionTag" class="cardPromotionTag">{{city.promotion.cardPromotionTag}}</span>
            </p>
            <p class="showTimes">近期场次: {{city.showTimes}}</p>
          </li>
        </div>
        <!-- 滑动的容器到此结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailMovie, getDetailCinema } from "../../services/movieService";
import axios from "axios";
export default {
  data() {
    return {
      movieId: this.$route.params.id || "",
      detailMovie: [],
      detailCinema: [],
      showDays: [],
      flag: true,
      offset: 0,
      dateIndex: 0
    };
  },
  methods: {
    backLastPage() {
      this.$router.back();
    },
    loadMore(date, ci, dateTime, offset) {
      getDetailCinema(date, ci, dateTime, offset).then(result => {
        this.detailCinema = [...this.detailCinema, ...result.data.cinemas];
        console.log(result);
        if (result.data.cinemas.length != 0) {
          setTimeout(() => {
            this.flag = true;
          }, 500);
        }
      });
    }
  },
  mounted() {
    let wrapScroll = new IScroll(this.$refs.wrapScroll, () => {});
    // 滑动时获取到最大高度进行滑动
    wrapScroll.on("beforeScrollStart", () => {
      wrapScroll.refresh();
    });
    wrapScroll.on("scrollEnd", () => {
      if (wrapScroll.y <= wrapScroll.maxScrollY && this.flag) {
        this.flag = false;
        this.offset += 20;
        let date = new Date();
        let dateTime = date.getTime();
        this.loadMore(date, this.$store.state.ciId, dateTime, this.offset);
      }
    });
    //如果movieId为空的话就不执行赋值和过滤图片路径
    if (this.movieId != "") {
      getDetailMovie(this.movieId).then(result => {
        // console.log(result);
        result.img = result.img.replace(/w.h/, "148.208");
        this.detailMovie = result;
        // console.log(this.detailMovie);
      });
      let date = new Date();
      let dateTime = date.getTime();
      let dateWeek = date.toLocaleDateString();
      dateWeek = dateWeek.replace(/\//g, "-");
      // 时间,城市id,时间戳
      getDetailCinema(date, this.$store.state.ciId, dateTime, this.offset).then(
        result => {
          this.detailCinema = result.data.cinemas;
          this.showDays = result.data.showDays;
          // console.log(this.showDays.dates);
          // this.showDays
        }
      );
    }
  }
};
</script>

<style lang="scss">
#movieInfo {
  background: #fff;
  z-index: 6;
  width: 100%;
  height: 100%;
  .backLastPage {
    font-size: 30px;
  }
  .wrapScroll {
    position: absolute;
    width: 100%;
    // height: 100%;
    overflow: hidden;
  }
  .detailMovie {
    width: 100%;
    height: 150px;
    padding: 19px 30px 19px 15px;
    position: relative;
    display: flex;
    .bgImg {
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(12px);
      background-size: 100% !important;
      // opacity: 0.65;
    }
    .filterImg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.65;
    }
    .movieImg {
      img {
        width: 110px;
        height: 150px;
      }
    }
    .movieInfo {
      flex: 1;
      padding-left: 12.5px;
      box-sizing: border-box;
      color: #fff;
      position: relative;
      .goMovieContent {
        position: absolute;
        right: 30px;
        top: 55px;
        font-size: 26px;
        opacity: 0.8;
      }
      .movie_title {
        font-size: 20px;
        font-weight: 700;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        width: 70%;
      }
      .movie_en_name,
      .movie_snum,
      .movie_catgroy,
      .movie_src,
      .movie_time {
        font-size: 12px;
        opacity: 0.8;
      }
      .movie_en_name {
        width: 70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
      }
      .movie_catgroy {
        .catgroy_img {
          margin-left: 5px;
        }
      }
      .movie_grade,
      .movie_src {
        margin-top: 6px;
        margin-bottom: 6px;
        .movie_sc,
        .movie_wish {
          font-size: 18px;
          font-weight: 700;
          color: #fc0;
          opacity: 1;
        }
        .movie_wish {
          font-size: 14px;
        }
        .movie_snum {
          margin-left: 5px;
        }
      }
      .movie_grade {
        margin-top: 3px;
      }
    }
  }
  .display_date {
    width: 100%;
    height: 45px;
    background: #fff;
    ul {
      height: 45px;
      white-space: nowrap;
      overflow-x: scroll;
      line-height: 45px;
      font-size: 14px;
      color: #666;
      text-align: center;
      .chooseDate {
        border-bottom: 2px solid #f03d37;
        color: #f03d37;
      }
      li {
        width: 115px;
        height: 43px;
        margin-left: 5px;
        display: inline-block;
      }
    }
  }
}
.cinema_list {
  //   width: 80%;
  position: relative;
  padding: 8px 10px 13px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e8e8e8;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   position: relative;
  .city_addr {
    display: block;
    margin-top: 6px;
    margin-bottom: 5px;
    font-size: 13px;
    color: #666;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }
  .cityName {
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .city_distance {
    position: absolute;
    right: 35px;
    top: 38px;
    font-size: 13px;
    color: #666;
  }
  .tag,
  .showTimes {
    font-size: 12px;
    color: #666;
    span {
      display: inline-block;
      padding: 1px 3px;
      margin-right: 4px;
    }
    .allowRefund,
    .endorse,
    .hall_tag {
      color: #589daf;
      border: 1px solid #589daf;
    }
    .snack,
    .vipTag {
      color: #f90;
      border: 1px solid #f90;
    }
  }
  .showTimes {
    margin-top: 5px;
  }
  .sellPrice {
    font-size: 18px;
    color: #f03d37;
    //   font-weight: normal;
  }
  .yuanqi {
    font-size: 11px;
  }
  .cardPromotionTag {
    margin-top: 5px;
  }
}
</style>
