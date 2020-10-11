import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 搜索新闻
 */
export const getNewsSearch = (params:{offset: number; count: number}) => request.get(Api.NewsSearch,params);
