import { Text, View, StyleSheet, Button, TextInput, Image, Pressable } from "react-native";
import { useState } from "react";
import { useImagePicker } from "@/hooks/useImagePicker";
import { BorderlessButton } from "react-native-gesture-handler";

export default function Page() {
    const [caption, setCaption] = useState<string>("");
    const {image, openImagePicker, reset} = useImagePicker();

    return (
        <View style={styles.container}>
            <View style={styles.footerContainer}>
                {!image && (
                    <Button
                        title="Choose a photo"
                        onPress={openImagePicker}
                    />
                )}
                {image && (
                    <View style={{ flex: 1, gap: 16, alignItems: "center" }}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TextInput
                            style={styles.input}
                            placeholder="Add a caption"
                            value={caption}
                            onChangeText={setCaption}
                        />
                        <Pressable style={styles.saveButton} onPress={() => alert("Save")}>
                            <Text style={{ color:"white"}}>Save</Text>
                        </Pressable>

                        <Pressable style={styles.resetButton} onPress={reset}>
                            <Text style={{ fontWeight:"600" }}>Reset</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footerContainer: {
        padding: 16,
    },
    input : {
        borderWidth: 2,
        borderColor: "#1ED2AF",
        borderRadius: 5,
        padding: 10,
        width: "100%", 
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: "#1ED2AF",
        width: "80%",
        borderRadius: 8,
        alignItems: "center",
        paddingVertical: 15,
    },
    resetButton: {
        paddingTop: 10,
    }
});