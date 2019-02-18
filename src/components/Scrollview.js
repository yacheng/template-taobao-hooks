import {createElement, useState} from 'rax';
import View from '../components/View';
import Timer from './timer';

const DEFAULT_END_REACHED_THRESHOLD = 500;
const DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
const FULL_WIDTH = 750;
const STYLE_NODE_ID = 'rax-scrollview-style';

let ScrollView = (props) => {

  let lastScrollDistance = 0;
  let lastScrollContentSize = 0;
  let loadmoreretry = 1;

  const thisHandleScroll = (e) => {
    if (props.onScroll) {
      e.nativeEvent = {
        get contentOffset() {
          return {
            x: e.target.scrollLeft,
            y: e.target.scrollTop
          };
        },
        get contentSize() {
          return {
            width: e.target.scrollWidth,
            height: e.target.scrollHeight
          };
        }
      };
      props.onScroll(e);
    }

    if (props.onEndReached) {
      if (!this.scrollerNode) {
        this.scrollerNode = findDOMNode(this.refs.scroller);
        this.scrollerContentNode = findDOMNode(this.refs.contentContainer);

        this.scrollerNodeSize = props.horizontal ? this.scrollerNode.offsetWidth : this.scrollerNode.offsetHeight;
      }

      // NOTE：in iOS7/8 offsetHeight/Width is is inaccurate （ use scrollHeight/Width ）
      let scrollContentSize = props.horizontal ? this.scrollerNode.scrollWidth : this.scrollerNode.scrollHeight;
      let scrollDistance = props.horizontal ? this.scrollerNode.scrollLeft : this.scrollerNode.scrollTop;
      let isEndReached = scrollContentSize - scrollDistance - this.scrollerNodeSize < props.onEndReachedThreshold;

      let isScrollToEnd = scrollDistance > this.lastScrollDistance;
      let isLoadedMoreContent = scrollContentSize != this.lastScrollContentSize;

      if (isEndReached && isScrollToEnd && isLoadedMoreContent) {
        this.lastScrollContentSize = scrollContentSize;
        props.onEndReached(e);
      }

      this.lastScrollDistance = scrollDistance;
    }
  }

  let {
    id,
    style,
    scrollEventThrottle,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    onEndReached,
    onEndReachedThreshold,
    onScroll,
    children,
  } = props;

  // In weex must be int value
  onEndReachedThreshold = parseInt(onEndReachedThreshold, 10);

  const contentContainerStyle = [
    props.horizontal && styles.contentContainerHorizontal,
    props.contentContainerStyle,
  ];

  // bugfix: fix scrollview flex in ios 78
  if (!props.horizontal) {
    contentContainerStyle.push(styles.containerWebStyle);
  }

  if (props.style) {
    let childLayoutProps = ['alignItems', 'justifyContent']
      .filter((prop) => props.style[prop] !== undefined);

    if (childLayoutProps.length !== 0) {
      console.warn(
        'ScrollView child layout (' + JSON.stringify(childLayoutProps) +
        ') must be applied through the contentContainerStyle prop.'
      );
    }
  }

  let refreshContainer = <View />, contentChild;
  if (Array.isArray(children)) {
    contentChild = children.map((child, index) => {
      return child;
    });
  } else {
    contentChild = children;
  }

  const contentContainer =
    <View
      ref="contentContainer"
      style={contentContainerStyle}>
      {contentChild}
    </View>;

  const baseStyle = props.horizontal ? styles.baseHorizontal : styles.baseVertical;

  const scrollerStyle = {
    ...baseStyle,
    ...props.style
  };

  let showsScrollIndicator = props.horizontal ? showsHorizontalScrollIndicator : showsVerticalScrollIndicator;

  let handleScroll = thisHandleScroll;
  if (scrollEventThrottle) {
    handleScroll = throttle(handleScroll, scrollEventThrottle);
  }
  if (!showsScrollIndicator && typeof document !== 'undefined' && !document.getElementById(STYLE_NODE_ID)) {
    let styleNode = document.createElement('style');
    styleNode.id = STYLE_NODE_ID;
    document.head.appendChild(styleNode);
    styleNode.innerHTML = `.${props.className}::-webkit-scrollbar{display: none;}`;
  }

  scrollerStyle.webkitOverflowScrolling = 'touch';
  scrollerStyle.overflow = 'scroll';

  let webProps = {
    ...props,
    ...{
      ref: 'scroller',
      style: scrollerStyle,
      onScroll: handleScroll
    }
  };
  delete webProps.onEndReachedThreshold;

  return (
    <View {...webProps}>
      {contentContainer}
    </View>
  );
    
}

function throttle(func, wait) {
  var ctx, args, rtn, timeoutID;
  var last = 0;

  function call() {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }

  return function throttled() {
    ctx = this;
    args = arguments;
    var delta = new Date() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };
}

const styles = {
  baseVertical: {
    flex: 1,
    flexDirection: 'column',
  },
  baseHorizontal: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainerHorizontal: {
    flexDirection: 'row',
  },
  containerWebStyle: {
    display: 'block',
  }
};

export default ScrollView;