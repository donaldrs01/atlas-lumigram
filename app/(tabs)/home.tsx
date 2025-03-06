import { View, Text, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import ImageList from "@/components/ImageList";
import { useEffect, useState } from "react";
import firestore from "@/lib/firestore";
import { FlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const pageSize = 5;

  // Fetch posts on startup
  useEffect(() => {
    loadPosts();
  }, []);

  // loadMore arg, when true, allows for scrolling on refresh
  async function loadPosts(loadMore = false) {
    if (loadMore && !lastDoc) return; 

    setLoading(true);
    const { posts: newPosts, lastDoc: newLastDoc } = await firestore.fetchPosts(lastDoc, pageSize);

    setPosts(loadMore ? [...posts, ...newPosts] : newPosts);
    setLastDoc(newLastDoc);
    setLoading(false);
  }

  // Pull-to-refresh gesture handler
  async function onRefresh() {
    setRefresh(true);
    await loadPosts();
    setRefresh(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Feed</Text>
      {loading && posts.length === 0 ? (
        <ActivityIndicator size="large" color="#1ED2AF" />
      ) : (
        <FlashList
          data={posts}
          renderItem={({ item }) => <ImageList data={[item]} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={300}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
          onEndReached={() => loadPosts(true)}
        />
      )}
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