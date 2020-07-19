import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtTag } from 'taro-ui';
import './index.scss';

interface IProps {
  title: string;
  tag?: string;
  onClick?: Function;
}
const TitleCon = (props: IProps) => {
  const { title, tag, onClick } = props;
  return (
    <View className='at-row at-row--wrap title-con'>
      <View className='at-col at-col-9'>{title}</View>
      <View
        className='at-col at-col-3 textR'
        onClick={() => {
          onClick && onClick();
        }}
      >
        {tag && <AtTag size='small'>{tag}</AtTag>}
      </View>
    </View>
  );
};
export default TitleCon;
