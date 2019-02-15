import {createElement, useState} from 'rax';

export default (props) => {
  let nativeProps = {
    ...props,
    ...{
      style: props.style || {},
    },
  };

  let textString = '';
  if (props.children != null) {
    if (!Array.isArray(props.children)) {
      textString = props.children.toString();
    } else {
      textString = props.children.join('');
    }
  }

  let styleProps = {
    whiteSpace: 'pre-wrap',
    ...styles.initial,
    ...nativeProps.style
  };
  let numberOfLines = props.numberOfLines;
  if (numberOfLines) {
    if (parseInt(numberOfLines) === 1) {
      styleProps.whiteSpace = 'nowrap';
    } else {
      styleProps.display = '-webkit-box';
      styleProps.webkitBoxOrient = 'vertical';
      styleProps.webkitLineClamp = String(numberOfLines);
    }

    styleProps.overflow = 'hidden';
  }

  return <span className="text" {...nativeProps} style={styleProps}>{textString}</span>;
}

const styles = {
  initial: {
    border: '0 solid black',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'block',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexShrink: 0,
    fontSize: 32
  }
};

