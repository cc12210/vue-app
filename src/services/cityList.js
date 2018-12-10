import API from '../api';
import http from '../utils/http';

//请求影院页面的影院信息
export function cityList(offset, city) {
    return new Promise((resolve, reject) => {
        http({
                url: API.CITY_LIST_API,
                method: 'GET',
                data: {
                    // daty: '2018-11-17',
                    offset,
                    limit: 10,
                    ci: city
                }
            })
            .then(result => {
                // console.log(result);
                resolve(result.data.cinemas);
            })
    })
}