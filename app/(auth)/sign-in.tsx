import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Image, Text, TextInput, View } from "react-native";
import React from "react";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-[.1]" />
      <View className="flex-1 justify-center items-center p-4 ">
        <View style={{ gap: 20, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-3xl font-bold dark:text-white">
            Lifting Log
          </Text>
          <Text className="dark:text-white">Sign in to continue</Text>
          {/* {errors.map((error) => (
            <Text key={error.code}>{error.code}</Text>
          ))} */}
        </View>

        <View className="flex-[1]" />

        <Button
          className="flex-row items-center justify-center gap-3 mb-6"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            className="w-5 h-5"
            style={{ width: 20, height: 20 }}
          />
          <Text className="font-medium">Sign in with Google</Text>
        </Button>

        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-600" />
          <Text className="mx-4 text-gray-400 text-sm">
            or continue with email
          </Text>
          <View className="flex-1 h-px bg-gray-600" />
        </View>

        <TextInput
          className="mb-4 bg-gray-800 border border-gray-600 p-3 rounded-xl w-full text-white"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9CA3AF"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          className="mb-5 bg-gray-800 border border-gray-600 p-3 rounded-xl w-full text-white"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button onPress={onSignInPress} className="mb-8">
          Sign in
        </Button>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Don't have an account? </Text>
          <Link href="/(auth)/sign-up">
            <Text className="text-white font-medium">Sign up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
