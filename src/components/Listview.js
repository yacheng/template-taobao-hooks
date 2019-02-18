import {createElement, useState, useRef} from 'rax';
import View from '../components/View';
import RecyclerView from '../components/Scrollview';

const SCROLLVIEW_REF = 'scrollview';

export default (props) => {

  let {
    renderScrollComponent,
    renderHeader,
    renderFooter,
    renderRow,
    dataSource,
  } = props;

  let header = typeof renderHeader == 'function' ? renderHeader() : null;
  let footer = typeof renderFooter == 'function' ? renderFooter() : null;
  let body = dataSource.map((i, index) => {
    return renderRow(i, index);
  });

  let thisProps = {
    ...props,
    ...{
      children: [].concat(header, body, footer),
      _autoWrapCell: true,
    },
  };

  let thisRenderScrollComponent = props => <RecyclerView {...props} />;
  if (renderScrollComponent) thisRenderScrollComponent = renderScrollComponent;


  return thisRenderScrollComponent(thisProps);
}

