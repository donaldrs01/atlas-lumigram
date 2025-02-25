import { View, Text, StyleSheet } from "react-native";
import ImageList from "@/components/ImageList";
import { homeFeed } from "@/placeholder";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Feed</Text>
      <ImageList data={homeFeed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});