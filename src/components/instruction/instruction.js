import tableTemplate from './instruction.html'
import service from './instruction.service'

export default {
    props: ['redirect', 'lang'],

    template: tableTemplate,

    data() {
        return {}
    },

    computed: {},

    methods: {},

    created() {},

    mounted() {
        this.$Loading.finish()
    }
}
