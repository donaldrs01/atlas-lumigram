import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, Alert, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LogoutComponent = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Clear user session
            router.replace("/(auth)/login"); // Redirect to login screen
        } catch (error: any) {
            Alert.alert("Logout failed", error.message);
        }
    };

    return ( 
    <Pressable onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} style={{marginRight: 16 }} />
    </Pressable>
    );
 }