import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { getAuth } from "firebase/auth";
import firestore from "@/lib/firestore";

interface ImageListProps {
  data: { image: string; caption: string; id: string; createdBy: string, createdAt: Date }[];
}

export default function ImageList({ data }: ImageListProps) {
  // Create boolean value to toggle caption on/off on long press
  const [showCaptions, setShowCaptions] = useState<{ [key: string]: boolean }>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch user favorites on startup
  useEffect(() => {
    async function loadFavorites() {
      if (user) {
        const userFavorites = await firestore.getUserFavorites();
        setFavorites(userFavorites);
      }
    }
    loadFavorites();
  }, []);

  const handleLongPress = (id: string) => {
    // Update state by toggling the current image's boolean value
    setShowCaptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDoubleTap = async (post: { image: string, caption: string, id: string; createdBy: string, createdAt: Date }) => {    
    // Remove from favorites if already in collection
    if (favorites.includes(post.id)) {
      await firestore.removeFromFavorites(post.id);
      setFavorites(favorites.filter((fave) => fave !== post.id));
      Alert.alert("Removed from favorites!");
    } else {
      await firestore.addToFavorites(post);
      setFavorites([...favorites, post.id]);
      Alert.alert("Added to favorites!");
    }
  };

  const renderItem = ({ item }: { item: { image: string; caption: string; id: string; createdBy: string; createdAt: Date } }) => {
    // Define gestures
    const longPress = Gesture.LongPress()
      .runOnJS(true)
      .onEnd(() => runOnJS(handleLongPress)(item.id));

    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .runOnJS(true)
      .onEnd(() => runOnJS(handleDoubleTap)({...item }));

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
      estimatedItemSize={250}
      extraData={showCaptions} // Force re-render when state changes
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 6,
    resizeMode: "cover",
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
