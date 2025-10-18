import { Pressable, PressableProps, Text, ViewStyle } from "react-native";

export function Button({ children, style, ...props }: PressableProps) {
  return (
    <Pressable
      className="bg-white p-4 rounded-xl w-full"
      style={[
        {
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          width: "100%",
        },
        style as ViewStyle,
      ]}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-center font-medium">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
