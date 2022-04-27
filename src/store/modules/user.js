import { login, logout, getInfo } from '@/api/user' // 登录|退出登录|获取用户信息的接口
// 获取token|设置token|删除token的方法
import { getToken, setToken, removeToken } from '@/utils/auth' 
// 引入重置路由的方法
import { resetRouter,asyncRoutes,anyRoutes,constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    // 存储用户名
    name: '',
    //存储用户头像
    avatar: '',
    //菜单相关标记
    routes:[],
    buttons:[],
    roles:[],
    // 计算出的需要展示的异步路由、
    asyroutes:[],
    // 最终计算出的需要展示的路由、
    resultAllRoutes:[],
  }
}
const state = getDefaultState()
// 唯一修改state的地方
const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  //存储用户信息 
  SET_USERINFO:(state,info)=>{
state.name= info.name
state.avatar= info.avatar
// 存储路由标记
state.routes= info.routes
//存储按钮标记
state.buttons= info.buttons
// 存储角色标记
state.roles=info.roles
  },
  //保存计算出的异步路由
  SET_ROUTES:(state,asyncroutes)=>{
    //保存异步展示路由
  state.asyroutes=asyncroutes
  //合并所有的需要展示的路由。异步，任意路由合并到常量路由里面
  state.resultAllRoutes=constantRoutes.concat(state.asyroutes,anyRoutes)
  // 给路由添加新的路由
  router.addRoutes(state.resultAllRoutes)
  }
 
}

const actions = {
  // user login
  /* eslint-disable */
  async  login({ commit }, userInfo) {
    const { username, password } = userInfo
    // console.log("登录中。。");
    const result = await login({ username: username.trim(), password: password })
        if(result.code == 20000){
          const token = result.data.token
          // vue存储token
          commit('SET_TOKEN', token)
          //持久化存储token
          setToken(token)
          return Promise.resolve('登录成功')
        }
        else{
          return Promise.reject(new Error('登录失败：'+result.data))
        }
     
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取到了用户的用户名，用户头像，以及相关的路由权限标志 
        // routes[不同用户展示数据菜单的标记，用来识别计算出所有应该展示的路由]
        // roles（用户角色信息，主管，经理，管理员等）
        // buttons 按钮的权限标记
        const { data } = response
        console.log(data,'已经获取到了登录的用户信息');
        //提交保存所有的信息
        commit('SET_USERINFO',data)
        //提交计算异步展示的所有路由
        commit('SET_ROUTES',computedRoutes(asyncRoutes,data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}
// 定义一个函数计算出对应用户需要展示的路由
const computedRoutes = (asyncRoutes,routes) =>{
  return  asyncRoutes.filter(list=>{
    // 过滤当前所有的异步路由，检测返回的路由标记是否有，如果有，则返回，之后进行展示
      if(routes.indexOf(list.name)!=-1){
        // 递归筛选子路由
        if(list.children&&list.children.length){ // 如果有子路由
          // 递归筛选应该展示的子路由
          list.children =computedRoutes(list.children,routes)
        } 
        return true; // 筛选出展示的路由
      }
  })
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

