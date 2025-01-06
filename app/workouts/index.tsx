import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text>Workouts</Text>
      <Link href="/workouts/modal" style={styles.link}>
        Open modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
