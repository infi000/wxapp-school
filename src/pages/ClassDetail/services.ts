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
/**
 *  5、	获取课程分类下最新课程详情
 */
export const getLastcourse = (payload: {cid: number | string }) => request.get(Api.lastcourse,payload);
/**
 * 46、 是否已购买课程
 */
export const isBuyCid = (payload: {cid: number | string }) => request.get(Api.isBuyCid,payload);
/**
 * 44、      创建订单
 */
export const createorder = (payload: {money: number | string;cid: number | string;}) => request.get(Api.createorder,payload);
/**
 *45、      预支付付款
 */
export const payex = (payload: {orderid: number | string ;paytype: 'miniwxpay' }) => request.get(Api.payex,payload);
/**
 *  36、	用户是否已经考试通过（通过后可选修和进阶课程）
 */
export const getUserIspass = () => request.get(Api.userIspass);

export default {};
