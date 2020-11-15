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