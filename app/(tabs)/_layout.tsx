import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "teal" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts/index"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises/index"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color }) => (
            <Ionicons name="barbell" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts/modal" // I don't like this
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
