import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";

export default function HomeScreen() {
  const [data, setData] = useState([]);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  useEffect(() => {
    const load = async () => {
      const data = await drizzleDb.query.workout.findMany();
      console.log("~ load ~ data:", data);
      // setData(data);
    };
    load();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/home/settings">View settings</Link>
      <Link href="/home/records">View records</Link>
      <Link href="/home/calculators">View calculators</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
