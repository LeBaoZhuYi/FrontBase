import http from '../../../common/http/http'

export default {
    create(data) {
        const params = Object.entries(data)
            .map(v => v.join('='))
            .join('&')
        return http.get(`/abs/createPlan?${params}`)
    },

    getCodeList() {
        return Promise.resolve([
            { label: 'ABS转让计划', value: '21' },
            { label: '直贷回购', value: '27' },
            { label: 'ABS回购', value: '32' }
        ])
    }
}
