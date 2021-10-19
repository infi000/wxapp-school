import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { AtGrid } from 'taro-ui';

const MyCollect = (props) => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const handleChoose = (item) =>{
    console.log(item);
    const { path } = item;
    if (path) {
      Taro.navigateTo({ url: path});
    }
  }
  return (
    <View className='myCollect-wrap'>
      <AtGrid
        mode='square'
        hasBorder={true}
        onClick={handleChoose}
        data={[
          {
            value: '课程',
            path:'/pages/MyCollect/components/Course'
          },
          {
            value: '课件',
            path:'/pages/MyCollect/components/Courseware'
          },
          // {
          //   value: '新闻',
          //   path:'/pages/MyCollect/components/News'
          // },
        ]}
      />
    </View>
  );
};

export default MyCollect;
