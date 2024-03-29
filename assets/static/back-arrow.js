import * as React from "react";
import Svg, { Path } from "react-native-svg";

function arrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="22px"
      height="22px"
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    </Svg>
  );
}
export default arrow;