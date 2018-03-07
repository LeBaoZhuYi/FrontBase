import template from './index.html'
import service from './index.service'
import './index.scss'

// components
import amount from '../amount/index'
import create from '../create/index'

export default {
    props: ['redirect', 'lang'],

    template: template,

    data() {
        return {
            amountModalShow: false,
            amountData: null,

            createModalShow: false,

            total: 0,
            tableLoading: true,
            columns: [
                {
                    title: 'PlanId',
                    key: 'planId'
                },
                {
                    title: '金额',
                    key: 'amount'
                },
                {
                    title: 'Seller',
                    key: 'seller'
                },
                {
                    title: 'transferRule',
                    key: 'transferRule'
                },
                {
                    title: 'Buyer',
                    key: 'buyer'
                },
                {
                    title: 'TradeCode',
                    key: 'tradeCode'
                },
                {
                    title: 'Description',
                    key: 'description'
                },
                {
                    title: '开始时间',
                    key: 'startTime'
                },
                {
                    title: '循环期结束时间',
                    key: 'transferEndTime'
                },
                {
                    title: '结束时间',
                    key: 'endTime'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // redirect
                                            this.$router.push({
                                                path: '/abs/abs_task',
                                                query: { planId: params.row.planId }
                                            })
                                        }
                                    }
                                },
                                '更新task信息'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.amountData = params
                                            this.amountModalShow = true
                                        }
                                    }
                                },
                                '调整资产池'
                            )
                        ])
                    }
                }
            ],
            data: []
        }
    },

    created() {
        this.getData()
    },

    beforeDestroy() {},

    methods: {
        getData(start = 0, length = 10) {
            this.tableLoading = true

            service
                .getData(start, length)
                .then(res => {
                    this.tableLoading = false
                    this.data = res.data
                    this.total = res.recordsTotal
                })
                .catch(err => {
                    this.tableLoading = false
                    this.$Message.error(err || this.lang.global.error)
                })
        },

        // 翻页
        change(cur) {
            this.getData(10 * (cur - 1))
        },

        hideCreateModal() {
            this.createModalShow = false
        },

        hideAmountModal() {
            this.amountModalShow = false
        }
    },

    mounted() {
        this.$Loading.finish()
    },

    watch: {},

    components: {
        amount,
        create
    }
}
