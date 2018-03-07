/* 根据业务划分，
 * 每个一级目录自己建router，
 * 防止此文件堆积太多
 */
import {
    instructionRoutes,
    instructionComponents
} from '../components/instruction/instruction.routes'
import { absRoutes, absComponents } from '../components/abs/routes'

const routes = [
    { path: '', redirect: '/instruction' }, // default
    { path: '*', redirect: '/instruction' } // 404
]

routes.push.apply(routes, [].concat(instructionRoutes, absRoutes))

const components = {
    instructionComponents,
    absComponents
}

export { routes, components }
