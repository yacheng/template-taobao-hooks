import {createElement, useState, useRef} from 'rax';

let Slide = require('./SliderForWeb');

export default (props) => {

  const [index, setIndex] = useState(props.index || 0);


  const onChange = (e) => {
    props.onChange(e);
  }

  return <Slide {...props} />;

}

const defaultPaginationStyle = {
  position: 'absolute',
  width: '750rem',
  height: '40rem',
  bottom: '20rem',
  left: 0,
  itemColor: 'rgba(255, 255, 255, 0.5)',
  itemSelectedColor: 'rgb(255, 80, 0)',
  itemSize: '8rem'
};