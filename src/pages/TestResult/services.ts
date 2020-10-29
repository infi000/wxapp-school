import request from '@/utils/request';
import Api from '@/config/api';

/**
 *获取小测结果
 */
export const getMydaypaperresult = () => request.get(Api.mydaypaperresult);

export default {};
