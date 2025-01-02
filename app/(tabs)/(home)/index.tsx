import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Link href="/settings">View settings</Link>
      <Link href="/records">View records</Link>
      <Link href="/calculators">View calculators</Link>
    </View>
  );
}
