import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import {Link} from "expo-router";
import PagerView from "react-native-pager-view";
import DogWeather from "./weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Home() {
  const dogPages = [
    {
      name: "Lil Grey",
      image: require("../../assets/images/Husky.png"),
      temperature: "23°C",
      weather: "SUNNY",
      slots: [
        { time: "10 : 00", score: 8, color: "#38B000" },
        { time: "11 : 00", score: 6, color: "#F4A300" },
        { time: "12 : 00", score: 7, color: "#F4A300" },
        { time: "13 : 00", score: 4, color: "#D00000" },
        { time: "14 : 00", score: 6, color: "#F4A300" },
        { time: "15 : 00", score: 7, color: "#F4A300" },
        { time: "16 : 00", score: 4, color: "#D00000" },
        { time: "17 : 00", score: 6, color: "#F4A300" },
        { time: "18 : 00", score: 7, color: "#F4A300" },
        { time: "19 : 00", score: 4, color: "#D00000" },
      ],
    },
    {
      name: "Barkley",
      image: require("../../assets/images/Husky.png"),
      temperature: "18°C",
      weather: "CLOUDY",
      slots: [
        { time: "09 : 00", score: 7, color: "#90BE6D" },
        { time: "10 : 00", score: 5, color: "#F9C74F" },
        { time: "11 : 00", score: 4, color: "#F8961E" },
        { time: "12 : 00", score: 3, color: "#F94144" },
      ],
    },
  ]

  return (
    <View style={styles.overlay}>
      <View style={styles.header}>
          <MaterialCommunityIcons name="menu" size={35} color="#fff" />
          <Text style={styles.title}>Dog-walking time</Text>
      </View>

      <PagerView style={{ flex: 1 }} initialPage={0}>
        {dogPages.map((dog, index) => (
          <DogWeather key={index} {...dog} />
        ))}
      </PagerView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%"
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)", // Optional dim overlay
    paddingTop: 5
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 5
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
  boxstyle: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    height: 40,
    width: 250,
  },
})
