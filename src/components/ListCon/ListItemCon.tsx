import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';
import { ctype1, ctype2, ctype3 } from '@/static/images/index';

const IMGAGE_TAG = ['',ctype1,ctype2, ctype3];

interface IProps {
    image: string;
    title: string;
    children:any;
    ctype:'1' | '2' | '3';
    onClick?: ()=>void
}

const ClassListCon = (props: IProps) => {
  const { image, title,onClick=()=>{},ctype } = props;

  return (
    <View className='list-item'>
      <View className='at-row'>
        <View className='at-col at-col-1 at-col--auto'>
          <View className='list-image-con'>
            <Image src={image} style='width: 100%;height: 100%;' mode='aspectFill'  onClick={onClick}/>
            {ctype && <Image style='height:26px' mode='heightFix' className='list-image-con-tag' src={IMGAGE_TAG[ctype]} />}
          </View>
        </View>
        <View className='at-col at-col--wrap list-desc-con'>
          <View className='list-title' onClick={onClick}>{title}</View>
          <View className='list-desc'>{props.children}</View>
        </View>
      </View>
    </View>
  );
};

export default ClassListCon;
