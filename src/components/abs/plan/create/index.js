import template from './index.html'
import service from './index.service'
import './index.scss'

export default {
    props: ['redirect', 'lang', 'show'],

    template: template,

    data() {
        return {
            codeList: [],
            model: {},
            rules: {},
            submitLoading: false
        }
    },

    created() {
        service.getCodeList().then(res => {
            this.codeList = res
            this.model.tradeCode = this.codeList[0].value
        })
    },

    methods: {
        submit(name) {},

        close() {
            this.$emit('close')
        }
    },

    mounted() {},

    computed: {
        title() {
            if (this.lang) {
                return this.lang.global.add
            }
            return ''
        },

        modalShow() {
            return this.show
        }
    }
}
