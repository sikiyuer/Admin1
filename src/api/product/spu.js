import request from '@/utils/request'

// spu分页接口GET /admin/product/{page}/{limit}
export const reqSpuPage = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
// 根据id获取指定的spu  ,展示在修改页GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 获取品牌信息
export const reqGetSpuMark = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })
// 获取spu图标的接口
export const reqGetSpuIcon = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取平台全部的销售属性 --- 一共三个GET /admin/product/baseSaleAttrList
export const reqGetSpuSaleArr = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })

// 新增spu或者更新spu 接口 ，新增不带id， 修改带上id
// POST /admin/product/saveSpuInfo
// POST /admin/product/updateSpuInfo
export const AddOrUpdateSpu = (spuInfo) => {
    // 如果有id
    if (spuInfo.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
    }
    else {
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })

    }

}

// 删除spu的接口DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })


// 获取图片接口
export const getSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
// 获取销售属性 ---GET /admin/product/spuSaleAttrList/{spuId}
export const getSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
// 获取商品基础属性GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const attrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
// 保存sku接口POST /admin/product/saveSkuInfo
export const addsku = (skuInfo) => request(
    {
        url: `/admin/product/saveSkuInfo`,
        method: 'post',
        data: skuInfo
    })
//展示spu和sku列表接口GET /admin/product/findBySpuId/{spuId}

export const findBySpuId = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })







