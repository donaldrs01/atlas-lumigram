import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import ImageList from "@/components/ImageList";
import firestore from "@/lib/firestore";
import type { Post } from "@/lib/firestore";
import { getAuth } from "firebase/auth";
import { FlashList } from "@shopify/flash-list";

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    async function loadFavorites() {
        setLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        // Fetch post IDs from favorites collection
        const favoritePostIds = await firestore.getUserFavorites();
        // With post IDs, get full post details from DB
        const favoritePosts = await firestore.getFavoritePosts(favoritePostIds);
        setFavorites(favoritePosts);
        setLoading(false);
    }

    useEffect(() => {
        loadFavorites();
    }, []);

    // Pull-to-refresh handler
    async function onRefresh() {
        setRefresh(true);
        await loadFavorites();
        setRefresh(false);
    }

    if (loading && favorites.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1ED2AF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favorites</Text>
            <FlashList
                data={favorites}
                renderItem={({ item }) => <ImageList data={[item]} />}
                keyExtractor={(item) => item.id}
                estimatedItemSize={300}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});