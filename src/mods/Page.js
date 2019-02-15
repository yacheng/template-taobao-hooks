import {createElement, useState} from 'rax';
import View from '../components/View';

export default (props) => {
  let style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...props.style,
  };

  return (
    <View {...props} style={style}>
      {props.children}
    </View>
  );
}
