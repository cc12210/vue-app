<template>
  <div class="page" id="cinema">
    <app-header title="影院"></app-header>
    <div class="cinemaSearch">
      <span class="city_choose">{{this.$store.state.ci}}</span>
      <div class="serach_cinema">
        <i></i>&nbsp;搜影院</div>
    </div>
    <!-- 城市筛选 -->
    <div class="topSelect">
      <selectcity></selectcity>
    </div>
    <!-- 城市选择 -->
    <!-- 到这里结束后 -->
    <div class="mainInfo" ref="mainScroll">
      <div>
        <li v-for="(city,index) in cityCinemaList" :key="index" class="cinema_list">
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
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { cityList } from "../../services/cityList";
export default {
  data() {
    return {
      cityCinemaList: [],
      offset: 0,
      city: 215,
      flag: true
    };
  },
  mounted() {
    let mainScroll = new IScroll(this.$refs.mainScroll, () => {});
    mainScroll.on("beforeScrollStart", () => {
      mainScroll.refresh();
    });
    mainScroll.on("scrollEnd", () => {
      if (mainScroll.y <= mainScroll.maxScrollY && this.flag) {
        this.flag = false;
        this.offset += 20;
        cityList(this.offset, this.$store.state.ciId).then(result => {
          this.cityCinemaList = [...this.cityCinemaList, ...result];
          if (result.length != 0) {
            setTimeout(() => {
              this.flag = true;
            }, 500);
          }
        });
      }
    });
  },
  created() {
    cityList(this.offset, this.$store.state.ciId).then(result => {
      this.cityCinemaList = result;
    });
  }
};
</script>

<style lang="scss">
#cinema {
  bottom: 49px;
  box-sizing: border-box;
  .topSelect {
    width: 100%;
    // height: 49px;
    position: absolute;
    top: 90px;
  }
  .cinemaSearch {
    width: 100%;
    height: 44px;
    display: flex;
    position: absolute;
    top: 50px;
    background: #f5f5f5;
    line-height: 44px;
    align-items: center;
    justify-content: space-around;
    .city_choose {
      font-size: 15px;
      color: #666;
    }
    .city_choose:after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top: 5px solid #666;
      transform: translateY(2px);
      margin-left: 5px;
    }
    .serach_cinema {
      width: 70%;
      height: 29px;
      background: #fff;
      box-sizing: border-box;
      border: 1px solid #ececec;
      border-radius: 5px;
      text-align: center;
      line-height: 29px;
      font-size: 13px;
      color: #b2b2b2;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(../../assets/fangda.png) no-repeat;
        background-size: 100%;
      }
    }
  }
  .mainInfo {
    width: 100%;
    position: absolute;
    top: 134px;
    bottom: 0;
    left: 0;
    // background: #ccc;
    overflow: hidden;
    .cinema_list {
      //   width: 80%;
      position: relative;
      padding: 15px 10px;
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
      }
      .city_distance {
        position: absolute;
        right: 35px;
        top: 45px;
        font-size: 13px;
        color: #666;
      }
      .tag {
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
  }
}
</style>
