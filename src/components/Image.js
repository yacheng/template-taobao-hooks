import {createElement, useState, useRef} from 'rax';

export default (props) => {
  
  const ref = useRef({});
  let isError = false;
  const [source] = useState(props.source);

  const onLoad = e => {
    const { onLoad } = props;
    if (typeof e.success !== 'undefined') {
      if (e.success) onLoad && onLoad(e); else onError && onError(e);
    } else if (typeof e.currentTarget !== 'undefined') {
      if (e.currentTarget.naturalWidth > 1 && e.currentTarget.naturalHeight > 1) {
        onLoad && onLoad(e);
      } else {
        onError && onError(e);
      }
    }
  };

  const onError = e => {
    const { fallbackSource, onError } = props;
    if (fallbackSource.uri && getSource().uri !== fallbackSource.uri) {
      isError = true;
      setSource(fallbackSource)
    }
    onError(e);
  };

  const save = (callback) => {
    ref.current.save(result => {
      callback(result);
    });
  }

  let nativeProps = {
    ...props,
  };
  let thisSource = isError ? getSource() : nativeProps.source;

  // Source must a object
  if (thisSource && thisSource.uri) {
    let style = nativeProps.style;
    let {width, height, uri} = thisSource;

    // Default is 0
    if (
      width == null &&
      height == null &&
      style.height == null &&
      style.width == null
    ) {
      width = 0;
      height = 0;
    }

    nativeProps.style = {
      ...{
        ...{display: 'flex'},
        width: width,
        height: height,
      },
      ...style
    };
    nativeProps.src = uri;
    nativeProps.onLoad = onLoad;
    nativeProps.onError = onError;

    delete nativeProps.source;

    // for cover and contain
    let resizeMode = nativeProps.resizeMode || nativeProps.style.resizeMode;
    if (resizeMode) {
      nativeProps.style.objectFit = resizeMode;
    }

    return <img ref={ref} {...nativeProps} />;
  }
  return null;
}
