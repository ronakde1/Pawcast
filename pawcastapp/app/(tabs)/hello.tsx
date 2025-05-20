import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { JSX } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';  


//-------------------------
import { fetchWeatherApi } from 'openmeteo';
const params = {
	"latitude": 52.202936,
	"longitude": 0.1212971,
	"daily": "uv_index_max",
	"hourly": "temperature_2m",
	"forecast_days": 1
};
const url = "https://api.open-meteo.com/v1/forecast";
//const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
async function getWeather(): Promise<Record<number, number>> {
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  // Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
	},
	daily: {
		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		uvIndexMax: daily.variables(0)!.valuesArray()!,
	},
};
let ourTuple: [number, number];
let timetemperaturedict: { [key: number]: number } = {};
// `weatherData` now contains a simple structure with arrays for datetime and weather data
let hi = weatherData.hourly.time[1];
weatherData.hourly.temperature2m[0];

let hour = (hi.getHours());

let temperature= (Math.round((weatherData.hourly.temperature2m[0])));
let tupleyeye =[hour,temperature];


for (let i = 0; i < weatherData.hourly.time.length; i++) {
	timetemperaturedict[weatherData.hourly.time[i].getUTCHours()]=(Math.round((weatherData.hourly.temperature2m[i])));
}
return timetemperaturedict;
}

let timetemperaturedict = getWeather();

async function getTemperature(time: number): Promise<number | undefined> {
  const timetemperaturedict = await getWeather();
  return timetemperaturedict[time];
}

let temp: number | undefined; // Global variable

getTemperature(5).then(result => {
  temp = result;
  console.log("Temperature at 5:", temp);
});


//-------------------------

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

const image = { uri: 'https://legacy.reactjs.org/logo-og.png' };



export default function HomeScreen({ navigation }: HomeScreenProps): JSX.Element {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text onPress={() => navigation.navigate('Home')} style={styles.text}>
              Home Screen
            </Text>
            <Text style={styles.text}>Temperature: {temp}</Text>
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    margin: 50,
    backgroundColor: '#aaaaaa',
    fontSize: 26,
    fontWeight: 'bold',
  },
});