import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { Block, View } from '@tarojs/components';
import { AtList, AtCheckbox } from 'taro-ui';
import { formatMap } from '@/constants/index';
import './index.scss';

interface IProps {
    range: {[key: string]: any}
    onChange: (e: any) => void
    defalutValue: any
    title: string
}

const MultiPicker = (props: IProps) => {
  const { range, onChange, defalutValue, title } = props;
  const [ value, setValue ] = useState(defalutValue)
  const formatRange = formatMap(range);
  const handleChange = (e) => {
      setValue(e)
      onChange(e);
  }
  return (
    <Block>
   <View className='Multi-title'>{title}</View>
    <AtCheckbox
      options={formatRange}
      selectedList={value}
      onChange={handleChange}
    />
    </Block>
  );
};

export default MultiPicker;
