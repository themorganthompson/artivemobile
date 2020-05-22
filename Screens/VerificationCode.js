/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState, useEffect } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  Text,
  SafeAreaView,
  StyleSheet
} from "react-native";


const VerificationCode = props => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  let [_props = props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const styles = StyleSheet.create({
    root: {flex: 1, padding: 10, marginBottom: 20, marginTop: 10},
    title: {textAlign: 'center', fontSize: 30},
    codeFiledRoot: {marginTop: 0, width: "100%", marginLeft: -39},
    cell: {
      width: props.height < 812 ? 41.5 : 46.5,
      height: 48,
      lineHeight: 42,
      fontSize: 17,
      overflow: "hidden",
      borderWidth: 2,
      backgroundColor: "#ebebeb",
      borderColor: 'white',
      textAlign: 'center',
      margin: 7.5,
      borderRadius: 4
    },
    focusCell: {
      borderColor: '#FBC02D',
    },
  });

  useEffect(() => {
   _props = props;
  },[props]) 

  const updateCode = (code) => {
    setValue(code);
    props.onChangeText(code);
  }
  
  return (
    <SafeAreaView style={styles.root}>
     <CodeField
        ref={ref}
        {..._props}
        value={value}
        onChangeText={(value) => updateCode(value)}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}  
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default VerificationCode;