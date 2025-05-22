import { fetchWeatherApi } from 'openmeteo';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface WeatherData {
  temperature: number;
  humidity: number;
  uv: number;
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const targetHour = '10:00';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = {
          latitude: 51.5074,
          longitude: -0.1278,
          hourly: ['temperature_2m', 'relative_humidity_2m', 'uv_index'],
          current: ['temperature_2m', 'relative_humidity_2m'],
        };
        const url = 'https://api.open-meteo.com/v1/forecast';
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffset = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

        const timeArray = [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
          (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffset) * 1000)
        );
        const tempArray = hourly.variables(0)!.valuesArray()!;
        const humidityArray = hourly.variables(1)!.valuesArray()!;
        const uvArray = hourly.variables(2)!.valuesArray()!;

        const hourIndex = timeArray.findIndex(time => {
          const hourStr = time.toISOString().substring(11, 16);
          return hourStr === targetHour;
        });

        if (hourIndex === -1) {
          console.error(`No data found for ${targetHour}`);
          return;
        }

        setWeather({
          temperature: Math.round(tempArray[hourIndex]),
          humidity: Math.round(humidityArray[hourIndex]),
          uv: Math.round(uvArray[hourIndex]),
        });
        setLoading(false);
      } catch (error) {
        console.error('Weather fetch failed:', error);
      }
    };

    fetchWeather();
  }, [targetHour]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Husky.png')} // Replace with your image path
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.timeBox}>
            <Text style={styles.time}>{targetHour}</Text>
          </View>

          {loading || !weather ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              <View style={styles.box}><Text style={styles.value}>{weather.uv}{'\n'}<Text style={styles.label}>UV Radiation</Text></Text></View>
              <View style={styles.box}><Text style={styles.value}>{weather.temperature}°C{'\n'}<Text style={styles.label}>Temperature</Text></Text></View>
              <View style={styles.box}><Text style={styles.value}>{weather.humidity}%{'\n'}<Text style={styles.label}>Humidity</Text></Text></View>

              <View style={styles.rating}>
                <Text style={styles.ratingText}>8</Text>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
  },
  timeBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  box: {
    width: 250,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    paddingVertical: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  rating: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 20,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
