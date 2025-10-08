import { Text, View } from "react-native";
import { Link } from "expo-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "~/components/SignOutButton";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 text-white">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
        <Text className="text-gray-800 dark:text-white">Home</Text>
        <Link href="/home/settings" className="text-gray-800 dark:text-white">
          View settings
        </Link>
        <Link href="/home/records" className="text-gray-800 dark:text-white">
          View records
        </Link>
        <Link
          href="/home/calculators"
          className="text-gray-800 dark:text-white"
        >
          View calculators
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
