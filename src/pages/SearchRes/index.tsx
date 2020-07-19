import Taro, { useRouter } from '@tarojs/taro';
import { View, Block, ScrollView } from '@tarojs/components';
import GoodsList from '@/components/GoodsList';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';

const { useMemo, useEffect } = Taro;

const SearchRes = () => {
  const { goodsData, goodsDataParams } = useSelector((state) => state.searchRes);
  const { windowHeight } = useSelector((state) => state.main);
  console.log("useSelector((state) => state)",useSelector((state) => state));
  const dispatch = useDispatch();
  const router = useRouter();
  const formatList = useMemo(() => {
    const { goods } = goodsData;
    return goods;
  }, [goodsData.goods]);
  const onScrollToLower = () => {
    dispatch({type:'searchRes/getPageGoods'});
  }
  const onScroll = (e) => {
  
  }
  const scrollHeight = useMemo(() => {
    return windowHeight-50
  },[windowHeight])

  useEffect(() => {
    const { params } = router;
    dispatch({ type: 'searchRes/getSearchGoods', params: {key: params.key}});
  }, []);
  console.log("goodsDataParams", goodsDataParams);
  return (
    <View className='searchres-wrap'>
      {' '}
      <ScrollView
        className='list-wrap'
        scrollY
        scrollWithAnimation
        scrollTop={0}
        style={{ height:`${scrollHeight}px`}}
        lowerThreshold={50}
        upperThreshold={100}
        refresherEnabled
        refresherThreshold={20}
        // onScrollToUpper={onScrollToUpper}
        onScrollToLower={onScrollToLower}
        onScroll={onScroll}
      >
        <GoodsList list={formatList} />
      </ScrollView>
    </View>
  );
};

export default SearchRes;
