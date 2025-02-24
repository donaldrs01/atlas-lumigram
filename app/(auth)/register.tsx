import { Text, View } from "react-native";
import { Link} from "expo-router";

export default function Page() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ marginBottom: 25 }}>Registry Page</Text>
            <Link href="/(auth)/login" replace>
                <Text>Log in to existing account</Text>
            </Link>
        </View>
    );
}