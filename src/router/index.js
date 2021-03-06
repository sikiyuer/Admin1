import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */







// 路由进进行拆分
//常量路由 都展示
export const constantRoutes = [
  { // 登录
    path: '/login',
    component: () => import('@/views/login/index'),
    // component: () => import('@/views/dashboard/index'),

    hidden: true
  },
 
  { // 首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 异步路由--需要不同身份筛选展示
 export const asyncRoutes = [
   //权限管理
   
  { // 首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
   {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理(分配职务)',
        },
      },
      
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '职务管理(分配权限)',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '权限管理',
        },
      },
    ]
  },
  { // 产品管理
    path: '/',
    component: Layout,
    name:'Product',
    meta:{title:'商品管理',icon:'el-icon-goods'},
    children: [{
      path: 'trademark',
      name: 'trademark',
      component: () => import('@/views/products/TradeMark'),
      meta: { title: '品牌管理'}
    },
    {
      path: 'attr',
      name: 'attr',
      component: () => import('@/views/products/Attr'),
      meta: { title: '属性管理'}
    },
    {
      path: 'spu',
      name: 'spu',
      component: () => import('@/views/products/Spu'),
      meta: { title: '商品实例spu' }
    },
    {
      path: 'sku',
      name: 'sku',
      component: () => import('@/views/products/Sku'),
      meta: { title: '商品规格sku'}
    },
    {
      path: 'echart',
      name: 'echart',
      component: () => import('@/views/products/Echart'),
      meta: { title: '数据报表'},
    },{
      path: 'exercise',
      name: 'exercise',
      component: () => import('@/views/products/Echart/exercise'),
      meta: { title: '可视化练习'},
      children:[
        
        {
          path: 'canvas',
          name: 'canvas',
          component: () => import('@/views/products/Echart/exercise/canvas'),
          meta: { title: 'canvas'}
        },
        {
          path: 'svg',
          name: 'svg',
          component: () => import('@/views/products/Echart/exercise/svg'),
          meta: { title: 'svg'}
        },
        {
          path: 'echarttest',
          name: 'echarttest',
          component: () => import('@/views/products/Echart/exercise/echartTest'),
          meta: { title: 'echarttest'}
        },
      ]
    }]
  },
]
// 任意路由  404
export const anyRoutes = [
 {// 404
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  //直接注册，无法识别身份
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
//重置路由方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
