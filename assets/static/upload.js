import * as React from 'react';
import Svg, {Path, Rect, G} from 'react-native-svg';

function trophy(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 40 40"
      viewBox="0 0 40 40"
      fill={props.fill}
      width="80px"
      height="80px"
      {...props}>
      <Path d="M0 0h24v24H0z" fill="none"/>
      <Path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </Svg>
  );
}
export default trophy;
