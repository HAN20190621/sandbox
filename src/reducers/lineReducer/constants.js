const LineType = {
  HORIZONTAL: {
    H0: [0, 1, 2],
    H1: [3, 4, 5],
    H2: [6, 7, 8]
  },
  VERTICAL: {
    V0: [0, 3, 6],
    V1: [1, 4, 7],
    V2: [2, 5, 8]
  },
  DIAGONAL: {
    D0: [0, 4, 8],
    D1: [2, 4, 6]
  }
};

//
function getLineType(items) {
  let same;
  let lineType;
  const temp = items;
  //console.log(items);
  temp.sort();
  for (const key1 in LineType) {
    for (const [j, val2] of Object.entries(LineType[key1])) {
      same =
        val2.length === temp.length &&
        val2.every(function (item, idx) {
          return item === temp[idx];
        });
      if (same) {
        lineType = j;
        break;
      }
    }
  }
  return lineType;
}

export function getLineStyle(items, rect) {
  const newStyle = {
    position: "absolute",
    backgroundColor: "green",
    height: 5
  };
  let lineType = getLineType(items);
  let pos;
  //console.log(lineType);
  switch (lineType) {
    case "H0":
      console.log("xxx");
      console.log(rect.item0);
      pos = rect.map((item, idx) => {
        return idx === 0;
      });
      //pos = rect.item0; //Object.assign({}, rect.item0);
      //console.log(pos);
      //console.log(pos.left);
      return pos;
    // return {
    //   ...newStyle,
    //   left: pos.left,
    //   top: pos.top + pos.height * 0.16,
    //   width: 100 //rect.width
    // };
    case "H1":
      pos = rect["item3"];
      return {
        ...newStyle,
        left: pos.left,
        top: pos.top + pos.height * 0.5,
        width: 100 //rect.width
      };
    case "H2":
      pos = rect["item6"];
      return {
        ...newStyle,
        left: pos.left,
        top: pos.top + pos.height * 0.85,
        width: 100 //rect.width
      };
    case "V0":
      pos = rect["item0"];
      return {
        ...newStyle,
        left: pos.left + pos.width * 0.17,
        top: pos.top,
        width: "10px",
        height: pos.height
      };
    case "V1":
      pos = rect["item1"];
      return {
        ...newStyle,
        left: pos.left + pos.width * 0.5,
        top: pos.top,
        width: "10px",
        height: pos.height
      };
    case "V2":
      pos = rect["item2"];
      return {
        ...newStyle,
        left: pos.left + pos.width * 0.825,
        top: pos.top,
        width: "10px",
        height: pos.height
      };
    case "D0":
      pos = rect["item0"];
      return {
        ...newStyle,
        left: pos.left,
        top: pos.top, // rect.top + rect.height / 2,
        height: pos.height,
        width: Math.sqrt(pos.width * pos.width + pos.height * pos.height),
        transform: "rotate(48deg)",
        transformOrigin: "top left"
      };
    case "D1":
      pos = rect["item6"];
      return {
        ...newStyle,
        // left: rect.left + rect.width,
        top: pos.top + pos.height, // rect.top + rect.height / 2,
        width: pos.width,
        height: pos.height,
        //Math.sqrt(          rect.width * rect.width + rect.height * rect.height        ),
        transform: "rotate(-48deg)",
        transformOrigin: "top left"
      };
    // do nothing
    default:
      break;
  }
}

//https://react-cn.github.io/react/tips/style-props-value-px.html
//When specifying a pixel value for your inline style prop,
//React automatically appends the string "px" for you after your number value, so this works:
//var divStyle = {height: 10}; // rendered as "height:10px"
//ReactDOM.render(<div style={divStyle}>Hello World!</div>, mountNode);
