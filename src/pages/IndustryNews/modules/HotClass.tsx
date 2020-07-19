import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import TitleCon from '@/components/TitleCon';
import { TOTAL_CLASS } from '@/constants/index';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;

const HotClass = () => {
  const handleToClass = (opt) => {
    const { id } = opt;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?id=' + id });
  };
  return (
    <View className='hotClass-wrap'>
      <TitleCon title='热门课程' />
      <View className='at-row at-row--wrap hotClass-grid'>
        {TOTAL_CLASS.map((item, index) => {
          const { name, src } = item;
          return index < 8 ? (
            <View className='at-col at-col-3 hotClass-item' key={name}>
              <Image style='height:40px' mode='heightFix' src={src}  onClick={()=>{handleToClass(item)}}/>
              <View className='hotClass-tag-name'>{name}</View>
            </View>
          ) : null;
        })}
      </View>
    </View>
  );
};

export default HotClass;
