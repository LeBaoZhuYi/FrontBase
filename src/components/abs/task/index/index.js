import template from './index.html'
import service from './index.service'
import './index.scss'

export default {
    props: ['redirect', 'lang'],

    template: template,

    data() {
        return {}
    },

    created() {},

    beforeDestroy() {},

    methods: {},

    mounted() {
        this.$Loading.finish()
    },

    watch: {},

    components: {}
}
