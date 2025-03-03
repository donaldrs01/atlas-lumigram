import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function LoginPage() {
    const router = useRouter();
    const theme = Colors.dark;

    // State to store user credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("/(tabs)/home"); // Redirect to homepage after successful login
        } catch (error: any) {
            setError(error.message);
            Alert.alert("Login attempt failed", error.message);
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background }]}>
            { /* Logo */}
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            { /* Login Text */ }
            <Text style={styles.loginText}>Login</Text>
            { /* Login Error Message */ }
            {error? <Text style={styles.errorText}>{error}</Text> : null}
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
            { /* Sign In Button */}
            <Pressable
                style={styles.signInButton}
                onPress={handleLogin}
            >
                <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
            { /* Create Account Link */ }
            <Link href="/(auth)/register" replace style={styles.createAccountLink}>
                <Text style={styles.createAccountText}>Create a new account</Text>
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
    signInButton: {
        backgroundColor: "#1ED2AF",
        width: "100%",
        borderRadius: 6,
        alignItems: "center",
        paddingVertical: 10,
    },
    signInText: {
        color: "white",
    },
    createAccountLink: {
        marginTop: 20,
    },
    createAccountText: {
        color: "white"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    }
})