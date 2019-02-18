import {createElement, useState, useRef} from 'rax';
import View from '../components/View';
import PanResponder from 'universal-panresponder';
import isValidSwipe from './isValidSwipe';

const directions = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
};


export default (props) => {


  const [swipe, setSwipe] = useState(
    swipe: {
      direction: null,
      distance: 0,
      velocity: 0
    }
  );

  // 监听swipe是否发生
  let swipeDetected = false;
  // 当前手势速度
  let velocityProp = null;
  // 当前手势距离
  let distanceProp = null;
  // 当前手势的方向
  let swipeDirection = null;

  // 释放当前手势
  let handleTerminationAndRelease = () => {

    if (swipeDetected) {
      const { onSwipeEnd } = props;
      onSwipeEnd && onSwipeEnd({
        direction: swipeDirection,
        distance: swipe.distance,
        velocity: swipe.velocity
      });
    }

    swipeDetected = false;
    velocityProp = null;
    distanceProp = null;
    swipeDirection = null;
  }

  let  thisPanResponder = PanResponder.create({

    onStartShouldSetPanResponder: (evt) => {
      return true;
    },
    onMoveShouldSetPanResponder: (evt) => {
      return true;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {dx, dy, vx, vy} = gestureState;
      const { onSwipeBegin, onSwipe, onSwipeEnd} = props;

      // 没有swipe的时候return掉
      if (!props.continuous && swipeDetected) {
        return;
      }

      let initialDetection = false;
      let validHorizontal = false;
      let validVertical = false;

      if (!swipeDetected) {
        initialDetection = true;
        // 判断手势是否能够算得上是水平swipe
        validHorizontal = props.horizontal ? isValidSwipe(
          vx, dy, props.initialVelocityThreshold, props.verticalThreshold
        ) : '';

        // 判断手势是否能够算得上是垂直swipe
        validVertical = props.vertical ? isValidSwipe(
          vy, dx, props.initialVelocityThreshold, props.horizontalThreshold
        ) : '';

        if (validHorizontal) {
          evt.preventDefault && evt.preventDefault();
          velocityProp = 'vx';
          distanceProp = 'dx';

          // 左滑
          if ((props.horizontal || props.left) && dx < 0) {
            swipeDirection = directions.SWIPE_LEFT;
          // 右滑
          } else if ((props.horizontal || props.right) && dx > 0) {
            swipeDirection = directions.SWIPE_RIGHT;
          }
        } else if (validVertical) {
          velocityProp = 'vy';
          distanceProp = 'dy';

          // 上滑
          if ((props.vertical || props.up) && dy < 0) {
            swipeDirection = directions.SWIPE_UP;
          // 下滑
          } else if ((props.vertical || props.down) && dy > 0) {
            swipeDirection = directions.SWIPE_DOWN;
          }
        }

        if (swipeDirection) {
          swipeDetected = true;
        }
      }

      if (swipeDetected) {
        // gestureState.dx || gestureState.dy 横向和竖向距离
        const distance = gestureState[distanceProp];
        // gestureState.vx || gestureState.vx 横向和竖向的速度
        const velocity = gestureState[velocityProp];

        const swipeState = {
          direction: swipeDirection,
          distance,
          velocity
        };

        if (initialDetection) {
          onSwipeBegin && onSwipeBegin(swipeState);
        } else {
          onSwipe && onSwipe(swipeState);
        }

        if (props.setGestureState) {
          setState({
            swipe: swipeState
          });
        }
      }
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderTerminate: handleTerminationAndRelease(),
    onPanResponderRelease: handleTerminationAndRelease()
  });

  const { onSwipeBegin, onSwipe, onSwipeEnd} = props;

  const style = {
    alignSelf: 'flex-start'
  };

  const state = props.setGestureState ? state : null;

  return (
    <View {...thisPanResponder.panHandlers} style={{style, ...props.handlerStyle}}>
      <View {...props} {...state}>{props.children}</View>
    </View>
  );
}
