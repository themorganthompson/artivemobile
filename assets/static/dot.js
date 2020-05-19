import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function dot(props) {
  return (
    <>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="10px"
      height="10px"
      {...props}
    >
      <Path d="M24 24H0V0h24v24z" fill="none" />
      <Circle cx="12" cy="12" r="8" />
    </Svg>
      {/* <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="10px"
      height="10px"
    >
      <Path d="M24 24H0V0h24v24z" fill="none" />
      <Circle cx="12" cy="12" r="8" />
    </Svg> */}
    </>
  );
}
export default dot;
