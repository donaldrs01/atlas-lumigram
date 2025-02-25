import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { homeFeed } from "@/placeholder";
import { runOnJS } from "react-native-reanimated";

export default function HomeScreen() {
  // Create boolean value to toggle caption on/off on long press
  const [showCaptions, setShowCaptions] = useState<{ [key: string]: boolean }>({});

  const handleLongPress = (id: string) => {
    // Update state by toggling the current image's boolean value
    setShowCaptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDoubleTap = () => {
    Alert.alert("Image favorited!")
  };

  const renderItem = ({ item } : { item: { image: string; caption: string; id: string; createdBy: string } }) => {

    const longPress = Gesture.LongPress()
      .runOnJS(true)
      .onEnd(() => {
        runOnJS(handleLongPress)(item.id);
      });

    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
     .runOnJS(true)
      .onEnd(() => {
        runOnJS(handleDoubleTap)();
      });

    return (
      <GestureDetector gesture={Gesture.Simultaneous(doubleTap, longPress)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          {showCaptions[item.id] && (
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>{item.caption}</Text>
            </View>
          )}
        </View>
      </GestureDetector>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Feed</Text>
      <FlashList
        data={homeFeed} // import HomeFeed placeholder data
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={150}
        extraData={showCaptions} // Force re-render when state change
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
  imageContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  captionOverlay: {
    position: "absolute",
    top: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  captionText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  }
});

