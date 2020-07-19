import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { searchOrder, delOrder } from './services';
import { ORDER_OTYPE_MAP } from '@/constants/index';
const PAGE_LEN = 10; // 每页个数

interface IState {
  orderList: { [key: string | number]: { total: number; list: Array<object> } };
}

const defaultState: IState = {
  orderList: Array.from(ORDER_OTYPE_MAP.values()).reduce((res, status) => {
    res[status] = { total: 0, list: [] };
    return res;
  }, {}),
};

export default {
  namespace: 'order',
  state: defaultState,
  reducers: {
    init: (state: IState, { payload }) => {
      state = defaultState;
    },
    updateOrderList: (state: IState, { payload }) => {
      state.orderList = { ...state.orderList, ...payload };
    },
  },
  effects: {
    *searchOrder({ params }, { all, call, put }) {
      const res = yield call(searchOrder, params);
      const { total = 0, orders = [] } = res;
      const { otype } = params;
      yield put({ type: 'updateOrderList', payload: { [otype]: { list: orders, total: Number(total) } } });
    },
    *onPage({ params }, { all, call, put, select }) {
      const { otype } = params;
      const orderList = yield select((state) => state.order.orderList);
      const { total, list } = orderList[otype];
      if (total > list.length) {
        // 还未加载完
        const res = yield call(searchOrder, { ...params, offset: list.length + 1, count: PAGE_LEN });
        const { total: resTotal = 0, orders = [] } = res;
        const resList = list.concat(orders);
        yield put({ type: 'updateOrderList', payload: { [otype]: { list: resList, total: Number(resTotal) } } });
        return 
      }
      console.log("加载完了");
    },
    *delOrder({ params }, { all, call, put }) {
      const { id, otype } = params;
      yield call(delOrder, {id});
      yield put({ type: 'searchOrder', params: {otype} });
    },
  },
};
