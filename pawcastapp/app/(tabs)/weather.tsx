import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, StyleSheet, View } from "react-native";

type Slot = {
  time: string;
  score: number | undefined;
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
          score: slot.score,
          color: slot.color,
        }))
      );
      setResolvedSlots(resolved);
    }

    resolveScores();
  }, [slots]);

  return (
    <View style={styles.page}>
      <ImageBackground source={image} style={styles.background} resizeMode="cover">
        <Text style={styles.dogName}>{name}</Text>
        <TouchableOpacity 
          style={styles.weatherBox}
          onPress={() => {
            router.push({
              pathname: '/details'
            })
          }}
        >
          <Text style={styles.temp}>{temperature}</Text>
          <Text style={styles.weather}>{weather}</Text>
        </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  background: {
    flex: 1,
    borderRadius: 20,
  },
  dogName: {
    color: "#000000",
    marginTop: 4,
    marginBottom: 20,
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
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