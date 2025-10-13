import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "~/components/ui/button";

export default function Profile() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 text-white p-4">
      <Button onPress={handleSignOut}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}
