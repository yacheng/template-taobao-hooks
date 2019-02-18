import {createElement, useState, useRef, createRef, useEffect} from 'rax';
import cloneElement from '../api/rax-clone-element';
import findDOMNode from '../api/rax-find-dom-node';
import View from '../components/View';
import PanResponder from 'universal-panresponder';
import SwipeEvent from './Swipe';
import styles from './sliderStyle';

/**
* @Slider Entrance
* rax-slider h5 version
**/
export default (props) => {

  let index = 0,
    thisHeight = null,
    thisWidth = null,
    loopIdx = 0,
    DIRECTION = {
      LEFT: 'SWIPE_LEFT',
      RIGHT: 'SWIPE_RIGHT'
    },
    offsetX = null,
    isSwiping = false,
    autoPlayTimer = null,
    total = 0;

  const [paginationIndex, setPaginationIndex] = useState(index);
  const swipeView = useRef(null), childViewList = [];
  for (var i = 0 ; i< props.children.length ; i++) {
    childViewList.push(useRef(null));
  }

  const {children, height, width} = props;
  if (children.length < 2) return;
  index = 0;
  thisHeight = height;
  thisWidth = parseFloat(width) * document.documentElement.clientWidth / 750;
  loopIdx = 0;
  total = children.length;

  useEffect(() => {
    if (props.autoPlay && total > 1) {
      autoPlay();
    }
  });

  const autoPlay = () => {
    const autoplayInterval = props.autoplayInterval || 3000;
    // 非自动播放的情况 return 掉
    if (isSwiping) return;
    autoPlayTimer && clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      if (isLoopEnd()) return;
      // 根据 index 和偏移改变位置
      slideTo(DIRECTION.LEFT);
    }, parseFloat(autoplayInterval));
  }

  // 改变 slider 的框子位置
  const slideTo = (direction) => {
    if (isSwiping) return;

    // index = direction === DIRECTION.LEFT ? index + 1 : (index - 1 < 0 ? total + index - 1 : index - 1);
    index = direction === DIRECTION.LEFT ? index + 1 : index - 1;
    if (index < 0) {
      index = props.children.length -1;
    } else if (index >= props.children.length) {
      index = 0;
    }
    offsetX = index * thisWidth;

    const realIndex = loopedIndex();

    // 外框translate3d for translate3d 为了性能
    const styleText = `translate3d(${-1 * offsetX}px, 0px, 0px)`;
    findDOMNode(swipeView.current).style.transform = styleText;
    findDOMNode(swipeView.current).style.webkitTransform = styleText;
    props.onChange && props.onChange({index: index});
    setPaginationIndex(index);
  }

  const onSwipeBegin = () => {
    isSwiping = true;
    clearInterval(autoPlayTimer);
  }

  const isLoopEnd = () => {
    const realIndex = loopedIndex();
    const num = total;
    if (!props.loop && (realIndex === num - 1 || realIndex === 0) ) {
      return true;
    }
    return false;
  }

  const onSwipe = ({ direction, distance, velocity }) => {
    if (isLoopEnd()) return;
    let changeX = distance - offsetX;
    const styleText = `translate3d(${changeX}px, 0px, 0px)`;
    swipeView.current.style.transform = styleText;
    swipeView.current.style.webkitTransform = styleText;
  }

  const onSwipeEnd = ({ direction, distance, velocity }) => {
    isSwiping = false;
    slideTo(index, direction);
    if (props.autoPlay) {
      autoPlay();
    }
  }

  // 使index维持在0-length之间循环
  const loopedIndex = (index, total) => {
    index = index || index;
    total = total || total;
    return Math.abs(index) % total;
  }

  const renderPagination = () => {
    if (total <= 1) return;

    Object.assign(styles.defaultPaginationStyle, props.paginationStyle);
    let {itemSelectedColor, itemColor, itemSize} = styles.defaultPaginationStyle;

    const activeStyle = {
      ...styles.activeDot,
      ...{
        backgroundColor: itemSelectedColor,
        width: itemSize,
        height: itemSize
      }
    };

    const normalStyle = {
      ...styles.normalDot,
      ...{
        backgroundColor: itemColor,
        width: itemSize,
        height: itemSize
      }
    };

    let dots = [];
    const ActiveDot = props.activeDot || <View style={activeStyle} />;
    const NormalDot = props.normalDot || <View style={normalStyle} />;
    const realIndex = paginationIndex;

    for (let i = 0; i < total; i++) {
      dots.push(i === realIndex ? cloneElement(ActiveDot, {key: i}) : cloneElement(NormalDot, {key: i}));
    }

    return (
      <View id="pagination" style={{
        ...styles.defaultPaginationStyle,
        ...props.paginationStyle
      }}>
        {dots}
      </View>
    );
  }

  let getPages = () => {
    const children = props.children;
    if (!children.length || children.length <= 1) {
      return <View style={styles.childrenStyle}>{children}</View>;
    }

    return children.map((child, index) => {
      let translateStyle = {
        width: thisWidth + 'px',
        height: thisHeight,
        left: index * thisWidth + 'px'
      };
      return (
        <View ref={childViewList[index]} className={'childWrap' + index}
          style={{...styles.childrenStyle, ...translateStyle}} key={index}>
          {child}
        </View>
      );
    });
  }

  let renderSwipeView = (pages) => {
    const {
      initialVelocityThreshold,
      verticalThreshold,
      vertical,
      horizontalThreshold,
      children,
      style
    } = props;
    const thisStyle = {
      width: thisWidth * children.length + 'px',
    };

    return children.length && children.length > 1 ?
      <SwipeEvent style={[styles.swipeWrapper, style]}
        onSwipeBegin={onSwipeBegin}
        onSwipeEnd={onSwipeEnd}
        onSwipe={onSwipe}
        initialVelocityThreshold={initialVelocityThreshold}
        verticalThreshold={verticalThreshold}
        vertical={vertical}
        horizontalThreshold={horizontalThreshold}>
        <div id="swipeView" ref={swipeView} style={{...styles.swipeStyle, ...style, ...thisStyle}}>
          {pages}
        </div>
      </SwipeEvent>
      :
      <View ref={swipeView} style={{...styles.swipeStyle, ...style, ...thisStyle}}>
        {pages}
      </View>
    ;
  }

  const {style, showsPagination} = props;
  return (
    <View style={[styles.slideWrapper, style]}>
      {renderSwipeView(getPages())}
      {showsPagination ? renderPagination() : ''}
    </View>
  );
};