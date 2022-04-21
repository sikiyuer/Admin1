// 三级导航分类接口
import request from '@/utils/request'
// 获取一级分类的接口 GET /admin/product/getCategory1
export const reqCateFirst = () =>request({
      url:`/admin/product/getCategory1`,
      method:'get',
})
// 获取二级分类的接口 GET /admin/product/getCategory2/{category1Id}
export const reqCateSecond = (category1Id) =>request({
      url:`/admin/product/getCategory2/${category1Id}`,
      method:'get',
})
// 获取三级分类的接口 GET /admin/product/getCategory3/{category2Id}
export const reqCateThree = (category2Id) =>request({
      url:`/admin/product/getCategory3/${category2Id}`,
      method:'get',
})

// 获取三级选择后的数据GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrsInfo = (category1Id,category2Id,category3Id)=>request({
      url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
      method:'get'
})
// 增加属性的接口POST /admin/product/saveAttrInfo
export const reqAddAttr = (data) => request({url:"/admin/product/saveAttrInfo",data,method:'post'})
