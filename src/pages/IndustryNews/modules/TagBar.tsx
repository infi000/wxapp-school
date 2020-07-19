import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { zyzgz, zjzb, tkjf, qbkc, hyzsk } from '@/static/images/index';
import '../index.scss';

const { useState, useEffect, useMemo } = Taro;

const TagBar = () => {

  return (
    <View className='tagbar-wrap'>
     <View className='at-row at-row__justify--between tagbar-grid'>
        <View className='at-col at-col-2'>
          {/* 题库积分 */}
          <Image style='height:50px' mode='heightFix' src={tkjf} />
          <View className='tagbar-tag-name'>题库积分</View>
        </View>
        <View className='at-col at-col-2'>
          {/* 职业资格证 */}
          <Image style='height:50px' mode='heightFix' src={zyzgz} />
          <View className='tagbar-tag-name'>职业资格证</View>
        </View>
        <View className='at-col at-col-2'>
          {/* 全部课程 */}
          <Image style='height:50px' mode='heightFix' src={qbkc} />
          <View className='tagbar-tag-name'>全部课程</View>
        </View>
        <View className='at-col at-col-2'>
          {/* 专家直播 */}
          <Image style='height:50px' mode='heightFix' src={zjzb} />
          <View className='tagbar-tag-name'>专家直播</View>
        </View>
        <View className='at-col at-col-2'>
          {/* 行业知识库 */}
          <Image style='height:50px' mode='heightFix' src={hyzsk} />
          <View className='tagbar-tag-name'>行业知识库</View>
        </View>
      </View>
    </View>
  );
};

export default TagBar;
