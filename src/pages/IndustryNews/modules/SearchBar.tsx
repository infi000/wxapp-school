import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { AtSearchBar } from 'taro-ui'
import '../index.scss';

const SearchBar = () => {
    const handleFocus = () => {
         console.log("点解！！")
    }
    return (

        <AtSearchBar value='' onChange={()=>{}} onFocus={handleFocus} />  

    )
}

export default SearchBar;

