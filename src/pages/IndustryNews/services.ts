import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 热门课程
 */
export const getCourseHotcourse = (payload:{count:number}) => request.get(Api.CourseHotcourse,payload);
/**
 * Banner图
 */
export const getNewsBanners = () => request.get(Api.NewsBanners);
/**
 * 搜索新闻
 */
export const getNewsSearch = () => request.get(Api.NewsSearch,{offset:0,count:4});
/**
 * 1、	搜索课程分类
 */
export const getCourseCatesearch = () => request.get(Api.CourseCatesearch,{offset:0,count:8});

export default {};
