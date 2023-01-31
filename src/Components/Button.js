import React, { Children } from "react";
import { View, Text, Pressable} from "react-native";

export default function Button({style, children, submit}) {
  return (
    <View>
      <Pressable style={style} onPress={submit}>
        <Text>{children}</Text>
      </Pressable>
    </View>
  );
}
