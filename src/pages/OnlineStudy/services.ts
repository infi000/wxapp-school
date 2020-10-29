import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 1、	搜索课程分类
 */
export const getCourseCatesearch = () => request.get(Api.CourseCatesearch,{offset:0,count:8});
/**
 * 热门课程
 */
export const getCourseHotcourse = (payload:{count:number}) => request.get(Api.CourseHotcourse,payload);

export default {};
