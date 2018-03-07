import Vue from 'vue'
import VueRouter from 'vue-router'

import 'iview/dist/styles/iview.css'
import iView from 'iview'

import { routes, components } from './app.routes'
import service from './app.service'
import appTemplate from './app.html'
import '../scss/global.scss'
import './app.scss'

import utils from '../components/common/utils/'

Vue.use(VueRouter)
Vue.use(iView)

import enUS from 'iview/dist/locale/en-US'
import zhCN from 'iview/dist/locale/zh-CN'

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        iView.LoadingBar.start()
    }
    next()
})
router.afterEach((to, from) => {
    // 每个view单独调用this.$Loading.finish()
})

new Vue({
    el: '#app',

    data: {
        isCollapsed: false,

        navs: [],
        activePath: '/instruction',
        openNav: [],
        navlist: {},
        mainTitle: '',

        locale: 'zh-CN',
        lang: null
    },

    template: appTemplate,

    router: router,

    created() {
        service
            .locale()
            .then(res => {
                this.locale = res.locale

                const locale = this.getUILang()

                Vue.use(iView, { locale })

                service
                    .language(this.locale)
                    .then(res => {
                        this.lang = res.i
                        this.init()
                    })
                    .catch(err => this.$Message.error(err))
            })
            .catch(err => this.$Message.error(err))
    },

    computed: {
        rotateIcon() {
            return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
        },
        menuitemClasses() {
            return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
        }
    },

    methods: {
        init() {
            service
                .getNav()
                .then(res => {
                    this.$Loading.finish()
                    this.navs = res
                    this.lineNav()
                    this.activePath = this.$route.path

                    if (this.navlist[this.activePath]) {
                        this.navlist[this.activePath].parent &&
                            this.openNav.push(this.navlist[this.activePath].parent)
                        this.mainTitle =
                            this.navlist[this.activePath].mainTitle ||
                            this.navlist[this.activePath].title
                    }
                })
                .catch()
        },

        getUILang() {
            switch (this.locale) {
                case 'zh-CN':
                    return zhCN
                case 'en-US':
                    return enUS
            }
        },

        collapsedSider() {
            this.$refs.side.toggleCollapse()
        },

        lineNav(tree) {
            tree = tree || this.navs
            tree.forEach(v => {
                this.navlist[v.name] = v
                v.children && v.children.length && this.lineNav(v.children)
            })
        },

        collapseGoto(path, all) {
            this.activePath = path
            this.openNav = [this.navlist[this.activePath].parent]

            this.goto(path, all)

            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
            })
        },

        goto(path, all) {
            this.mainTitle = this.navlist[path].mainTitle || this.navlist[path].title
            this.$router.push(all || path)
        },

        redirect(path) {
            this.collapseGoto(path.path, path)
        },

        setLocale(key, data) {
            const v = utils.getValue(this.lang, data.lang)
            return v || data[key]
        }
    }
})
