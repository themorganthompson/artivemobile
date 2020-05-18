import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function home(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill={props.fill} width="28px" height="28px">
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      <Path d="M0 0h24v24H0z" fill="none"/>
    </Svg>
  );
}
export default home;
