import request from '@/utils/request';
import Api from '@/config/api';


/**
 * 10、	课程详情
 */
export const getCourseDetail = (params:{cid:string|number}) => request.get(Api.CourseDetail,params);
/**
 * 6、	关注课程
 */
export const addCourseAttcourse = (payload:{cid:number}) => request.get(Api.CourseAttcourse,payload);

export default {};
