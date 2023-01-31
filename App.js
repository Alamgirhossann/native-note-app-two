import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Home from "./src/Screens/Home";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Create from "./src/Screens/Create";
import Update from "./src/Screens/Update";
import FlashMessage from "react-native-flash-message";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClrwaimTFaIXs4mc6ZKJkGbwyhvumo8-M",
  authDomain: "native-note-app-c6215.firebaseapp.com",
  projectId: "native-note-app-c6215",
  storageBucket: "native-note-app-c6215.appspot.com",
  messagingSenderId: "722674141296",
  appId: "1:722674141296:web:06867341b7b45e30800cb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // useEffect(()=>{signOut(auth)})
  useEffect(() => {
    const authSubcription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubcription;
  }, []);
  const Stack = createNativeStackNavigator();

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create" options={{ headerShown: false }}>
            {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Update"
              component={Update}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" /> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
