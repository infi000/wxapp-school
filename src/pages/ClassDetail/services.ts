import request from '@/utils/request';
import Api from '@/config/api';


interface IGetExampaperParams{
    eptype:'1' | '2' | '3',
    cwid?:string;
    cid?:string;
}
/**
 * 14、	获取考试试卷
 */
export const getExampaper = (params:IGetExampaperParams) => request.get(Api.Exampaper,params);
/**
 * 15、		考试/测验开始
 */
export const getExamstart = (params:{epid:string}) => request.get(Api.examstart,params);
/**
 * 10、	课程详情
 */
export const getCourseDetail = (params:{cid:string|number}) => request.get(Api.CourseDetail,params);
/**
 * 6、	关注课程
 */
export const addCourseAttcourse = (payload:{cid:number}) => request.get(Api.CourseAttcourse,payload);
/**
 *  12、	学习课件
 */
export const courseWareLearn = (payload:{cid:number|string,cwid:number|string}) => request.get(Api.CourseWareLearn,payload);

export default {};
