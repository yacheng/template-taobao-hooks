import {createElement, useState, useRef} from 'rax';
import Page from './mods/Page';
import FlowView from './mods/FlowView';
import emitter from './mods/Emitter';
import Slider from './mods/Slider';
import Icon from './components/Icon';
import MultiRow from './components/Multirow';
import data from './data';
import View from './components/View';
import Text from './components/Text';
import Image from './components/Image';
import ScrollView from './components/Scrollview';
import ListView from './components/Listview';
import './App.css';

function App(props) {
  const initialValue = 0;
  const [ count, setCount ] = useState(initialValue);
  window.__global_rem_unit__ = 0.5;

  const handleLoadMore = (e) => {
    emitter.emit('pageDidReachEnd', e);
  }

  const handleLoadMoreInside = () => {
    console.log('you can load more data here');
  }

  const onchange = () => {
    console.log('slider onchange');
  }

  return (
    <Page>

      <View className={'header'}>
        <Image className={'headerIcon'} source={{uri: data.headerData.logo}} />
        <View className={'headerPlaceholder'}>
          <Icon className={'headerPlaceholderIcon'} fontFamily="iconfont" source={{uri: data.iconfont, codePoint: '\uE603'}} />
          <Text className={'headerPlaceholderText'}>寻找宝贝店铺</Text>
        </View>
      </View>

      <ScrollView
        onEndReached={handleLoadMore}
      >

        <Slider className="slider" width="750rem" height="450rem" className={'slider'}
          autoPlay={true}
          loop={true}
          showsPagination={true}
          paginationStyle={'sliderPaginationStyle'}
          autoplayTimeout={3000}
          onChange={onchange}>
          {
            data.sliderData.map((url, index) => {
              return (
                <View key={'slider' + index} className={'sliderItemWrap'}>
                  <Image className={'sliderImage'} source={{uri: url}} />
                </View>
              );
            })
          }
        </Slider>


        <View className={'appList'}>
          <MultiRow
            dataSource={data.appListData}
            cells={5}
            renderCell={(item, index) => {
              return (
                <View className={'appItem'}>
                  <Image className={'appIcon'} source={{uri: item.icon}} />
                  <Text className={'appName'}>{item.name}</Text>
                </View>
              );
            }
            } />
        </View>


        <View className={'toutiao'}>
          <View className={'toutiaoLogoBox'}>
            <Image className={'toutiaoLogo'} source={{uri: data.toutiaoData.logo}} />
          </View>
          <Text className={'toutiaoTip'}>最新</Text>
          <Text className={'toutiaoText'}>手持云台哪家强？小编推荐帮你忙！</Text>
        </View>
        <View className={'bottom'} />


        <View className={'vertical'}>
          <View className={'taoqianggou'}>
            <Image className={'taoqianggouImage'} source={{uri: data.verticalData.taoqianggouBg}} />
          </View>
          <View className={'verticalGroup'}>
            <MultiRow
              dataSource={data.verticalData.group}
              cells={2}
              renderCell={(item, index) => {
                let boxStyle, imageStyle = 'verticalGroupImageLine1';
                if (index >= 2) {
                  imageStyle = 'verticalGroupImageLine2';
                  boxStyle = 'verticalGroupBox3';
                }
                if (index == 5) {
                  boxStyle = 'verticalGroupBox4';
                }
                return (
                  <View className={boxStyle}>
                    <Image className={imageStyle} source={{uri: item}} />
                  </View>
                );
              }
              } />
          </View>
        </View>
        <View className={'bottom'} />


        <Image className={'banner'} source={{uri: data.banner}} />
        <View className={'bottom'} />


        <ListView
          renderHeader={() => {
            return (
              <View className={'likeListHeader'}>
                <Text className={'likeListHeaderTitle'}>猜你喜欢</Text>
                <Text className={'likeListHeaderText'}>实时推荐最适合你的宝贝</Text>
              </View>
            );
          }}
          renderScrollComponent={(props) => {
            return <FlowView {...props} />;
          }}
          renderRow={(item) => {
            return (
              <View className={'likeListItem'}>
                <MultiRow
                  dataSource={item}
                  cells={2}
                  renderCell={(itemInfo, index) => {
                    return (
                      <View>
                        <Image className={'likeListImage'} source={{uri: itemInfo.image}} />
                        <Text className={'likeListTitle'} numberOfLines={2}>{itemInfo.title}</Text>
                        <Text className={'likeListPrice'}>{itemInfo.price}</Text>
                      </View>
                    );
                  }
                  } />
              </View>
            );
          }}
          dataSource={data.likeListdata}
          onEndReached={handleLoadMoreInside}
        />
        <View className={'bottom'} />


      </ScrollView>


      <View className={'bottomBar'}>
        <MultiRow
          dataSource={data.barData}
          cells={5}
          renderCell={(item, index) => {
            return (
              <View className={'bottomBarItem'}>
                <Icon className={'bottomBarIcon'} fontFamily="iconfont" source={{uri: data.iconfont, codePoint: item.icon}} />
                <Text className={'bottomBarText'}>{item.text}</Text>
              </View>
            );
          }
          } />
      </View>


    </Page>
  );
}


export default App;
