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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { showMessage, hideMessage } from "react-native-flash-message";
import { AntDesign } from "@expo/vector-icons";

export default function Update({ navigation, route, item }) {
  const noteColorOption = ["blue", "green", "red"];
  const noteItem = route.params.item;
  const [updateTitle, setUpdateTitle] = useState(noteItem.title);
  const [updateDescription, setUpdateDescription] = useState(
    noteItem.description
  );
  const [updateNoteColor, setUpdateNoteColor] = useState(noteItem.noteColor);
  const [loading, setLoading] = useState(false);

  console.log(noteItem);

  const updateNote = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: updateTitle,
        description: updateDescription,
        noteColor: updateNoteColor,
      });
      setLoading(false);
      navigation.navigate("Home");
      showMessage({
        message: "note updated",
        type: "success",
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
          Update
        </TextCompo>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{ marginHorizontal: 15 }}>
          <Input
            placeholder="Title"
            style={styles.input}
            onChangeText={(item) => setUpdateTitle(item)}
            value={updateTitle}
          ></Input>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Input
            style={styles.input}
            placeholder="Description"
            multiline={true}
            onChangeText={(item) => setUpdateDescription(item)}
            value={updateDescription}
          ></Input>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 15, marginBottom: 10 }}>
          Select Your Note Color
        </Text>
      </View>
      {noteColorOption.map((option) => {
        const selected = option === updateNoteColor;
        return (
          <Pressable
            onPress={() => setUpdateNoteColor(option)}
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
          <Button style={styles.signIn} submit={updateNote}>
            Update
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
