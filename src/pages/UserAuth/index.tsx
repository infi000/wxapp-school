// 用户认证

import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { View, Block, Picker } from '@tarojs/components';
import _Uploader from '@/components/Tabbar';
import { useSelector, useDispatch } from '@tarojs/redux';
import { AtList, AtListItem, AtButton, AtGrid, AtInput } from 'taro-ui';
import { postUserModify } from './services';
import {showSuccessToast } from '@/utils/util';
import './index.scss';

const MAP = {
  province: ['江苏'],
  city: ['苏州'],
  area: ['姑苏区', '相城区', '吴中区', '吴江市', '昆山市', '张家港市', '太仓市', '常熟市', '苏州高新区', '苏州工业园区'],
};
const Uploader: any = _Uploader;
const defaultParams = {
  uname: '',
  phone: '',
  card: '',
  province: '江苏',
  city: '苏州',
  area: '',
};
const defaultPikerParams: any = {
  province: '',
  city: '',
  area: '',
};
const UserAuth = (props) => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [formParams, setFormParams]:[any , any] = useState(defaultParams);
  const [pikerParams, setPikerParams] = useState(defaultPikerParams);
  const router = useRouter();
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
    console.log(formParams);
    console.log(pikerParams);
    postUserModify(formParams).then(d=>{
      showSuccessToast('提交成功')
    })
  };
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
  });

  return (
    <View className='baseWrap'>
      <AtInput name='value' title='姓名' type='text' value={formParams.uname} onChange={(e) => handleUpdateForm(e, 'uname')} />
      <AtInput name='value' title='手机号' type='text' value={formParams.phone} onChange={(e) => handleUpdateForm(e, 'phone')} />
      <AtInput name='value' title='身份证号' type='text' value={formParams.card} onChange={(e) => handleUpdateForm(e, 'card')} />
      <AtInput name='value' title='省' type='text' disabled value={formParams.province} onChange={(e) => handleUpdateForm(e, 'province')} />
      <AtInput name='value' title='市' type='text' disabled value={formParams.city} onChange={(e) => handleUpdateForm(e, 'city')} />
      <AtInput name='value' title='区' type='text' value={formParams.area} onChange={(e) => handleUpdateForm(e, 'area')} />

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
        <Picker mode='selector' range={MAP.area} onChange={(e) => handleSelectChange(e, 'area')} value={pikerParams.area}>
          <AtList>
            <AtListItem title='区' extraText={formParams.area} />
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
    </View>
  );
};

export default UserAuth;
