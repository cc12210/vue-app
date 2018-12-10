import axios from 'axios';
import API from '../api';
import http from '../utils/http';

//http://m.maoyan.com/ajax/movieOnInfoList?token=
// 请求热映数据
export function getPlayingList(ci) {
    return new Promise((resolve, reject) => {

        http({
                url: API.PLAYING_API,
                method: 'GET',
                data: {
                    token: '',
                    ci
                }
            })
            .then(({
                data,
                status
            }) => {
                // console.log(data.movieIds); //电影id
                if (status == 200) {
                    let newData = data.movieList.map(item => {
                        let {
                            id,
                            nm,
                            img,
                            version,
                            sc,
                            star,
                            showInfo,
                            wish,
                            globalReleased
                        } = item;
                        img = img.replace(/w.h/, '128.180');
                        return {
                            id,
                            nm,
                            img,
                            version,
                            sc,
                            star,
                            showInfo,
                            wish,
                            globalReleased
                        }
                    });
                    resolve({
                        data: newData,
                        ids: data.movieIds
                    });
                } else {
                    //请求失败
                }
            })
            .catch(() => {
                //请求失败
            })
    })
}

// 更多正在热映
export function getMorePlayingList(ids) {
    return new Promise((resolve, reject) => {

        http({
                url: API.MORE_PLAY_API,
                method: 'GET',
                data: {
                    token: '',
                    movieIds: ids
                }
            })
            .then(({
                data,
                status
            }) => {
                // console.log(data.movieIds); //电影id
                if (status == 200) {
                    let newData = data.coming.map(item => {
                        let {
                            id,
                            nm,
                            img,
                            version,
                            sc,
                            star,
                            showInfo,
                            wish,
                            globalReleased
                        } = item;
                        img = img.replace(/w.h/, '128.180');
                        return {
                            id,
                            nm,
                            img,
                            version,
                            sc,
                            star,
                            showInfo,
                            wish,
                            globalReleased
                        }
                    });
                    resolve(newData);
                } else {
                    //请求失败
                }
            })
            .catch(() => {
                //请求失败
            })
    })
}

// 即将上映的数据
export function getCommingList() {
    return new Promise((resolve, reject) => {
        http({
                url: API.COMMING_API,
                method: 'GET',
                data: {
                    token: '',
                    limit: 10
                }
            })
            .then((result) => {
                //请求成功,得到数据
                if (result.status != 200) {
                    // 请求错误则return
                    return;
                }
                let data1 = result.data;
                let newData = data1.coming.map(item => {
                    //过滤字段
                    let {
                        id,
                        nm,
                        img,
                        wish,
                        star,
                        showInfo,
                        version,
                        comingTitle,
                        showst,
                        rt
                    } = item;
                    img = img.replace(/w.h/, '128.80');
                    return {
                        id,
                        nm,
                        img,
                        wish,
                        star,
                        showInfo,
                        version,
                        comingTitle,
                        showst,
                        rt
                    }
                })
                let dataMap = {};
                newData.map(item => {
                    if (!dataMap[item.comingTitle]) {
                        dataMap[item.comingTitle] = [];
                    }
                    dataMap[item.comingTitle].push(item);
                })
                resolve({
                    dataMap,
                    ids: data1.movieIds,
                    originData: result.data.coming
                });
            })
    })
}
//近期最受期待的电影
export function moreExpected(offset) {
    return new Promise((resolve, reject) => {

        http({
                url: API.MOST_EXPECTED_API,
                method: 'GET',
                data: {
                    ci: 30,
                    limit: 10,
                    offset,
                    token: ''
                }
            })
            .then(data => {
                let newData = data.data.coming.map(item => {
                    let {
                        id,
                        nm,
                        img,
                        wish,
                        comingTitle
                    } = item;
                    img = img.replace(/w.h/, '128.180');
                    return {
                        id,
                        nm,
                        img,
                        wish,
                        comingTitle
                    }
                });
                resolve(newData);
            })
            .catch(() => {
                //请求失败
            })
    })
}
//更多即将上映
export function getMoreComingList(ids) {
    return new Promise((resolve, reject) => {
        http({
                url: API.MORE_COMING_API,
                method: 'GET',
                data: {
                    ci: 30,
                    token: '',
                    limit: 10,
                    movieIds: ids
                }
            })
            .then((result) => {
                //请求成功,得到数据
                if (result.status != 200) {
                    // 请求错误则return
                    return;
                }
                let data1 = result.data;
                let newData = data1.coming.map(item => {
                    //过滤字段
                    let {
                        id,
                        nm,
                        img,
                        wish,
                        star,
                        showInfo,
                        version,
                        comingTitle,
                        showst,
                        rt
                    } = item;
                    img = img.replace(/w.h/, '128.80');
                    return {
                        id,
                        nm,
                        img,
                        wish,
                        star,
                        showInfo,
                        version,
                        comingTitle,
                        showst,
                        rt
                    }
                })
                let dataMap = {};
                newData.map(item => {
                    if (!dataMap[item.comingTitle]) {
                        dataMap[item.comingTitle] = [];
                    }
                    dataMap[item.comingTitle].push(item);
                })
                resolve({
                    dataMap,
                    ids: data1.movieIds,
                    originData: result.data.coming
                });
            })
    })
}
//请求电影的详情数据
export function getDetailMovie(movieId) {
    return new Promise((resolve, reject) => {
        http({
                url: API.DETAIL_MOVIE,
                method: 'GET',
                data: {
                    movieId
                }
            })
            .then(result => {
                resolve(result.data.detailMovie);
            })
            .catch(() => {
                //请求失败
            })
    })
}
//电影详情页面的影院信息
export function getDetailCinema(date, cityId, reqId, offset) {
    return new Promise((resolve, reject) => {
        http({
                url: API.DETAIL_CINEMA,
                method: 'POST',
                data: {
                    movieId: 42964,
                    day: date,
                    offset: offset || 0,
                    limit: 20,
                    districtId: -1,
                    lineId: -1,
                    hallType: -1,
                    brandId: -1,
                    serviceId: -1,
                    areaId: -1,
                    stationId: -1,
                    item: '',
                    updateShowDay: true,
                    reqId,
                    cityId
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(() => {
                //请求失败
            })
    })
}