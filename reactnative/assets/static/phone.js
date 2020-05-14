import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function phone(props) {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        fill="grey"
        d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
      />
    </Svg>
  );
}

export default phone;
