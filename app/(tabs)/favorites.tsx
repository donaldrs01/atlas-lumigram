import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageList from "@/components/ImageList";
import { favoritesFeed } from "@/placeholder";

export default function FavoritesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favorites</Text>
            <ImageList data={favoritesFeed} />
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