import delay from '@/utils/delay';
import { isArray, toNumber } from 'lodash';
import { getUerFavorite, getUnfav } from './services';
const PAGE_LEN = 10; // 每页个数

interface IState {
  favoriteList: {
    total: number;
    list: Array<{
      id: string;
      uid: string;
      goodid: string;
      create_time: string;
      num: string;
      title: string;
      sale: string;
      fpath: string;
      price: string;
      issale: string;
    }>;
  };
}

const defaultState: IState = {
  favoriteList: { total: 0, list: [] },
};

export default {
  namespace: 'collect',
  state: defaultState,
  reducers: {
    init: (state: IState, { payload }) => {
      state = defaultState;
    },
    updateFavoriteList: (state: IState, { payload }) => {
      const { total, favgoods } = payload;
      state.favoriteList = { list: favgoods, total: Number(total) };
    },
  },
  effects: {
    *geFavorite(_, { all, call, put }) {
      const res = yield call(getUerFavorite);
      yield put({ type: 'updateFavoriteList', payload: res });
    },
    *delFav({params}, { all, call, put }) {
      yield call(getUnfav,{...params});
      yield put({ type: 'geFavorite' });
    },
  },
};
