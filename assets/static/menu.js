import * as React from "react";
import Svg, { Path } from "react-native-svg";

function menu(props) {
  return (
    <Svg
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24px"
      height="24px"
      {...props}
    >
      <Path
        fill="white"
        stroke="white"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M50 25L0 25M50 10L0 10M0 40L50 40"
      />
    </Svg>
  );
}

export default menu;
