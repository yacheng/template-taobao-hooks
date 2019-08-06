import {createElement, useState} from 'rax';
import View from 'rax-view';

export default (props) => {
  let style = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 750,
    ...props.style,
  };

  return (
    <View id="page" {...props} style={style}>
      {props.children}
    </View>
  );
}
