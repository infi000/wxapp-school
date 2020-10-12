import request from '@/utils/request';
import Api from '@/config/api';
/**
 * 23、	我的收藏新闻
 */
export const getMyattnews = () => request.get(Api.myattnews);
/**
 * 22、	我的收藏课件
 */
export const getMyattcourseware = () => request.get(Api.myattcourseware);
/**
 * 21、	我的收藏课程
 */
export const getMyattcourse = () => request.get(Api.myattcourse);

export default {};
