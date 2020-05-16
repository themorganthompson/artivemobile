import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const isLoggedIn = (props) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

 function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      // props.navigation.navigate('Home');
      setInitializing(false);
      return user;
    }
  }

  auth().onAuthStateChanged((user) => {
    return onAuthStateChanged(user);
  });
};

export default isLoggedIn;
