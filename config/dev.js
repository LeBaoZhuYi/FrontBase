import { spawn } from 'child_process'
import start from './auth'
import fs from 'fs'

let opts = {}
if (fs.existsSync('./config/.debugrc')) {
    try {
        const a  = fs.readFileSync('./config/.debugrc')
        opts = JSON.parse(a)
    } catch(e) {
        throw e
    }
}

const session = start(opts)

console.log('Sign in...')

session.on('data', res => {
    const sessionid = res['set-cookie'][0].split(';')[0].split('=')[1]
    const c = spawn('webpack-dev-server', ['--progress'], {
        env: Object.assign({
            signin: opts.signin,
            target: opts.target,
            jsessionid: sessionid,
            ip: opts.ip,
            port: opts.port
        }, process.env),
    })

    c.stdout.on('data', data => {
        console.log(`${data}`)
    })
    c.stderr.on('data', data => console.log(`${data}`))
    c.on('close', code => console.log(`child process exited with code ${code}`))
})

session.on('error', res => {
    console.log('err: ', res)
})
