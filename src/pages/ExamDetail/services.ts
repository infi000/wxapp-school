import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 31、	获取试卷试题
 */
export const getExampaperdetail = (params:{epid:string| number}) => request.get(Api.Exampaperdetail,params);

export default {};
