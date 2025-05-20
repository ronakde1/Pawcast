import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import {Link} from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const timeSlots = [
  // Need to compute colour for these timings
  { time: "10 : 00", score: 8, color: "#38B000" },
  { time: "11 : 00", score: 6, color: "#F4A300" },
  { time: "12 : 00", score: 7, color: "#F4A300" },
  { time: "13 : 00", score: 4, color: "#D00000" },
  { time: "14 : 00", score: 6, color: "#F4A300" },
  { time: "15 : 00", score: 7, color: "#F4A300" },
  { time: "16 : 00", score: 4, color: "#D00000" },
]


export default function Home() {
  return (
    <View style={styles.overlay}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="menu" size={35} color="#fff" />
          <Text style={styles.title}>Dog-walking time</Text>
        </View>

        <Text style={styles.subtitle}>Lil Grey</Text>

        <View style={styles.weatherBox}>
          <Text style={styles.temp}>23°C</Text>
          <Text style={styles.weather}>SUNNY</Text>
        </View>

        <FlatList
          data={timeSlots}
          keyExtractor={(item) => item.time}
          contentContainerStyle={styles.slotList}
          renderItem={({ item }) => (
            <View style={[styles.slot, { backgroundColor: item.color }]}>
              <Text style={styles.slotTime}>{item.time}</Text>
              <Text style={styles.slotScore}>{item.score}</Text>
            </View>
          )}
        />
      </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%"
  },
<<<<<<< HEAD
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)", // Optional dim overlay
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFE600",
  },
  subtitle: {
    color: "#fff",
    marginTop: 4,
    marginBottom: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
  weatherBox: {
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
  },
  weather: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  slotList: {
    gap: 12,
  },
  slot: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  slotTime: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  slotScore: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
})
=======
  boxstyle: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      height: 40,
      width: 250,
    },
  });
>>>>>>> 2fef974 (database start)
