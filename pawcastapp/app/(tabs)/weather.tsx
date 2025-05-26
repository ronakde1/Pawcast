import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./index";

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
  const [resolvedSlots, setResolvedSlots] = useState<{ time: string; score: number | undefined; color: string }[]>([]);

  useEffect(() => {
    async function resolveScores() {
      const resolved = await Promise.all(
        slots.map(async (slot) => ({
          time: slot.time,
          score: await slot.score,
          color: slot.color,
        }))
      );
      setResolvedSlots(resolved);
    }

    resolveScores();
  }, [slots]);

  return (
    <ImageBackground source={image} style={styles.background} resizeMode="cover">
      <Text style={styles.subtitle}>{name}</Text>
      <View style={styles.weatherBox}>
        <Text style={styles.temp}>{temperature}</Text>
        <Text style={styles.weather}>{weather}</Text>
      </View>

      <FlatList
        data={resolvedSlots}
        keyExtractor={(item) => item.time}
        contentContainerStyle={styles.slotList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.slot, { backgroundColor: item.color }]}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: {
                  targetHour: item.time,
                  ratingText: item.score?.toString() ?? '',
                  color: item.color,
                }
              })
            }
          >
            <Text style={styles.slotTime}>{item.time}</Text>
            <Text style={styles.slotScore}>{item.score ?? '-'}</Text>
          </TouchableOpacity>
        )}        
      />
    </ImageBackground>
  );
}
