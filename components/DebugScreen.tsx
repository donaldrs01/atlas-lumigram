import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function DebugScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Firebase API Key: {Constants.expoConfig?.extra?.firebaseApiKey || "Not Found"}</Text>
      <Text style={styles.text}>Auth Domain: {Constants.expoConfig?.extra?.firebaseAuthDomain || "Not Found"}</Text>
      <Text style={styles.text}>Project ID: {Constants.expoConfig?.extra?.firebaseProjectId || "Not Found"}</Text>
      <Text style={styles.text}>Storage Bucket: {Constants.expoConfig?.extra?.firebaseStorageBucket || "Not Found"}</Text>
      <Text style={styles.text}>Messaging Sender ID: {Constants.expoConfig?.extra?.firebaseMessagingSenderId || "Not Found"}</Text>
      <Text style={styles.text}>App ID: {Constants.expoConfig?.extra?.firebaseAppId || "Not Found"}</Text>
      <Text style={styles.text}>Measurement ID: {Constants.expoConfig?.extra?.firebaseMeasurementId || "Not Found"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "white",
  }
});
