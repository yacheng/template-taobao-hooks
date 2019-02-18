import {createElement, useState, useRef} from 'rax';

export default (props) => {
  let styleProps = {
    ...styles.initial,
    ...props.style
  };

  function useRefHandle(initial){
    let ref = useRef(initial)
    let clickHandle = ()=>ref.current.click();
    return [ref,clickHandle]
  }
  let [divEl, clickHandle] = useRefHandle(null);

  return <div ref={divEl} onClick={clickHandle} {...props} style={styleProps} />;
}

const styles = {
  initial: {
    border: '0 solid black',
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexShrink: 0
  }
};
