import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { auth, db } from "../../App";
import Button from "../Components/Button";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Home({ user, navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(notes);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const noteListener = onSnapshot(q, (querySnap) => {
      let list = [];
      querySnap.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
        console.log(doc);
      });
      setNotes(list);
    });
    return noteListener;
  }, []);

  const signout = () => {
    setLoading(true);
    signOut(auth);
  };

  const renderEle = ({ item }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Pressable
          style={{
            backgroundColor: item.noteColor,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate("Update", { item })}
        >
          <Text style={{ fontSize: 18, marginBottom: 8 }}>{item.title}</Text>
          <Text style={{ fontSize: 14 }}>{item.description}</Text>
          <Pressable
            style={{ position: "absolute", alignSelf: "flex-end", top: 10 }}
            onPress={() => {
              deleteDoc(doc(db, "notes", item.id));
            }}
          >
            <AntDesign name="delete" size={20} color="white" />
          </Pressable>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ marginTop: 40, marginHorizontal: 25, flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>My Notes</Text>
        <Pressable onPress={() => navigation.navigate("Create")}>
          <AntDesign name="pluscircleo" size={20} color="black" />
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatList
          keyExtractor={(item) => item.title}
          data={notes}
          renderItem={renderEle}
        ></FlatList>
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center",marginTop:60 }}
      >
        {loading ? (
          <ActivityIndicator color="blue" size="small" />
        ) : (
          <Button style={styles.signIn} submit={signout}>
            Sign Out
          </Button>
        )}
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
