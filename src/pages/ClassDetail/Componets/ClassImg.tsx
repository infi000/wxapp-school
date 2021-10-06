import Taro, { useDidShow, useState, useRouter, useMemo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import '../index.scss';
import { get, isArray } from 'lodash';
import { AtButton } from 'taro-ui';

const CLassImg = (props) => {
  // const {  handleBack } = props;
  const [info,setInfo]:[any,any] = useState({});
  const router = useRouter();
  Taro.setNavigationBarTitle({
    title:'DI动力课堂',
  });
console.log('info',info);
  useDidShow(() => {
    const { params } = router;
    const { info = ''} = params || {};
    console.log(info);
    if(info){
      setInfo(()=>{
        return JSON.parse(decodeURIComponent(info))
      })
    }
  });

  return (
    <View className='classImg-wrap'>
      {/* <View className='btn-back'>
        <AtButton type='primary' size='small' className='at-button-mini' onClick={handleBack}>
          退出
        </AtButton>
      </View> */}
      <View className='at-article'>
        <View className='at-article__h2'>{info.cwname}</View>
        <View className='at-article__info'>{info.ctime}</View>
        <View className='at-article__p'>{info.cwdes}</View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            {get(info, ['files'], []).map((item: any) => {
              return <Image key={item.id} className='at-article__img' src={item.fpath} mode='widthFix' />;
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CLassImg;
