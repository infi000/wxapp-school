import Taro, { useDidShow, useEffect, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import { AtGrid } from 'taro-ui';
import { getMyattcourse } from '../services';
import { defaultNews } from '@/static/images/index';
import ListCon, { ListItemCon } from '@/components/ListCon';

const MyCourse = (props) => {
    Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [hotClass, setHotClass] = useState([]);
  const handleToClass = (id) => {
    Taro.navigateTo({ url: '/pages/ClassDetail/index?cid=' + id });
  };

  useDidShow(() => {
    getMyattcourse().then(d=>{
      d.courses && setHotClass(d.courses);
    }).catch(e =>{
      console.log(e);
    })
  });
  return (
    <View className='recommendClass-wrap'>
           {hotClass.map((item) => {
          const { cover, cname, id,cid,starttime,endtime } = item;
          return (
            <View className='recommendClass-list-item' key={id}>
              <ListItemCon image={cover} title={cname}  onClick={() => handleToClass(id)}>
                <View className='at-row at-row__justify--between'>
                  {/* <View className='at-col at-col-1'></View> */}
                  <View className='at-col at-col-6'>开始时间:{starttime}</View>
                  <View className='at-col at-col-6 textR'>
                    结束时间:{endtime}
                  </View>
                </View>
              </ListItemCon>
            </View>
          );
        })}
    </View>
  );
};

export default MyCourse;
