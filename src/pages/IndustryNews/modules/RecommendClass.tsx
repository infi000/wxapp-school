import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ListItemCon } from '@/components/ListCon';
import TitleCon from '@/components/TitleCon';
import { defaultFace } from '@/static/images/index';
import { AtTag } from 'taro-ui';

import '../index.scss';

const RecommendClass = () => {
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

  return (
    <View className='recommendClass-wrap'>
      <TitleCon title='课程推荐' tag='查看更多' />
      <View>
        {listInfo.map((item) => {
          const { image, title, child, id } = item;
          const { left, mid, right } = child;
          return (
            <View className='recommendClass-list-item' key={id} onClick={() => handleToClass(item)}>
              <ListItemCon image={image} title={title}>
                <View className='at-row at-row__justify--between'>
                  <View className='at-col at-col-3'>{left}</View>
                  <View className='at-col at-col-4'>{mid}</View>
                  <View className='at-col at-col-5 textR'>
                    <AtTag size='small' type='primary' circle>
                      {right}
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
