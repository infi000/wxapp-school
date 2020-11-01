import request from '@/utils/request';
import Api from '@/config/api';

/**
 *18、	个人考试结果（名次排行）
 */
export const getScorepos = () => request.get(Api.scorepos);

export default {};
