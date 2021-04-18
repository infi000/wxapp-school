import request from '@/utils/request';
import Api from '@/config/api';


export const addMsg = (payload: { data: string }) => request.get(Api.addMessage, payload);


export const getMsg = (payload: { offset: 0; count: 100 }) => request.get(Api.myMessage, payload);

export default {};
