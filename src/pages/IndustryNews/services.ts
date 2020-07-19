import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 获取商品类型
 */
export const getAllCtype = () => request.get(Api.goodsAllCtype);
/**
 * 商品搜索 返回商品列表
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.get(Api.searchGoods, payload);

export default {};
