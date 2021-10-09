import Taro from '@tarojs/taro';
import { View, Block, Picker } from '@tarojs/components';

import { AtImagePicker } from 'taro-ui';
import api from '@/config/api';
export default class Index extends Taro.Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      files: [],
      ids: [],
    };
  }
  onChange(files) {
    const value = Taro.getStorageSync('wxUserInfo');
    const { ids } = this.state;
    const { length } = this.props;
    let openid = '';
    if (value) {
      openid = value.openid;
    }
    console.log("files[0]", files[0]);
    console.log("api.payex", api.payex);
    console.log("openid", openid);
    const uploadTask = Taro.uploadFile({
      url: api.userCommit,
      filePath: files[0],
      name: 'file',
      formData: {
        'openid': openid,
      },
      success: (res) => {
        const data = JSON.parse(res.data);

        const _files = length === 1 ? [files[files.length - 1]] : files;
        const _ids = length === 1 ? [data.data] : ids.concat(data.data);

        this.setState({
          files: _files,
          ids: _ids,
        });
        // this.props.uploadSucc(_ids.join(','));
      },
      fail:(err) => {
          console.log(err);
      }
    });
  }
  onFail(mes) {
  }
  onImageClick(index, file) {
  }
  onClick(){
    const value = Taro.getStorageSync('wxUserInfo');
    const { length } = this.props;
    let openid = '';
    if (value) {
      openid = value.openid;
    }
    wx.chooseImage({
        success (res) {
          const tempFiles = res.tempFiles
          console.log('chooseImage:res', res);
          console.log('tempFilePaths[0]', tempFiles[0].path);
          wx.uploadFile({
            url:  api.upload, //仅为示例，非真实的接口地址
            filePath: tempFiles[0].path,
            name: 'file',
            formData: {
             'id':'asdfasdfsaf',
             'Content-Type': 'multipart/form-data;charset=utf-8'
            },
            // header: {'Content-Type': 'multipart/form-data;charset=utf-8'},
            success (res){
              console.log('uploadFile:res', res);
              //do something
            },
            fail(err){
                console.log('uploadFile:err', err); 
            }
          })
        },
        fail(err){
            console.log('chooseImage:err', err);
        }
      })
  }
  render() {
    const { length } = this.props;
    console.log("1231231231312");
    return (
        <View onClick={this.onClick.bind(this)}>点击上传</View>
    //   <AtImagePicker
    //     multiple={false}
    //     count={length}
    //     files={this.state.files}
    //     onChange={this.onChange.bind(this)}
    //     onFail={this.onFail.bind(this)}
    //     onImageClick={this.onImageClick.bind(this)}
    //   />
    );
  }
}
