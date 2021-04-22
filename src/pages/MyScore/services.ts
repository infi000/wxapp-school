import request from '@/utils/request';
import Api from '@/config/api';


export const getUserMyScore= () => request.get(Api.userMyScore);

export default {};
