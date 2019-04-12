
let AppCss = {

  /* global */
  bottom: {
    height: 12,
    backgroundColor: 'rgb(238, 238, 238)',
  },

  /* header search */
  header: {
    height: 74,
    backgroundColor: '#FE5400',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    '-webkit-box-orient': 'horizontal',
    '-webkit-box-align': 'center',
    '-webkit-box-orient': 'vertical',
  },
  headerIcon: {
    height: 40,
    lineHeight: 40,
    width: 54,
    marginTop: 15,
    marginRight: 11,
    '-webkit-box-orient': 'vertical',
  },
  headerPlaceholder: {
    width: 601,
    height: 50,
    lineHeight: 30,
    backgroundColor: '#B52600',
    borderRadius: 8,
    marginTop: 12,
    marginRight: 5,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    '-webkit-box-orient': 'horizontal',
    '-webkit-box-align': 'center',
    '-webkit-box-orient': 'vertical',
  },
  headerPlaceholderIcon: {
    color: '#F0E0DC',
    marginTop: 10,
    marginRight: 8,
    height: 40,
    lineHeight: 40,
    fontSize: 26,
    '-webkit-box-orient': 'vertical',
  },
  headerPlaceholderText: {
    color: '#F0E0DC',
    height: 40,
    lineHeight: 40,
    fontSize: 26,
    marginTop: 10,
    '-webkit-box-orient': 'vertical',
  },

  /* top slider */
  slider: {
    width: 750,
    position: 'relative',
    overflow: 'hidden',
    height: 235,
    backgroundColor: '#cccccc'
  },
  sliderItemWrap: {
    width: 750,
    height: 235
  },
  sliderImage: {
    width: 750,
    height: 235
  },
  sliderPaginationStyle: {
    position: 'absolute',
    width: 240,
    height: 20,
    bottom: 20,
    right: 0,
    itemColor: 'rgba(255, 255, 255, 0.5)',
    itemSelectedColor: 'rgb(255, 80, 0)',
    itemSize: 13
  },

  /* app list */
  appList: {
    height: 344,
    width: 700,
    marginLeft: 25,
  },
  appItem: {
    height: 160,
    textAlign: 'center',
  },
  appIcon: {
    height: 84,
    width: 121,
    marginTop: 24,
    marginLeft: 10,
    marginBottom: 9,
  },
  appName: {
    textAlign: 'center',
    fontSize: 24,
    color: 'rgb(102, 102, 102)',
  },

  /* toutiao */
  toutiao: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopColor: 'rgb(232, 232, 232)',
    borderTopWidth: '1px',
    height: 70,
    marginBottom: 12,
  },
  toutiaoLogoBox: {
    width: 163,
    height: 56,
    marginTop: 13,
    borderRightColor: 'rgb(232, 232, 232)',
    borderRightWidth: '1px',
  },
  toutiaoLogo: {
    width: 130,
    height: 37.7,
    marginTop: 13,
    marginLeft: 15,
  },
  toutiaoTip: {
    width: 63,
    height: 35,
    lineHeight: 30,
    fontSize: 26,
    color: 'rgb(216, 20, 33)',
    borderWidth: '1px',
    borderColor: 'rgb(216, 20, 33)',
    borderRadius: 10,
    marginLeft: 21,
    marginRight: 12,
    marginTop: 21,
    paddingLeft: 3,
    paddingRight: 3,
  },
  toutiaoText: {
    fontSize: 27,
    marginTop: 27,
    width: 485,
    lineHeight: 25,
  },

  /* vertical */
  vertical: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  taoqianggou: {
    width: 277.5,
    borderRightWidth: 1,
    borderRightColor: 'rgb(240, 240, 240)',
  },
  taoqianggouImage: {
    width: 277.5,
    height: 378.5,
  },
  verticalGroup: {
    width: 464,
  },
  verticalGroupImageLine1: {
    width: 228,
    height: 173,
  },
  verticalGroupImageLine2: {
    width: 228,
    height: 200,
  },
  verticalGroupBox3: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgb(240, 240, 240)',
  },
  verticalGroupBox4: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgb(240, 240, 240)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(240, 240, 240)',
  },

  /* banner */
  banner: {
    width: 750,
    height: 150,
  },

  /* like list */
  likeListHeader: {
    height: 110,
    backgroundColor: 'rgb(238, 238, 238)',
  },
  likeListHeaderTitle: {
    textAlign: 'center',
    color: 'rgb(51, 51, 51)',
    fontSize: 28,
    marginTop: 25,
    marginBottom: 5,
    height: 30,
    lineHeight: 30,
  },
  likeListHeaderText: {
    textAlign: 'center',
    color: 'rgb(120, 120, 120)',
    fontSize: 24,
  },
  likeListItem: {
    height: 500,
    marginBottom: 8,
  },
  likeListImage: {
    width: 371,
    height: 335.5,
  },
  likeListTitle: {
    marginTop: 14,
    marginBottom: 14,
    marginLeft: 23.5,
    marginRight: 23.5,
    fontSize: 24,
    color: 'rgb(102, 102, 102)',
    textOverflow: 'ellipsis',
  },
  likeListPrice: {
    color: 'rgb(255, 80, 0)',
    fontSize: 32,
    marginLeft: 22,

  },

  /* bar */
  bottomBar: {
    height: 86,
  },
  bottomBarIcon: {
    textAlign: 'center',
    fontSize: 44,
    color: '#5D656B',
    marginTop: 5,
  },
  bottomBarText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#5D656B',
    lineHeight: 22,
  }

};

export default AppCss;