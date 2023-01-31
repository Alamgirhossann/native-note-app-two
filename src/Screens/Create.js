import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Input from "../Components/Input";
import TextCompo from "../Components/TextCompo";
import Button from "../Components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage, hideMessage } from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";

export default function Create({ navigation, user }) {
  const noteColorOption = ["blue", "green", "red"];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  console.log(user.uid);

  const createNote = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        noteColor: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      navigation.navigate("Home");
      showMessage({ 
        message: "note create successfully", 
        type: "success" 
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
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
          Create Note
        </TextCompo>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{ marginHorizontal: 15 }}>
          <Input
            placeholder="Title"
            style={styles.input}
            onChangeText={(item) => setTitle(item)}
          ></Input>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Input
            style={styles.input}
            placeholder="Description"
            multiline={true}
            onChangeText={(item) => setDescription(item)}
          ></Input>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 15, marginBottom: 10 }}>
          Select Your Note Color
        </Text>
      </View>
      {noteColorOption.map((option) => {
        const selected = option === noteColor;
        return (
          <Pressable
            onPress={() => setNoteColor(option)}
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginTop: 30, marginHorizontal: 15 }}>
          <Button style={styles.signIn} submit={createNote}>
            Create
          </Button>
        </View>
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signIn: {
    width: "100%",
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
