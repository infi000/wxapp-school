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
 * 获取每日小测
 */
export const getDaypaper = () => request.get(Api.daypaper);

export default {};
