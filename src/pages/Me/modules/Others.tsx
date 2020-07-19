import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import '../index.scss';

const LIST_URL_MAP = [
  { name: '我的收藏', url: '/pages/Collect/index' },
  { name: '客服助手', url: '' },
];


const Others = () => {
   const handleClickItem = (url) => {
    Taro.navigateTo({ url });
  };
  return (
    <View className='me-other-wrap'>
      {LIST_URL_MAP.map((item) => {
        const { name, url } = item;
        return (
          <View className='at-row me-others-con' key={name}>
            <View className='at-col-6 textL'>{name}</View>
            <View
              className='at-col-6 textR'
              onClick={() => {
                // handleClickItem(url);
              }}
            >
              {'>'}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Others;
