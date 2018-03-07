import http from '../../../common/http/http'

export default {
    adjustAmount(data) {
        const params = Object.entries(data)
            .map(v => v.join('='))
            .join('&')
        return http.get(`/abs/adjustPlanAmount?${params}`)
    }
}
