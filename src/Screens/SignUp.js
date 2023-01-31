import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { auth, db } from "../../App";
import Button from "../Components/Button";
import Input from "../Components/Input";
import TextCompo from "../Components/TextCompo";
import { AntDesign } from "@expo/vector-icons";

export default function SignUp({ navigation }) {
  const genderOption = ["male", "female"];
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  

  const submit = async () => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(db, "user"), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 35,
          }}
        >
          <TextCompo
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 15,
            }}
            onPress={() => navigation.goBack()}
          >
          <AntDesign name="arrowleft" size={20} color="black" />
          </TextCompo>
          <TextCompo
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 15,
            }}
          >
            Sign Up
          </TextCompo>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ marginHorizontal: 15 }}>
            <Input
              placeholder="Enter Email"
              style={styles.input}
              onChangeText={(item) => setEmail(item)}
            ></Input>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <Input
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry
              onChangeText={(item) => setPassword(item)}
            ></Input>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <Input
              style={styles.input}
              placeholder="Full name"
              onChangeText={(item) => setName(item)}
            ></Input>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <Input
              style={styles.input}
              placeholder="Age"
              onChangeText={(item) => setAge(item)}
            ></Input>
          </View>
        </View>
      </View>
      <TextCompo style={{ marginVertical: 15, marginLeft: 15 }}>
        Select Gender
      </TextCompo>
      {genderOption.map((option) => {
        const selected = option === gender;
        return (
          <Pressable
            onPress={() => setGender(option)}
            key={option}
            style={styles.radioContainer}
          >
            <View
              style={[
                styles.outerContainer,
                selected && styles.selectedOuterContainer,
              ]}
            >
              <View
                style={[
                  styles.innerContainer,
                  selected && styles.selectedInnerContainer,
                ]}
              />
            </View>
            <TextCompo style={{ marginLeft: 15 }}>{option}</TextCompo>
          </Pressable>
        );
      })}

      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        {loading ? (
          <ActivityIndicator color="blue" size="small" />
        ) : (
          <Button style={styles.signIn} submit={submit}>
            Sign Up
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
          <TextCompo>Already have an account?</TextCompo>
          <TextCompo
            style={{
              marginLeft: 5,
              color: "blue",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Sign In
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
    paddingVertical: 5,
    marginVertical: 5,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  outerContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderColor: "cfcfcf",
    borderRadius: 5,
  },
  selectedOuterContainer: {
    borderColor: "blue",
  },
  selectedInnerContainer: {
    backgroundColor: "blue",
  },
});
