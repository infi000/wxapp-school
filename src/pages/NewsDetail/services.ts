import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 9、	新闻详情
 */
export const getNewsDetail= (payload:{nid?:number|string}) => request.get(Api.NewsDetail,payload);

export default {};
