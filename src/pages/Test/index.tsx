import Taro, { useDidShow, useState,useRouter } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import {} from './services';
import { AtGrid } from 'taro-ui';

const getMyattcourse:any = ()=> {};
const MyCollect = (props) => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [hotClass, setHotClass] = useState([]);
  const router = useRouter();

  const handleChoose = (item) =>{
    console.log(item);
    const { path } = item;
    if (path) {
      Taro.navigateTo({ url: path});
    }
  }
  useDidShow(() => {
    const { params } = router;
    const { cid = 1 } = params || {};
    getMyattcourse().then(d=>{
      d.courses && setHotClass(d.courses);
    }).catch(e =>{
      console.log(e);
    })
  });

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
          {
            value: '新闻',
            path:'/pages/MyCollect/components/News'
          },
        ]}
      />
    </View>
  );
};

export default MyCollect;
