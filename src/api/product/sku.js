import request from '@/utils/request'
// ************************sku相关

// sku列表获取

export const reqGetSkuList=(page,limit) =>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
// 上架
export const reqOnSale=(skuId) =>request({url:`/admin/product/onSale/${skuId}`,method:'get'})
// 下架
export const reqCancelSale=(skuId) =>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
// 获取详情
export const reqGetSkuDetail=(skuId) =>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})


