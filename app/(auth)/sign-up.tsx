import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-[.1]" />
        <View className="flex-1 justify-center items-center p-4">
          <View style={{ gap: 20, alignItems: "center" }}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 100, height: 100 }}
            />
            <Text className="text-3xl font-bold dark:text-white">
              Lifting Log
            </Text>
            <Text className="dark:text-white">Verify your email</Text>
          </View>

          <View className="flex-[1]" />

          <TextInput
            className="mb-5 bg-white p-3 rounded-xl w-full"
            value={code}
            placeholder="Enter your verification code"
            placeholderTextColor="#9CA3AF"
            onChangeText={(code) => setCode(code)}
          />
          <Button onPress={onVerifyPress} className="mb-8">
            Verify
          </Button>

          <View className="flex-row justify-center">
            <Text className="text-gray-400">Didn't receive the code? </Text>
            <TouchableOpacity onPress={() => setPendingVerification(false)}>
              <Text className="text-white font-medium">Try again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-[.1]" />
      <View className="flex-1 justify-center items-center p-4">
        <View style={{ gap: 20, alignItems: "center" }}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text className="text-3xl font-bold dark:text-white">
            Lifting Log
          </Text>
          <Text className="dark:text-white">Create your account</Text>
        </View>

        <View className="flex-[1]" />

        <TextInput
          className="mb-4 bg-white p-3 rounded-xl w-full"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9CA3AF"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          className="mb-5 bg-white p-3 rounded-xl w-full"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button onPress={onSignUpPress} className="mb-8">
          Continue
        </Button>

        <View className="flex-row justify-center">
          <Text className="text-gray-400">Already have an account? </Text>
          <Link href="/(auth)/sign-in">
            <Text className="text-white font-medium">Sign in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
