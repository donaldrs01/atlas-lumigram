import { Text, View, StyleSheet } from "react-native";

export default function Page() {
    return (
        <View style={styles.header}>
            <Text>Favorites Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});