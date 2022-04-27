import mockRequest from '@/utils/mock-request'


const state = {
      list:{}
}
const mutations = {
      GETDATA(state,data){
state.list = data
      }
}
const actions = {
      async getData({commit}){
            let result =await mockRequest.get('/home/list')
            if(result.code==20000){
                  commit('GETDATA',result.data)
            }
      }
}
const getters = {}

export default {
      namespaced: true,
      state, mutations, actions, getters
}