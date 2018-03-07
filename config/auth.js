/**


 */

import superagent from 'superagent'
import cheerio from 'cheerio'
import urllib from 'urllib'
import { EventEmitter } from 'events'

const eve = new EventEmitter()

// 登陆 url 、目标 url
const conUrl = {
    signin: '',
    target: '',
}

const browserMsg = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
}

const loginMsg = {
    lt: '',
    execution: '',
    _eventId: '',
    username: '',
    password: '',
    captcha: '',
    rememberMe: 'on'
}

const getSession = url => {
    var uri = null

    try {
        uri = JSON.parse(url).url
    } catch(e) {
        eve.emit('error', e)
    }

    urllib.request(uri, (err, data, res) => {
        if (err) {
            eve.emit('error', e)
        }

        eve.emit('data', res.headers)
    })
}

const startSignIn = cookie => {

    const req = superagent.post(conUrl.signin).set(browserMsg)
    req.set('Cookie', cookie)

    req.send(loginMsg)
        .end((err, res) => {
            if (!err) {
                getSession(res.text)
            } else {
                eve.emit('error', err)
            }
        })
}

const start = () => {
    superagent.get(`${conUrl.signin}?service=${conUrl.target}`)
        .end((err, res) => {
            if (!err) {
                const cookie = res.headers['set-cookie'][0].split(';')[0]
                const $ = cheerio.load(res.text)

                loginMsg.lt=$('[name=lt]').attr('value')
                loginMsg.execution=$('[name=execution]').attr('value')
                loginMsg._eventId=$('[name=_eventId]').attr('value')
                startSignIn(cookie) 
            } else {
                eve.emit('error', err)
            }
        });
}

export default opts => {
    loginMsg.username = opts.username || 'liyitong'
    loginMsg.password = opts.password || 'liyitong'

    conUrl.signin = opts.signin || ''
    conUrl.target = opts.target || ''

    start()
    return eve
}
