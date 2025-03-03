import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Page() {
    const router = useRouter();
    const theme = Colors.dark;
    // State variables for storing user credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegistration = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)/home");
        } catch (error: any) {
            setError(error.message);
            Alert.alert("Registration failed", error.message)
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background }]}>
            { /* Logo */}
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            { /* Register Text */ }
            <Text style={styles.loginText}>Register</Text>
            { /* Registration Error Text */ }
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            { /* Input Fields */}
            <TextInput
                style={[styles.input, { backgroundColor: theme.background }]}
                placeholder="Email"
                placeholderTextColor={theme.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, { backgroundColor: theme.background }]}
                placeholder="Password"
                placeholderTextColor={theme.icon}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            { /* Create Account Button */}
            <Pressable
                style={styles.createAccountButton}
                onPress={handleRegistration}
            >
                <Text style={styles.signInText}>Create Account</Text>
            </Pressable>
            { /* Login to Existing Account Link */ }
            <Link href="/(auth)/login" replace style={styles.existingAccountLink}>
                <Text style={styles.existingAccountText}>Login to existing account</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
    loginText: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
        color: "white",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderColor: "#1ED2AF",
        color: "white",
    },
    createAccountButton: {
        backgroundColor: "#1ED2AF",
        width: "100%",
        borderRadius: 6,
        alignItems: "center",
        paddingVertical: 10,
    },
    signInText: {
        color: "white",
    },
    existingAccountLink: {
        marginTop: 20,
    },
    existingAccountText: {
        color: "white"
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    }
})