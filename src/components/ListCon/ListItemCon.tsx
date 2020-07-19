import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

interface IProps {
    image: string;
    title: string;
    children:any;
}

const ClassListCon = (props: IProps) => {
  const { image, title } = props;
  return (
    <View className='list-item'>
      <View className='at-row'>
        <View className='at-col at-col-1 at-col--auto'>
          <View className='list-image-con'>
            <Image src={image} style='width: 100%;height: 100%;' mode='aspectFill' />
          </View>
        </View>
        <View className='at-col at-col--wrap list-desc-con'>
          <View className='list-title'>{title}</View>
          <View className='list-desc'>{props.children}</View>
        </View>
      </View>
    </View>
  );
};

export default ClassListCon;
