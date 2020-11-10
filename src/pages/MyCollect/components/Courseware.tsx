import Taro, { useDidShow, useEffect, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import { AtButton, AtGrid, AtTag } from 'taro-ui';
import { getMyattcourseware } from '../services';
import { defaultNews } from '@/static/images/index';
import ListCon, { ListItemCon } from '@/components/ListCon';
import { isArray } from 'lodash';

const MyCourseware = (props) => {
  Taro.setNavigationBarTitle({
    title: '华鑫学堂',
  });
  const [coursewares, setCoursewares]:[any,any] = useState([]);
  const handleToClassPlay = (id,cwtype) => {
    // Taro.downloadFile({
    //   // e.target.dataset.name 是文件的地址
    //   url: 'http://127.0.0.1:8080/WMS.pptx',
    //   success(res) {
    //     const filePath = res.tempFilePath;
    //     console.log(filePath)
    //     Taro.openDocument({
    //       filePath,
    //       success(res) {
    //         console.log('打开文档成功')
    //       }
    //     })
    //   }
    // })
    Taro.navigateTo({ url: '/pages/ClassPlay/index?id=' + id });
  };
  useDidShow(() => {
    getMyattcourseware()
      .then((d) => {
        d.coursewares && setCoursewares(d.coursewares);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='classInfo-wrap'>
    <View className='class-con'>
      {isArray(coursewares) &&
        coursewares.map((item) => {
          return (
            <View className='at-row class-item' key={item}>
              <View className='at-col at-col-2'>
                <AtTag size='small'>音频</AtTag>
              </View>
              <View className='at-col at-col-8  class-item-desc'>{item.cwname}</View>
              <View className='at-col at-col-2'>
                <AtButton type='primary' size='small' className='at-button-mini' onClick={() => handleToClassPlay(item.id, item.cwtype)}>
                  试听
                </AtButton>
              </View>
            </View>
          );
        })}
    </View>
    </View>

  );
};

export default MyCourseware;
