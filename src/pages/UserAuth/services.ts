import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 31、	获取试卷试题
 */
interface IParams {
    uname: string,
    phone:string,
    card:string
    face:any,
    [key:string]:any

}
export const postUserModify = (params:IParams) => request.post(Api.userModify,params);
export const postUserCommit = (params:any) => request.post(Api.userCommit,params);
export const getAreaAll = () => request.get(Api.areaAll);


export default {};
