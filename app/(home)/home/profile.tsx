import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { Button } from "~/components/ui/button";

export default function Profile() {
  const { signOut } = useClerk();
  const { user } = useUser();
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
    <View className="flex-1 items-center gap-4 bg-gray-50 dark:bg-gray-900 text-white p-4">
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <View>
        {user?.fullName && (
          <Text className="text-2xl font-bold text-white">{user.fullName}</Text>
        )}
        <Text className="text-base text-gray-300">
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>
      <Button onPress={handleSignOut}>
        <Text className="text-center">Sign out</Text>
      </Button>
    </View>
  );
}
