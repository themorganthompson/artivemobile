import * as React from "react";
import Svg, { Path } from "react-native-svg";

function account(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="28px"
      height="28px"
      {...props}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </Svg>
  );
}
export default account;
