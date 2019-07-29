import {createElement, useState, useRef, useEffect} from 'rax';
import Page from './mods/Page';
import FlowView from './mods/FlowView';
import emitter from './mods/Emitter';
import Icon from './components/Icon';
import MultiRow from './components/Multirow';
import data from './data';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import Picture from './components/Picture';
import Slider from 'rax-slider';
import ScrollView from 'rax-scrollview';
import ListView from './components/Listview';
import styles from './AppCss.js';

function App(props) {
  const initialValue = 0;
  const [ likeListdata, setLikeListdata ] = useState([]);
  const [ logoImage, setLogoImage ] = useState(data.headerData.logo);
  const headerRef = useRef(null);
  const headerPlaceholderRef = useRef(null);

  setTimeout(() => {
    setLikeListdata(data.likeListdata);
  }, 1000);

  // setTimeout(() => {
  //   setLogoImage('//img.alicdn.com/imgextra/i4/3361811308/TB2pJ.qhJnJ8KJjSszdXXaxuFXa_!!3361811308.jpg');
  // }, 2000);

  window.__global_rem_unit__ = 0.5;

  const handleLoadMore = (e) => {
    console.log('list loadmore');
    console.log('headerRef', headerRef);
    console.log('headerPlaceholderRef', headerPlaceholderRef);
    emitter.emit('pageDidReachEnd', e);
  }

  const handleLoadMoreInside = () => {
    console.log('you can load more data here');
  }

  const onchange = () => {
    // console.log('slider onchange');
  }


  return (
    <Page>
      <View ref={headerRef} style={styles.header}>
        <Picture 
          style={styles.headerIcon} 
          source={{uri: logoImage}} 
          resizeMode={'cover'}
        />
        <View style={styles.headerPlaceholder}>
          <Icon style={styles.headerPlaceholderIcon} fontFamily="iconfont" source={{uri: data.iconfont, codePoint: '\uE603'}} />
          <Text ref={headerPlaceholderRef} style={styles.headerPlaceholderText}>寻找宝贝店铺</Text>
        </View>
      </View>
      <ScrollView
        onEndReached={handleLoadMore}
      >

        <Slider className="slider" width="750rem" height="450rem" style={styles.slider}
          autoPlay={true}
          loop={true}
          showsPagination={true}
          paginationStyle={styles.sliderPaginationStyle}
          autoplayTimeout={3000}
          onChange={onchange}>
          {
            data.sliderData.map((url, index) => {
              return (
                <View key={'slider' + index} style={styles.sliderItemWrap}>
                  <Image style={styles.sliderImage} source={{uri: url}} />
                </View>
              );
            })
          }
        </Slider>

        <View style={styles.appList}>
          <MultiRow
            dataSource={data.appListData}
            cells={5}
            renderCell={(item, index) => {
              return (
                <View style={styles.appItem}>
                  <Image style={styles.appIcon} source={{uri: item.icon}} />
                  <Text style={styles.appName}>{item.name}</Text>
                </View>
              );
            }
            } />
        </View>


        <View style={styles.toutiao}>
          <View style={styles.toutiaoLogoBox}>
            <Image style={styles.toutiaoLogo} source={{uri: data.toutiaoData.logo}} />
          </View>
          <Text style={styles.toutiaoTip}>最新</Text>
          <Text style={styles.toutiaoText}>手持云台哪家强？小编推荐帮你忙！</Text>
        </View>
        <View style={styles.bottom} />


        <View style={styles.vertical}>
          <View style={styles.taoqianggou}>
            <Image style={styles.taoqianggouImage} source={{uri: data.verticalData.taoqianggouBg}} />
          </View>
          <View style={styles.verticalGroup}>
            <MultiRow
              dataSource={data.verticalData.group}
              cells={2}
              renderCell={(item, index) => {
                let boxStyle, imageStyle = styles.verticalGroupImageLine1;
                if (index >= 2) {
                  imageStyle = styles.verticalGroupImageLine2;
                  boxStyle = styles.verticalGroupBox3;
                }
                if (index == 5) {
                  boxStyle = styles.verticalGroupBox4;
                }
                return (
                  <View style={boxStyle}>
                    <Image style={imageStyle} source={{uri: item}} />
                  </View>
                );
              }
              } />
          </View>
        </View>
        <View style={styles.bottom} />


        <Image style={styles.banner} source={{uri: data.banner}} />
        <View style={styles.bottom} />


        <ListView
          renderHeader={() => {
            return (
              <View style={styles.likeListHeader}>
                <Text style={styles.likeListHeaderTitle}>猜你喜欢</Text>
                <Text style={styles.likeListHeaderText}>实时推荐最适合你的宝贝</Text>
              </View>
            );
          }}
          renderScrollComponent={(props) => {
            return <FlowView {...props} />;
          }}
          renderRow={(item) => {
            return (
              <View style={styles.likeListItem}>
                <MultiRow
                  dataSource={item}
                  cells={2}
                  renderCell={(itemInfo, index) => {
                    return (
                      <View>
                        <Image style={styles.likeListImage} source={{uri: itemInfo.image}} />
                        <Text style={styles.likeListTitle} numberOfLines={2}>{itemInfo.title}</Text>
                        <Text style={styles.likeListPrice}>{itemInfo.price}</Text>
                      </View>
                    );
                  }
                  } />
              </View>
            );
          }}
          dataSource={likeListdata}
          onEndReached={handleLoadMoreInside}
        />
        <View style={styles.bottom} />


      </ScrollView>


      <View style={styles.bottomBar}>
        <MultiRow
          dataSource={data.barData}
          cells={5}
          renderCell={(item, index) => {
            return (
              <View style={styles.bottomBarItem}>
                <Icon style={styles.bottomBarIcon} fontFamily="iconfont" source={{uri: data.iconfont, codePoint: item.icon}} />
                <Text style={styles.bottomBarText}>{item.text}</Text>
              </View>
            );
          }
          } />
      </View>


    </Page>
  );
}

export default App;