import { Text, View, Pressable, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { TextInput } from "react-native-gesture-handler";

export default function Page() {
    const router = useRouter();
    const colorScheme = useColorScheme(); // Grab current theme
    const theme = Colors.dark;

    return (
        <View style={[styles.container, {backgroundColor: theme.background }]}>
            { /* Logo */}
            <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
            { /* Login Text */ }
            <Text style={styles.loginText}>Register</Text>
            { /* Input Fields */}
            <TextInput
                style={[styles.input, { backgroundColor: theme.background }]}
                placeholder="Email"
                placeholderTextColor={theme.icon}
            />
            <TextInput
                style={[styles.input, { backgroundColor: theme.background }]}
                placeholder="Password"
                placeholderTextColor={theme.icon}
                secureTextEntry={true}
            />
            { /* Create Account Button */}
            <Pressable
                style={styles.createAccountButton}
                onPress={() => router.replace("/(tabs)")}
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
    }
})