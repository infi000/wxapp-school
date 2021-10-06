import Taro, { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { cloneDeep } from 'lodash';
import request from '@/utils/request';
import Api from '@/config/api';
import { showErrorToast } from '@/utils/util';

const { useState, useEffect } = Taro;
export default {};
export const useCheckBoxList = (
  list: Array<{ [key: string]: any }> | []
): {
  handleSelectedAll: (type?: boolean) => void;
  handleSelected: (index: number, type?: boolean) => void;
  isSelectedAll: boolean;
  checkBoxList: Array<{ checked: boolean;[key: string]: any }>;
  checkedItem: [] | Array<{ checked: boolean;[key: string]: any }>;
} => {
  const [checkBoxList, setCheckboxList]: [any, any] = useState(() => {
    return list
      ? list.map((item) => {
        item.checked = false;
        return item;
      })
      : [];
  });
  const [checkedItem, setCheckedItem]: [any, any] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const handleSelectedAll = (type?: boolean): void => {
    let res = !isSelectedAll;
    if (typeof type === 'boolean') {
      res = type;
    }
    setIsSelectedAll(res);
    setCheckboxList((arr) => {
      arr.map((item) => {
        item.checked = res;
        return item;
      });
      return cloneDeep(arr);
    });
  };
  const handleSelected = (index: number, type?: boolean): void => {
    setCheckboxList((arr) => {
      let itemType = [...arr][index].checked;
      itemType = !itemType;
      if (typeof type === 'boolean') {
        itemType = type;
      }
      arr[index].checked = itemType;
      return cloneDeep(arr);
    });
  };
  useEffect(() => {
    const unSelectedAll = checkBoxList.some((item) => item.checked === false);
    setIsSelectedAll(!unSelectedAll);
    setCheckedItem(() => {
      return checkBoxList.filter((item) => item.checked);
    });
  }, [checkBoxList]);
  useEffect(() => {
    setCheckboxList(() => {
      return list
        ? list.map((item) => {
          item.checked = false;
          return item;
        })
        : [];
    });
  }, [list]);
  return { handleSelectedAll, handleSelected, isSelectedAll, checkBoxList, checkedItem };
};

/**
 * 
 * @param namespace string 当前模块stroe的namesacpe
 * @param dispatch useDispatch方法
 */
export const useInitialValue = (namespace, dispatch) => {
  useEffect(() => {
    dispatch({ type: `${namespace}/init` })
  }, [])
};


export const useIspass = () => {
  return (ctype: string, cb: (d?: any) => void) => {
    if (ctype !== '1') {
      request.get(Api.userIspass).then((d) => {
        if (d == 1) {
          cb(d)
        } else {
          showErrorToast('无权限');
        }
      })
    } else {
      cb();
    }
  }
}


export const useShare = (params?: { path: string; }) => {
  useShareAppMessage(() => {
    return {
      title:'DI动力课堂'
    }
  });
}