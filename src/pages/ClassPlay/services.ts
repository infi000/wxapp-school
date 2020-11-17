import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 10、	课程详情
 */
export const getCourseDetail = (params:{cid:string|number}) => request.get(Api.CourseDetail,params);

export default {};
