import Taro, { useDidShow, useState, useRouter } from '@tarojs/taro';
import { Picker } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { formatMap } from '@/constants/index';

interface IProps {
    range: {[key: string]: any};
    onChange: (e:any) => void;
    defalutValue: any;
    title: string;
}

const PickerPlus = (props: IProps) => {
  const { range, onChange, defalutValue, title } = props;
  const [ value, setValue ] = useState(defalutValue)
  const formatRange = formatMap(range);
  const handleChange = (e) => {
      const { detail } = e;
      const { value } = detail;
      const target = formatRange[value].value;
      setValue(target);
      onChange(target);
  }
  return (
    <Picker mode='selector' range={formatRange} rangeKey='label' onChange={handleChange}>
    <AtList>
      <AtListItem
        title={title}
        extraText={range[value]}
      />
    </AtList>
  </Picker>
  );
};

export default PickerPlus;
