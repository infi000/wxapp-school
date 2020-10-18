import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 31、	获取试卷试题
 */
export const getExampaperdetail = (params:{epid:string| number}) => request.get(Api.Exampaperdetail,params);
/**
 * 17、	提交题目答案
 */
export const getCanswer = (params:{epid:string| number;examid:string| number;qid:string| number;answer:string| number;}) => request.get(Api.canswer,params);
/**
 * 考试/测验结束
 */
export const getExamend = (params:{examid:string| number}) => request.get(Api.examend,params);

export default {};
