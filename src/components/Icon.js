import {createElement, useState} from 'rax';
import View from '../components/View';
import Text from '../components/Text';
import Image from '../components/Image';

let Icon = (props) => {

  if (!props.source.uri || props.source.codePoint) {
    const uri = props.source.uri;
    const fontFamily = props.fontFamily;
    const FontFace = window.FontFace;
    const iconfont = new FontFace(fontFamily, 'url(' + uri + ')');
    document.fonts.add(iconfont);
  }

  const style = props.style || {};
  if (props.source.uri && !props.source.codePoint) {
    return <Image
      source={{uri: props.source.uri}}
      style={style}
    />;
  }
  const fontFamily = props.fontFamily;
  const iconStyle = {
    ...style,
    fontFamily: fontFamily
  };

  return <Text style={iconStyle}>{props.source.codePoint}</Text>;
}

export default Icon;

export function createIconSet(glyphMap, fontFamily, uri) {
  return (props) => {
    let codePoint = '';
    if (props.codePoint) {
      codePoint = props.codePoint;
    } else if (props.name) {
      codePoint = glyphMap[props.name];
    }
    return (
      <Icon
        style={props.style}
        fontFamily={fontFamily}
        source={{
          uri: uri,
          codePoint: codePoint
        }} />
    );
  }
}
