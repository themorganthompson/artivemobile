import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function phone(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="24px"
      height="24px"
      {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Svg>
  );
}

export default phone;
