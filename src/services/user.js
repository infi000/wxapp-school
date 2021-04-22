import request from '../utils/request';
import Api from '../config/api';

/**
 *  小程序登录更新session
 */

export const getJscode2session = async (payload) => request.get(Api.getJscode2session, payload);
/**
 * 更新小程序用户信息
 */

export const saveUserData = async (payload) => request.get(Api.saveUserData, payload);
/**
 * 更新小程序用户信息
 */

export const getScorepos = async () => request.get(Api.scorepos);
/**
 * 用户是否认证通过
 */

export const getUserIsauth = async () => request.get(Api.userIsauth);

/**
 * 
 * 过审用的 返回假的openid
 */
export const getOpenId = async () => request.get(Api.getOpenId);

/**
 * 分享
 * @returns 
 */
export const postUserShare = async () => request(Api.userShare, {}, 'GET', true);

/**
 * 签到
 * @returns 
 */
export const postUserClock = async () => request(Api.userClock, {}, 'GET', true);