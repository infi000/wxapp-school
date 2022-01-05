import Taro, { useDidShow, useState } from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { AtActionSheet, AtActionSheetItem, AtGrid } from 'taro-ui';
import { getMycert } from './services';
import { isArray } from 'lodash';

const MyCert = () => {
  Taro.setNavigationBarTitle({
    title: 'DI动力课堂',
  });
  const [certs, setCerts] = useState([]);
  const [modal, setModal] = useState<{ show: boolean; data: { [key: string]: any } }>({ show: false, data: {} })

  const resetModal = () => {
    setModal({ show: false, data: {} })
  }
  const handleChoose = (item) => {
    setModal({show: true, data: item})
  }

  
  const handlePreview = () => {
    const { certpath } = modal.data;
    const urls = certs.map((item: any) => item.image);
    const h = certpath.replace('.jpg','_big.jpg')
    Taro.previewImage({
      current: h, // 当前显示图片的http链接
      urls:[h] // 需要预览的图片http链接列表
    })
    resetModal();
  };
  const handleCopy = () => {
    const { certpath } = modal.data;
    const urls = certs.map((item: any) => item.image);
    const h = certpath.replace('.jpg','_big.jpg')
    wx.setClipboardData({
      data:h,
    })
    resetModal();
  };

  const handleDownload = () => {
    const { certpath } = modal.data;
    const h = certpath.replace('.jpg','_big.jpg')
    Taro.downloadFile({
      url: h,
      success(res) {
        const filePath = res.tempFilePath;
        Taro.openDocument({
          filePath,
          success(res) {
            console.log('打开文档成功');
          },
        });
      },
    });
    resetModal();
  }


  useDidShow(() => {
    getMycert()
      .then((d) => {
        d.certs &&
          isArray(d.certs) &&
          setCerts(
            d.certs.map((item) => {
              return {
                ...item,
                image: item.certpath,
              };
            })
          );
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <View className='myCert-wrap'>
      <AtGrid mode='square' columnNum={2} hasBorder={true} onClick={handleChoose} data={certs} />
      <AtActionSheet isOpened={modal.show} onClose={resetModal}>
        {/* <AtActionSheetItem onClick={handlePreview} >预览</AtActionSheetItem> */}
        <AtActionSheetItem onClick={handleCopy}>复制文件地址</AtActionSheetItem>
        <AtActionSheetItem onClick={handleDownload}>相册打开</AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
};

export default MyCert;
