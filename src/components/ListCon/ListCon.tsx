import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { isArray } from 'lodash';
import { AtTag } from 'taro-ui';

import './index.scss';
import { ReactDOM } from 'react';

interface IProps {
  listInfo: Array<{
    id: string;
    image: string;
    title: string;
    desc?: string;
    handleClick?: (params?: any, index?: number) => any;
    tags?: Array<string>;
    [key:string]:any;
  }>;
}

const ListCon = (props: IProps) => {
  const { listInfo = [] } = props;
  return (
    <View className='list-wrap'>
      {isArray(listInfo) &&
        listInfo.map((item, index) => {
          const { image, handleClick, title, desc, tags, id } = item;
          return (
            <View className='list-item' key={id + index}>
              <View className='at-row'>
                <View className='at-col at-col-1 at-col--auto'>
                  <View
                    className='list-image-con'
                    onClick={()=> handleClick && handleClick(item,index)}
                  >
                    <Image src={image} style='width: 100%;height: 100%;' mode='aspectFill' />
                  </View>
                </View>
                <View className='at-col at-col--wrap list-desc-con'>
                  <View
                    className='list-title'
                    onClick={() => {
                      handleClick && handleClick(item, index);
                    }}
                  >
                    {title}
                  </View>
                  <View
                    className='list-desc'
                    onClick={() => {
                      handleClick && handleClick(item, index);
                    }}
                  >
                    {desc}
                  </View>
                </View>
              </View>
              {isArray(tags) && (
                <View className='list-tags-group textR'>
                  {tags.map((name) => (
                    <View className='tags-item' key={name}>
                      <AtTag size='small'>{name}</AtTag>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
    </View>
  );
};

export default ListCon;
