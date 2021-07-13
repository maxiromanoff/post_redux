import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../constants';

const Input = ({
  name,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  ...rest
}) => {
  return (
    <View>
      <TextInput
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...rest}
      />
      {errors && touched && errors[name] && touched[name] ? (
        <Text style={styles.error}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    marginTop: 5,
    fontSize: 11,
  },
});

export default Input;
