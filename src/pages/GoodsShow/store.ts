import delay from '@/utils/delay';
import { isArray, toNumber, cloneDeep } from 'lodash';
import { getDetail, getRelatedGoods, getBuysRecord, getIsfav, getFav, getUnfav } from './services';

const PAGE_LEN = 50;

interface IState {
  gid?: string;
  detail: TObj<any>;
  buysRecordList: { buys: Array<TObj<any>>; total: string; offset: number };
  relatedGoods: Array<TObj<any>>;
  isShowBuysPage: boolean;
  isfav: 0 | 1;
}

const defaultState: IState = {
  gid: '',
  detail: {},
  buysRecordList: { buys: [], total: '0', offset: 0 },
  relatedGoods: [],
  isShowBuysPage: false,
  isfav: 0,
};

export default {
  namespace: 'goodsShow',
  state: defaultState,
  reducers: {
    updateIsShowBuysPaget: (state: IState, { payload }) => {
      state.isShowBuysPage = payload;
    },
    updateGid: (state, { payload }) => {
      state.gid = payload;
    },
    updateDetail: (state, { payload }) => {
      state.detail = payload;
    },
    updateRelatedGoods: (state, { payload }) => {
      state.relatedGoods = payload;
    },
    updateBuysRecordList: (state, { payload }) => {
      state.buysRecordList = payload;
    },
    updateIsfav: (state, { payload }) => {
      state.isfav = payload;
    },
  },
  effects: {
    *getDetail({}: { payload: { gid: string } }, { all, call, put, select }) {
      const { gid } = yield select((state) => state.goodsShow);
      const res = yield call(getDetail, { gid });
      yield put({ type: 'updateDetail', payload: res });
    },
    *getRelatedGoods({}: { payload: { gid: string } }, { all, call, put, select }) {
      const { gid } = yield select((state) => state.goodsShow);
      const res = yield call(getRelatedGoods, { gid });
      yield put({ type: 'updateRelatedGoods', payload: res });
    },
    *getPageBuysRecord({ payload = {} }: { payload: { refresh?: boolean } }, { all, call, put, select }) {
      const { refresh = false } = payload;
      const { gid, buysRecordList = {} } = yield select((state) => state.goodsShow);
      const { offset, total, buys = [] } = buysRecordList;
      if (!refresh && offset > 0 && offset === toNumber(total)) {
        return;
      }
      const res = yield call(getBuysRecord, { gid, count: PAGE_LEN, offset: refresh ? 0 : offset });
      if (res.buys && isArray(res.buys) && res.buys.length > 0) {
        const _buys = buys.concat(res.buys);
        const _offset = _buys.length;
        yield put({ type: 'updateBuysRecordList', payload: { ...res, buys: _buys, offset: _offset } });
      }
    },
    *getIsfav({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.goodsShow);
      const res = yield call(getIsfav, { gid });
      yield put({ type: 'updateIsfav', payload: Number(res) });
    },
    *getFav({}, { all, call, put, select }) {
      const { gid } = yield select((state) => state.goodsShow);
      yield call(getFav, { gid });
      yield put({ type: 'getIsfav' });
    },
    *getUnfav({}, { all, call, put, select }) {
      console.log(' *getUnfav({},');
      const { gid } = yield select((state) => state.goodsShow);
      console.log(' *getUnfav({},');
      yield call(getUnfav, { gid });
      yield put({ type: 'getIsfav' });
    },
  },
};
