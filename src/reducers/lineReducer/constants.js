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
  for (const [i, val1] of Object.entries(LineType)) {
    for (const [j, val2] of Object.entries(val1)) {
      same =
        val2.length == temp.length &&
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
  const newStyle = { position: 'absolute', backgroundColor: 'green', height: 5 };
  let lineType = getLineType(items);
  //console.log(lineType);
  switch (lineType) {
    case 'H0':
      return {
        ...newStyle,
        left: rect.left,
        top: rect.top + rect.height * 0.16,
        width: rect.width
      }
    case 'H1':
      return {
        ...newStyle,
        left: rect.left,
        top: rect.top + rect.height * 0.5,
        width: rect.width
      };
    case 'H2':
      return {
        ...newStyle,
        left: rect.left,
        top: rect.top + rect.height * 0.85,
        width: rect.width
      };
    case 'V0':
      return {
        ...newStyle,
        left: rect.left + rect.width * 0.17,
        top: rect.top,
        width: "10px",
        height: rect.height
      };
    case 'V1':
      return {
        ...newStyle,
        left: rect.left + rect.width * 0.5,
        top: rect.top,
        width: "10px",
        height: rect.height
      };
    case 'V2':
      return {
        ...newStyle,
        left: rect.left + rect.width * 0.825,
        top: rect.top,
        width: "10px",
        height: rect.height
      };
    case 'D0':
      return {
        ...newStyle,
        left: rect.left,
        top: rect.top, // rect.top + rect.height / 2,
        height: rect.height,
        width: Math.sqrt(
          rect.width * rect.width + rect.height * rect.height
        ),
        transform: "rotate(48deg)",
        transformOrigin: "top left"
      };
    case 'D1':
      return {
        ...newStyle,
        // left: rect.left + rect.width,
        top: rect.top + rect.height, // rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
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
