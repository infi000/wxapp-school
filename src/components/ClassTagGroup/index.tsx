import Taro, { useDidShow } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import { tkjf } from '@/static/images/index';
import { isArray } from 'lodash';
import { useSelector } from '@tarojs/redux';

interface IProps{
    hotClass:Array<any>;
    col?:'3' | '4';
}

const ClassTagGroup = (props:IProps) => {
  const { isLogIn } = useSelector((state) => state.main);

  const handleToClass = (opt) => {
    const { id,cname } = opt;
    console.log('isLogIn',isLogIn);

    isLogIn == 1 &&  Taro.navigateTo({ url: '/pages/ClassList/index?title='+cname+'&cid=' + id });
  };
  const { hotClass , col = '3' } = props;
  return (
    <View className='at-row at-row--wrap hotClass-grid'>
      {isArray(hotClass) && hotClass.length>0 ? hotClass.map((item, index) => {
        const { cname, cover = tkjf, id } = item;
        return (
          <View className={`at-col at-col-${col} hotClass-item`} key={id}>
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
