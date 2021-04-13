import Taro from '@tarojs/taro';
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
    const uploadTask = Taro.uploadFile({
      url: api.ccUpload,
      filePath: files[0].url,
      name: 'upimg',
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
        this.props.uploadSucc(_ids.join(','));
      },
    });
  }
  onFail(mes) {
  }
  onImageClick(index, file) {
  }
  render() {
    const { length } = this.props;
    return (
      <AtImagePicker
        multiple={false}
        count={length}
        files={this.state.files}
        onChange={this.onChange.bind(this)}
        onFail={this.onFail.bind(this)}
        onImageClick={this.onImageClick.bind(this)}
      />
    );
  }
}
