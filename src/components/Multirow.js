import {createElement, useState} from 'rax';
import View from '../components/View';

const Col = (props) => {
  let {
    style,
  } = props;
  return (
    <View
      {...props}
      style={{
        flex: 1,
        ...style,
        width: '1%',
      }}
    />
  );
}

const Row = (props) => {
  const moreStyle = {};
  const gridType = props.gridType;

  if (gridType == 'flex-start') {
    styles.initial.display = 'block';
  } else {
    moreStyle.justifyContent = gridType;
  }

  let style = {
    ...styles.initial,
    ...props.style,
    ...moreStyle
  };

  return (
    <View {...props} style={style} />
  );
}

const styles = {
  initial: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  }
};



export default (props) => {

  const getContent = () => {
    let list = props.dataSource,
      count = props.cells,
      renderCell = props.renderCell;

    let grids = [];

    let gridDataArr = [];
    for (let i = 0; i < list.length; i++) {
      let index = Math.floor(i / count);
      if (i % count == 0) {
        gridDataArr[index] = [];
      }
      gridDataArr[index].push(<Col style={props.colStyle}>{renderCell(list[i], i)}</Col>);
      if (i % count == 0 && i != 0) {
        grids.push(<Row style={props.rowStyle}>{gridDataArr[index - 1]}</Row>);
      }
      if (i == list.length - 1) {
        grids.push(<Row style={props.rowStyle}>{gridDataArr[index]}</Row>);
      }
    };

    return <View>{grids}</View>;
  }

  return <View>{getContent()}</View>;
}

