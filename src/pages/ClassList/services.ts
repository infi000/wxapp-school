import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 5,搜索课程
 */

export const coursesearch = (payload: { cid?: string }) => request.get(Api.coursesearch, payload);


export default {};
