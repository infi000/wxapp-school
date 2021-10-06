// 用户认证

import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, Picker } from '@tarojs/components';
import _Uploader from '@/components/Tabbar';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem, AtButton, AtGrid, AtInput, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { postUserModify, getAreaAll } from './services';
import { showSuccessToast, showErrorToast } from '@/utils/util';
import './index.scss';

type PCAType = 'aid' | 'city' | 'province';
type TArea = {
  id:string;
  aname:string;//地区
  ctime:string;
}
type IAreaAll  = {
  id:string;
  panme:string;//省
  areas:TArea[]
}

const Uploader: any = _Uploader;
const defaultParams = {
  uname: '',
  phone: '',
  card: '',
  province: '江苏',
  city: '苏州',
  aid: '',
};
const defaultPikerParams: any = {
  province: '',
  city: '',
  aid: '',
};
const defaultSelectModal: { show: boolean; option: Array<any>; type?: PCAType } = {
  show: false,
  option: [],
};
const UserAuth = (props) => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const [formParams, setFormParams]: [any, any] = useState({ ...defaultParams });
  const [pikerParams, setPikerParams] = useState({ ...defaultPikerParams });
  const [selectModal, setSelectModal] = useState({ ...defaultSelectModal });
  const [MAP, setMAP] = useState<IAreaAll[]|[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleUpdateForm = (params, type) => {
    console.log(params);
    setFormParams((opt) => {
      opt[type] = params;
      return opt;
    });
  };
  const handleSelectChange = (e: any, type: string) => {
    const index = e.target.value;
    setPikerParams((params) => {
      params[type] = Number(index);
      return params;
    });
    handleUpdateForm(MAP[type][index], type);
  };
  const handleSubmite = () => {
    // console.log('formParams', formParams);
    // if (Object.values(formParams).findIndex((item) => item === '') >= 0) {
    //   showErrorToast('请输入参数');
    //   return;
    // }
    postUserModify(formParams).then((d) => {
      showSuccessToast('提交成功');
      getUserIsauth().then((d)=>{
        dispatch({ type: 'main/updateUserIsAuth', payload: d });
      }) .catch((err) => {
        console.log(err);
      });
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/Main/index',
        });
      }, 500);
    });
  };
  const handleOpenSelect = (type: PCAType) => {
    setSelectModal({
      show: true,
      option: MAP[type],
      type,
    });
  };
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
    getAreaAll().then(d=>{  
      setMAP(d)
    })
  });
  const v =(MAP[0] && MAP[0].areas &&  MAP[0].areas.find(opt => opt.id == formParams.aid) )? MAP[0].areas.find(opt => opt.id == formParams.aid)['aname'] : '';
  return (
    <View className='baseWrap'>
      <AtInput name='value' title='姓名' type='text' value={formParams.uname} onChange={(e) => handleUpdateForm(e, 'uname')} />
      <AtInput name='value' title='手机号' type='text' value={formParams.phone} onChange={(e) => handleUpdateForm(e, 'phone')} />
      <AtInput name='value' title='身份证号' type='text' value={formParams.card} onChange={(e) => handleUpdateForm(e, 'card')} />
      <AtInput name='value' title='省' type='text' disabled value={formParams.province} onChange={(e) => handleUpdateForm(e, 'province')} />
      {/* <AtInput name='value' title='市' type='text' disabled value={formParams.city} onChange={(e) => handleUpdateForm(e, 'city')} /> */}
      <AtInput
        name='value'
        title='地区'
        type='text'
        value={ v }
        onChange={(e) => handleUpdateForm(e, 'aid')}
        onFocus={() => handleOpenSelect('aid')}
      />
      {/* <View>
        <Picker mode='selector' range={MAP.province} onChange={(e) => handleSelectChange(e, 'province')} value={pikerParams.province}>
          <AtList>
            <AtListItem title='省' extraText={formParams.province} />
          </AtList>
        </Picker>
      </View>
      <View>
        <Picker mode='selector' range={MAP.city} onChange={(e) => handleSelectChange(e, 'city')} value={pikerParams.city}>
          <AtList>
            <AtListItem title='市' extraText={formParams.city} />
          </AtList>
        </Picker>
      </View>
      <View>
        <Picker mode='selector' range={MAP.aid} onChange={(e) => handleSelectChange(e, 'aid')} value={pikerParams.aid}>
          <AtList>
            <AtListItem title='区' extraText={formParams.aid} />
          </AtList>
        </Picker>
      </View> */}

      {/* <View>
        身份证
        <Uploader length={3} uploadSucc={(e) => handleUpdateForm({ pics: e })} />
      </View>
      <View>
        头像
        <Uploader length={3} uploadSucc={(e) => handleUpdateForm({ pics: e })} />
      </View> */}
      <AtButton type='primary' size='small' onClick={handleSubmite}>
        提交
      </AtButton>
      <AtActionSheet
        isOpened={selectModal.show}
        onClose={() => {
          setSelectModal({ ...defaultSelectModal });
        }}
      >
        {MAP[0] && MAP[0].areas.map((opt) => {
          const {aname, id} = opt;
          return (
            <AtActionSheetItem
              key={id}
              onClick={() => {
                handleUpdateForm(id, selectModal.type);
                setSelectModal({ ...defaultSelectModal });
              }}
            >
              {aname}
            </AtActionSheetItem>
          );
        })}
      </AtActionSheet>
    </View>
  );
};

export default UserAuth;
