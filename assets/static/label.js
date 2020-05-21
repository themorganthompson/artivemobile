import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

function label(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={props.fill} width="18px" height="18px" {...props}>
     <Path d="M0 0h24v24H0z" fill="none"/>
    <Path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
    </Svg>
  );
}
export default label;
