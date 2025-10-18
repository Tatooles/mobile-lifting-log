import { Pressable, PressableProps, Text, ViewStyle } from "react-native";
import { cn } from "~/lib/utils";

interface ButtonProps extends PressableProps {
  className?: string;
}

export function Button({ children, style, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn("bg-white p-4 rounded-xl w-full", className)}
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
