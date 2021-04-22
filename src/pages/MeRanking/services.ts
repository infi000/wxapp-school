import request from '@/utils/request';
import Api from '@/config/api';

/**
 *18、	个人考试结果（名次排行）
 */
export const getScorepos = (params:{stype: string}) => request.get(Api.scorepos,params);
/**
 * 地区积分排行
 */
export const getAreapos = (params:{stype: string}) => request.get(Api.areapos);

export default {};
