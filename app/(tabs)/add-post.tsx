import { Text, View, StyleSheet, Button, TextInput, Image, Pressable } from "react-native";
import { useState } from "react";
import { useImagePicker } from "@/hooks/useImagePicker";
import storage from "@/lib/storage";
import { getAuth } from "firebase/auth";
import firestore from "@/lib/firestore";

export default function Page() {
    const [caption, setCaption] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const {image, openImagePicker, reset} = useImagePicker();

    async function save() {
        if (!image) {
            alert("Select an image.");
            return;
        }
        // Grab user data
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("You must be logged in to upload a photo");
            return;
        }

        try {
            setLoading(true);
            const name = image?.split("/").pop() as string;
            const { downloadUrl, metadata } = await storage.upload(image, name);
            console.log(downloadUrl);
            // Add post to DB
            console.log("Attempting to add post to Firestore..");
            await firestore.addPost({
                caption: caption,
                image: downloadUrl,
                createdAt: new Date(),
                createdBy: user.uid
            });
            console.log("Post added successfully!");
            setLoading(false);
            alert("Post added!");
        } catch (error: any) {
            console.error("Upload failed:", error);
            alert("Upload failed: " + error.message);
        } finally {
            setLoading(false);
        }
    }

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
                        <Pressable style={styles.saveButton} onPress={save}>
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