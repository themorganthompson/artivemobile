import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function security(props) {
  return (
    <Svg viewBox="0 0 24 24" width={18} height={18} {...props}>
      <Path
        fill="grey"
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
      />
      <Path d="M0 0h24v24H0z" />
    </Svg>
  );
}

export default security;
