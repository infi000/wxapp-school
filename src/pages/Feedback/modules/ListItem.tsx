import Taro, { useEffect } from '@tarojs/taro';
import { View, Checkbox, Block } from '@tarojs/components';
import { TItem } from '../type';
import '../index.scss';


interface IProps {
  item:TItem
}

const ListItem = (props: IProps) => {
  const { item } = props;
  return (
    <View>
      {item.ctime} 反馈：
      <View>
        {item.content}
      </View>
      管理员回复：{item.backcontent}
    </View>
  );
};

export default ListItem;
