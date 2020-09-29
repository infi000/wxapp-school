import Taro, { useDidShow } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import { tkjf } from '@/static/images/index';
import { isArray } from 'lodash';

interface IProps{
    hotClass:Array<any>;
}

const ClassTagGroup = (props:IProps) => {
  const handleToClass = (opt) => {
    const { id } = opt;
    Taro.navigateTo({ url: '/pages/ClassDetail/index?cid=' + id });
  };
  const { hotClass } = props;
  return (
    <View className='at-row at-row--wrap hotClass-grid'>
      {isArray(hotClass) && hotClass.length>0 ? hotClass.map((item, index) => {
        const { cname, cover = tkjf, id } = item;
        return (
          <View className='at-col at-col-3 hotClass-item' key={id}>
            <Image
              style='height:40px'
              mode='heightFix'
              src={cover}
              onClick={() => {
                handleToClass(item);
              }}
            />
            <View className='hotClass-tag-name'>{cname}</View>
          </View>
        );
      }): null}
    </View>
  );
};

export default ClassTagGroup;
