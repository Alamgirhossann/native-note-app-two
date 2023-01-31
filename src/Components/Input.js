import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ placeholder, secureTextEntry, style, title, onChangeText, multiline, value }) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry)
  return (
    <View >
      <TextInput
        style={style}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        multiline={multiline}
        value={value}
      />
      <Text style={{marginTop:10}} onPress={()=>setIsSecure(!isSecure)}>{title}</Text>
    </View>
  );
};

export default Input;
