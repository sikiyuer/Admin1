// 获取品牌管理里的api
import request from '@/utils/request'
// 获取品牌分页信息

export const reqTradeMark = (page,limit) =>request({
   url:`/admin/product/baseTrademark/${page}/${limit}` ,
   method:'get'
})

 // 增加和修改合并接口
 export const reqAddOrUpdateMark = (data) =>{
    // 判断携带的数据是否有id,有就是修改，没有就是新增
    if(!data.id){
       return request({
          url:'/admin/product/baseTrademark/save',
          data,
          method:'post'

       })
    }
    else{
       return request({
          url:'/admin/product/baseTrademark/update'
          ,data,
          method:'put'

       })
    }
   
}

// 删除品牌的接口 DELETE /admin/product/baseTrademark/remove/{id}
export const reqDelTradeMark = (id) => request({
   url:`/admin/product/baseTrademark/remove/${id}`,
   method:'delete'
})
