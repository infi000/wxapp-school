import request from '@/utils/request';
import Api from '@/config/api';



export const getUserMyinfo= () => request.get(Api.userMyinfo);

export default {};
