import request from '@/utils/request';
import Api from '@/config/api';
const mock  = 'http://easy-mock.sftcwl.com/mock/5f6a20a67266ef5678785185/wxschool/MiniApi/User/mycert';
/**
 * 24、	我的证书
 */
export const getMycert = () => request.get(Api.mycert);
// export const getMycert = () => request.get(mock);

export default {};
