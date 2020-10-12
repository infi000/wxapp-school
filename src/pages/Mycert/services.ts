import request from '@/utils/request';
import Api from '@/config/api';

/**
 * 24、	我的证书
 */
export const getMycert = () => request.get(Api.mycert);

export default {};
