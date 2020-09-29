import Taro, { useDidShow, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ListItemCon } from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';
import { defaultFace } from '@/static/images/index';
import { AtTag } from 'taro-ui';
import { getCourseHotcourse } from '../services';
import '../index.scss';

const RecommendClass = () => {
  const [hotClass, setHotClass] = useState([]);
  const handleToClass = (opt) => {
    const { id } = opt;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?id=' + id });
  };
  const listInfo = [
    {
      id: '1',
      image: defaultFace,
      title: '职场中最高的自律，是放弃不断改变',
      child: {
        left: '王益胃',
        mid: '直播：10:00',
        right: '预约',
      },
    },
    {
      id: '2',
      image: defaultFace,
      title: '职场中最高的自律，是放弃不断改变，是放弃不断改变',
      child: {
        left: '王益胃',
        mid: '直播：10:00',
        right: '预约',
      },
    },
  ];
  useEffect(() => {
    getCourseHotcourse({count:4}).then(d=>{
      d.courses && setHotClass(d.courses);
    }).catch(e =>{
      console.log(e);
    })
  },[]);
  return (
    <View className='recommendClass-wrap'>
      <TitleCon title='课程推荐' tag='查看更多' />
      <View>
        {hotClass.map((item) => {
          const { cover, cname, id,starttime } = item;
          return (
            <View className='recommendClass-list-item' key={id} onClick={() => handleToClass(item)}>
              <ListItemCon image={cover} title={cname}>
                <View className='at-row at-row__justify--between'>
                  <View className='at-col at-col-3'>无</View>
                  <View className='at-col at-col-4'>{starttime}</View>
                  <View className='at-col at-col-5 textR'>
                    <AtTag size='small' type='primary' circle>
                     预约
                    </AtTag>
                  </View>
                </View>
              </ListItemCon>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RecommendClass;
