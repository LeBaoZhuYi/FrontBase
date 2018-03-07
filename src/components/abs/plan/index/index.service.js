import http from '../../../common/http/http'

export default {
    getData(start = 0, length = 10) {
        return http.get(`/abs/plans?start=${start}&length=${length}`).then(res => {
            return res.data
        })
    }
}
