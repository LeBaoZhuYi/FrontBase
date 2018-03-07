import planComponent from './plan/index/index'
import taskComponent from './task/index/index'

export const absRoutes = [
    { path: '/abs', redirect: '/abs/abs_plan' },
    { path: '/abs/abs_plan', component: planComponent },
    { path: '/abs/abs_task', component: taskComponent }
]

export const absComponents = {
    planComponent,
    taskComponent
}
