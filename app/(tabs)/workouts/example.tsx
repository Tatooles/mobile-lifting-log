import { Text, StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log("showRightProgress:", prog.value);
    console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 100 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text className="w-[100px] h-[50px] bg-purple-500">Delete</Text>
    </Reanimated.View>
  );
}

export default function Example() {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
      >
        <Text>Swipe me!</Text>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    height: 50,
    backgroundColor: "papayawhip",
    alignItems: "center",
  },
});
