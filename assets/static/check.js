import * as React from 'react';
import Svg, {Path, Rect, G} from 'react-native-svg';

function check(props) {
  return (
   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={props.fill} width="36px" height="36px" {...props}>
   <Path d="M0 0h24v24H0z" fill="none"/>
   <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
   </Svg>
  );
}
export default check;
