import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="workouts" />
      <Tabs.Screen name="exercises" />
    </Tabs>
  );
}
