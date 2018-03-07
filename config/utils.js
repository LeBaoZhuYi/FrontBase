import path from 'path'
import os from 'os'


const ifaces = os.networkInterfaces()
const _root = path.resolve(__dirname, '..')

const root = (...args) => {
    return path.join.apply(path, [_root].concat(args))
}

const loader = (plugin, reg, sass=false) => {
    const useList = [
        'css-loader',
        'postcss-loader',
    ]

    sass && useList.push('sass-loader')

    return {
        test: reg,
        loaders: plugin.extract({
            fallback: "style-loader",
            use: useList
        }),
    }
}

const hash = name => process.env.ENV === 'production' ? `[contenthash:8].css` : name


const order = ( chunk1, chunk2 ) => {
    const orders = ['lib', 'app']

    return orders.indexOf(chunk1.names[0]) - orders.indexOf(chunk2.names[0])
}

/*
 * get adapter ip
 */
const getAdaptIP = () => {
    let ip

    Object.keys(ifaces).some(ifname => {

        const res = ifaces[ifname].filter(iface => 'IPv4' === iface.family && iface.internal === false && iface.address.indexOf('10.') === 0)

        if (res && res.length) {
            ip = res[0].address

            return true
        }
        return false
    })

    return ip
}


export { loader, hash, root, order, getAdaptIP }
