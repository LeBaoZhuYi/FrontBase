import http from '../components/common/http/http'

export default {
    getNav() {
        return http.get('/mock/navlist').then(res => {
            return res.data.data
        })
    },

    locale() {
        return http.get(`/mock/locale?t=${new Date().getTime()}`).then(res => {
            return res.data.data
        })
    },

    language(lang) {
        lang = lang || 'zh-CN'
        return http.get(`/assets/lang/${lang}?t=${new Date().getTime()}`).then(res => {
            return res.data
        })
    }
}
