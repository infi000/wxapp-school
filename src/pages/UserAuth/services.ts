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


export default {};
