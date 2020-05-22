import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

function info(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28" fill={props.fill} {...props}>
      <Path d="M0 0h24v24H0z" />
      <Path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </Svg>
  );
}
export default info;
