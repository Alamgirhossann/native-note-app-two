import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { auth } from "../../App";
import Button from "../Components/Button";
import Input from "../Components/Input";
import TextCompo from "../Components/TextCompo";

export default function SignIn({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const signIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35,
          }}
        >
          <Image
            style={{
              height: 150,
              width: 150,
              resizeMode: "contain",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35,
              marginBottom: 15,
            }}
            source={require("../../assets/adaptive-icon.png")}
          />
        </View>
        <View>
          <TextCompo
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 15,
            }}
          >
            {" "}
            Never forget your notes
          </TextCompo>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Input onChangeText={(email)=>setEmail(email)} placeholder="Enter Email" style={styles.input}></Input>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Input
            onChangeText={(pass)=>setPassword(pass)}
            placeholder="Enter Password"
            secureTextEntry
            style={styles.input}
            title="show password"
          ></Input>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="blue" size="small" />
        ) : (
          <Button style={styles.signIn} submit={signIn}>
            Sign In
          </Button>
        )}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <TextCompo>Don't have an account?</TextCompo>
          <TextCompo
            style={{
              marginLeft: 5,
              color: "blue",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </TextCompo>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signIn: {
    width: 100,
    backgroundColor: "#F1D103",
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#D1CDCC",
    // paddingLeft: 10,
    paddingVertical: 5,
    marginVertical: 5,

    // marginHorizontal:15,
  },
});
