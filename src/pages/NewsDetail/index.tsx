import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';
import './index.scss';

const NewsDetail = () => {
  return (
    <View className='newsDetail-wrap'>
      <View className='at-article'>
        <View className='at-article__h1'>8年来，1000多个项目落户常州</View>　
        <View className='at-article__info'>2014-05-13 12:35:30&nbsp;&nbsp;&nbsp;来源: 网易</View>
        <View className='at-article__content'>
          <View className='at-article__section'>
            {/* <View className='at-article__h2'>这是二级标题</View>
            <View className='at-article__h3'>这是三级标题</View> */}
            <View className='at-article__p'>
              第九届中国常州先进制造技术成果展示洽谈会，将于5月18日在常州科教城开幕。

              今年“5·18”展洽会的主题是“改革创新·合作共赢”。今年展洽会期间，我市将围绕十大产业链的发展、创新人才的集聚和创新平台的深化等，举行中科院“百人学者”创业对接、外籍院士工作站签约、浙江大学常州工业技术研究院入驻仪式、2014先进制造技术创新创业大赛等一系列专题和配套活动。

              8年展洽会合同总金额超过了11亿元

              2006年以来，为加快建设国家创新型城市、大力发展创新型经济，我市秉承“经科教联动、产学研结合、校所企共赢”的理念，通过“走出去、请进来、搭平台、建机构、抓项目、引人才”，深入探索和实践产学研合作的“常州模式”，吸纳集聚了一大批国内外科技资源，连续8年成功举办中国常州先进制造技术成果展示洽谈会，广邀国内外科研院所的专家教授与常州的企业家“零距离”对接，促进科技成果在我市转移转化，有效地推动了我市科技创新战略的实施。

              八届展洽会，累计邀请国内外专家5700多人，参会企业11800多家，展示成果33700余项，发布各类技术需求3400余项，组织各类专题活动205场，现场签约项目556项，合同总金额超过11亿元。

              我市与中科院、清华大学、浙江大学、哈尔滨工业大学、北京化工大学等23所高校及有关院所签订了全面合作协议，引进建设了一批成果转移中心、技术研发机构和公共服务平台。

              “5·18”展洽会成为了常州的品牌

              从2006年以来展洽会的连续举办，得到高校院所的高度重视和大力支持，打造了常州的“5·18”品牌。

              每年展洽会，中科院所属院所和一大批知名高校作为协办单位，积极组织本校领导及专家组团参会，举办各种形式的科技交流及对接洽谈活动，推动了优秀人才和项目的落户，我市科技园区及企业也频频到高校院所“淘宝”，大大提高了常州在国内科技教育界的知名度和影响力。

              常州市连续14年荣获“全国科技进步考核先进市”称号，2013中国城市创新报告常州名列地级市第7位。

              2011年，中科院常州中心与常州大学承办的中科院技术科学部、信息技术科学部常委会暨“院士常州行”活动，34名院士齐聚常州，为常州科技经济发展提供咨询服务，这次活动促进了院士们对常州的了解，也创出了来常院士数量的最高纪录。

              2012年，南京大学常州研究院与常州大学等共同承办了由南京大学和国家自然科学基金委主办的“第三届有机合成和药物研发国际会议”，包括4位诺贝尔奖获得者在内的国内外知名学者70余人为常州企业和科研机构做了多场精彩的学术报告。

              1000多个项目落户常州，新增产值130亿元

              展洽会的举办，有效地促进了前瞻性项目的培育，重大成果的产业化和高新企业的孵化培育。据不完全统计，展洽会带动了1000多个项目落户常州。全市115个省重大成果转化项目中，91个是与高校院所联合实施的，共争取到省经费支持8.7亿元。

              经对前八届展洽会现场签约项目的统计，除平台载体项目、中止项目外，共新增产值130亿元，出口额达4亿元，企业获得净利润21亿元，上缴税金17亿元。

              全国知名高校在常设立机构达29个

              展洽会除了带动项目落户常州，在引建机构，增强区域创新能力方面作用也非常明显。

              江苏中科院智能科学技术应用研究院成为院省共建的重大平台，西南交大常州轨道交通研究院、中科院常州储能材料与器件研究院、中科院常州科学与艺术融合研究中心等7家机构成为江苏省产学研联合重大创新载体，得到省级以上经费支持1.5亿元。常州先进所、北京化工大学常州研究院列入江苏省产业技术研究院专业性研究所建设。随着机构的不断壮大，大连理工常州研究院、北京化工大学常州研究院、南京大学常州研究院等3家单位自筹资金在科教城建设了独立的科技大厦，总计面积达55500平方米，同时正在建设各具特色的专业孵化器。机构建有近100个专业实验室、检测中心、产业化中心等子平台，80%以上机构都已购置科研相关的仪器设备。大多数机构科技合作项目总量每年以30%以上速度递增。

              通过展洽会的举办，全国知名高校院所积极融入我市创新创业活动，其中在常设立研究机构的达29个，高校院所也因机构平台的落地，而与常州建立了持久而稳固的合作关系。机构平台有效提升我市的创新能力，有机融入我市创新创业活动，对产业引领和企业创新的支撑带动作用日益显现。
            </View>
            {/* <View className='at-article__p'>这是文本段落。这是文本段落。</View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsDetail;
