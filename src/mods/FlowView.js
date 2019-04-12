import {createElement, useState} from 'rax';
import View from 'rax-view';

export default (props) => {
  let style = props.style || {};
  if (style.height !== undefined) {
    delete style.height;
  }
  return <View {...props} style={style} />;
}

