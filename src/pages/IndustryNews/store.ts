import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import {  getCourseHotcourse } from './services';
import { TOTAL_CLASS } from '@/constants/index';
const PAGE_LEN = 10; // 每页个数

interface IState {
  // hotClass:Array<TObj<any>>
}

const defaultState: IState = {
  // hotClass:TOTAL_CLASS

};

export default {
  namespace: 'IndustryNews',
  state: defaultState,
  reducers: {
    // updateHotClass: (state: IState, { payload }) => {
    //   state.hotClass = payload;
    // },

  },
  effects: {

  },
};
