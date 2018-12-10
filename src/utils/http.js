import axios from 'axios'

export default function http(options) {
    let obj = {};
    if (options.method == "GET") {
        obj.params = options.data
    } else if (options.method == "POST") {
        obj.data = options.data
    }
    return axios({
        url: options.url,
        method: options.method,
        ...obj,
    })
}