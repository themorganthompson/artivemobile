import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const isLoggedIn = (props) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  console.log('islogged');

 function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (user) {
      // props.navigation.navigate('Home');
      console.log(user);
      setInitializing(false);
      return user;
    }
  }

  auth().onAuthStateChanged((user) => {
    return onAuthStateChanged(user);
  });
};

export default isLoggedIn;
