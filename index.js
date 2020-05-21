/**
 * @format
 */
import {AppRegistry} from 'react-native';
import Root from './Components/Root';
import {name as appName} from './app.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
Icon.loadFont();
console.disableYellowBox = true; 
AppRegistry.registerComponent(appName, () => Root);
