import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 商品详情
 * @param payload
 * @param payload.gid string 商品id
 */
export const getDetail = (payload: { gid: string }) => request.get(Api.goodsDetail, payload);
/**
 * 商品关联热门推荐
 * @param payload
 * @param payload.gid string 商品id
 */
export const getRelatedGoods = (payload: { gid: string }) => request.get(Api.relatedGoods, payload);
/**
 * 检测是否已收藏商品
 * @param payload
 * @param payload.gid string 商品id
 */
export const getBuysRecord = (payload: { gid: string; offset: number; count: number }) => request.get(Api.buysRecord, payload);


export const getIsfav = (payload: { gid: string }) => request.get(Api.isfav, payload);
export const getFav = (payload: { gid: string }) => request.get(Api.fav, payload);
export const getUnfav = (payload: { gid: string }) => request.get(Api.unfav, payload);



export default {};
