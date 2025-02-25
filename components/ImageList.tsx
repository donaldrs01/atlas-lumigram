import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

interface ImageListProps {
  data: { image: string; caption: string; id: string; createdBy: string }[];
}

export default function ImageList({ data }: ImageListProps) {
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
    Alert.alert("Image favorited!");
  };

  const renderItem = ({ item }: { item: { image: string; caption: string; id: string; createdBy: string } }) => {
    // Define gestures
    const longPress = Gesture.LongPress()
      .runOnJS(true)
      .onEnd(() => runOnJS(handleLongPress)(item.id));

    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .runOnJS(true)
      .onEnd(() => runOnJS(handleDoubleTap)());

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
    <FlashList
      data={data} // Accepts different datasets (homeFeed, favoritesFeed)
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={150}
      extraData={showCaptions} // Force re-render when state changes
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}

const styles = StyleSheet.create({
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
    padding: 5,
  },
  captionText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});
