const SAT_HOST = 'http://m.maoyan.com'
const UAT_HOST = 'http://m.maoyan.com'
const PRO_HOST = 'http://m.maoyan.com'
/*
正在热映的接口
参数:token 可选  用户信息
*/
const PLAYING_API = '/ajax/movieOnInfoList';
/*
请求热映的下一页接口
http://m.maoyan.com/ajax/moreComingList?token=&movieIds=
    token 可选
    movieIds 电影id  必填
*/
const MORE_PLAY_API = '/ajax/moreComingList';
/*
即将上映的接口
http://m.maoyan.com/ajax/comingList
?ci=30&token=&limit=10
参数：ci:城市
      limit:数量
*/
const COMMING_API = '/ajax/comingList';
/*
更多即将上映
/ajax/moreComingList?ci=30&token=&limit=10&movieIds=
参数 ci 城市
    token 可选
    limit 长度
    movieId
*/
const MORE_COMING_API = '/ajax/moreComingList';
/*
近期受期待的电影
http://m.maoyan.com/ajax/mostExpected?ci=30&limit=10&offset=0&token=
参数 ci 城市
    limit 长度
    offset 偏移 初始请求为0  下一页数据就加10
    token  用户信息 可选
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';


/*
初次请求影院的数据
http://m.maoyan.com/ajax/cinemaList?day=2018-11-17&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1542434933423&cityId=30
http://m.maoyan.com/ajax/cinemaList?day=2018-11-17&offset=0&limit=20
            offset 偏移  下一条数据加20
            limit 长度 20
*/
const CITY_LIST_API = '/ajax/cinemaList';
/*
请求具体的电影数据
http://m.maoyan.com/ajax/detailmovie?movieId=42964
参数 movieId 必填 电影id
*/
const DETAIL_MOVIE = '/ajax/detailmovie';
/*
请求具体的电影详情页的影院信息
    POST请求方式
http://m.maoyan.com/ajax/movie?forceUpdate=1542548806279
forceUpdate  必填  时间戳 第一页1542548806279
第二页为1542548999799
第三页 1542549008602
*/
const DETAIL_CINEMA = '/ajax/movie?forceUpdate=1542548806279';
/*
请求各个城市对应的id
http://m.maoyan.com/dianying/cities.json
考虑请求到了之后就缓存下来  避免重复请求不必要的数据
*/
const CITY_LIST_ID_API = '/dianying/cities.json';
/*
http://m.maoyan.com/ajax/filterCinemas?ci=215
ci 必填 为城市id
城市选择
*/
/*
请求具体电影院的电影详细数据
http://m.maoyan.com/ajax/cinemaDetail?cinemaId=15855&movieId=341213
必填两个参数
cinemaId 影院id
movieId  电影id
*/
const CINEMA_MOVIE_API = '/ajax/cinemaDetail';
export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    COMMING_API,
    MORE_PLAY_API,
    MORE_COMING_API,
    MOST_EXPECTED_API,
    CITY_LIST_API,
    DETAIL_MOVIE,
    DETAIL_CINEMA,
    CINEMA_MOVIE_API,
    CITY_LIST_ID_API
}