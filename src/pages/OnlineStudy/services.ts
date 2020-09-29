import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 1、	搜索课程分类
 */
export const getCourseCatesearch = () => request.get(Api.CourseCatesearch,{offset:0,count:8});

export default {};
