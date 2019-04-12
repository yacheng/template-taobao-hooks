import {createElement, useState} from 'rax';
import View from 'rax-view';

export default (props) => {
  let style = {
    position: 'absolute',
    top: '0rem',
    right: 0,
    bottom: 0,
    left: 0,
    ...props.style,
  };

  return (
    <View id="page" {...props} style={style}>
      {props.children}
    </View>
  );
}
