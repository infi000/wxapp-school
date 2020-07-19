import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 商品搜索 返回商品列表
 */
export const getSearchGoods = (payload: ISearchGoodsParams) => request.get(Api.searchGoods, payload);

export default {};
