const style = {
  track: {
    marginLeft: "5px",
    backgroundColor: '#a93030',
    boxShadow: "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
  },
  active: {
    backgroundColor: '#c03737',
    boxShadow: "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
  },
  thumb: {
    borderRadius: "3px",
    border: "1px solid #000000",
    boxShadow: "1px 1px 1px #000000, 0px 0px 1px #0d0d0d",
    width: 12,
    height: 25,
    "&:hover": {
      background: "#efefef"
    }
  }
}

export default style