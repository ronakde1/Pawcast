import { Text, View, Image, StyleSheet, FlatList, ImageBackground } from "react-native";
import {styles} from "./index";
import {Link} from "expo-router";

type Slot = {
  time: string;
  score: Promise<number | undefined>;
  color: string;
};

type Props = {
  name: string;
  image: any;
  temperature: string;
  weather: string;
  slots: Slot[];
};

export default function DogWeather({
  name,
  image,
  temperature,
  weather,
  slots,
}: Props) {
  console.log("Dog image:", image);
  return (
    <ImageBackground source={image} style={styles.background} resizeMode="cover">
      <Text style={styles.subtitle}>{name}</Text>
        <View style={styles.weatherBox}>
          <Text style={styles.temp}>{temperature}</Text>
          <Text style={styles.weather}>{weather}</Text>
        </View>

        <FlatList
          data={slots}
          keyExtractor={(item) => item.time}
          contentContainerStyle={styles.slotList}
          renderItem={({ item }) => (
            <View style={[styles.slot, { backgroundColor: item.color }]}>
              <Text style={styles.slotTime}>{item.time}</Text>
              <Text style={styles.slotScore}>{item.score}</Text>
            </View>
          )}
        />
    </ImageBackground>
  )
}