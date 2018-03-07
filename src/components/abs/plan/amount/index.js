import template from './index.html'
import service from './index.service'
import './index.scss'

export default {
    props: ['redirect', 'lang', 'show', 'data'],

    template: template,

    data() {
        return {
            model: {},
            rules: {
                adjustAmount: [{ required: true, type: 'number', message: '', trigger: 'blur' }]
            },
            submitLoading: false
        }
    },

    created() {
        this.model = this.data.row
    },

    methods: {
        submit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.submitLoading = true

                    service
                        .adjustAmount({
                            planId: this.model.planId,
                            adjustAmount: this.model.adjustAmount
                        })
                        .then(res => {
                            this.submitLoading = false

                            if (res.data.success) {
                                this.close()
                                this.$emit('success')
                            } else {
                                this.$Message.error(res.data.desc)
                            }
                        })
                        .catch(err => {
                            this.submitLoading = false
                            this.$Message.error(err)
                        })
                }
            })
        },

        close() {
            this.$emit('close')
        }
    },

    mounted() {},

    computed: {
        title() {
            if (this.lang) {
                return this.lang.absplan.adjustAmount + this.lang.absplan.amount
            }
            return ''
        },

        modalShow() {
            return this.show
        }
    }
}
