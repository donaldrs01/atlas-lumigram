import { Text, View, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Page() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ marginBottom: 20 }}>Login Page</Text>
            <Link href="/(auth)/register" replace>
                <Text>Create a new account</Text>
            </Link>

            <Pressable onPress={() => {
                router.replace("/(tabs)");
            }}
            >
                <Text style={{ marginTop: 20 }}>Sign In</Text>
            </Pressable>
        </View>
    );
}