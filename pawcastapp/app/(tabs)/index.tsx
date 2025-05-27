import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { Link, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchWeatherApi } from 'openmeteo';
import PagerView from "react-native-pager-view";
import DogWeather from "./weather";
import { LogBox } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dog } from '../(register)/registrationContext';
import Menu from "./menu";
LogBox.ignoreAllLogs();

//------------------------

type DogHourScore = {
  name: string;
  image: { uri: string } | number;
  temperature: string;
  weather: string;
  slots: {
    time: string;
    score: number | undefined;
    color: string;
  }[];
};

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

  let temperature = (Math.round((weatherData.hourly.temperature2m[0])));
  let tupleyeye = [hour, temperature];

  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    timetemperaturedict[weatherData.hourly.time[i].getUTCHours()] = (Math.round((weatherData.hourly.temperature2m[i])));
  }
  return timetemperaturedict;
}

var timetemperaturedict: Record<number, number> | undefined = undefined;

async function getTemperature(time: number): Promise<number | undefined> {
  if (timetemperaturedict == undefined) {
    timetemperaturedict = await getWeather();
  }
  return timetemperaturedict[time];
}
async function TemptoScore(
  inputPromise: Promise<number | undefined>,breed:number
): Promise<number | undefined> {
  const temperature = await inputPromise;
  if (temperature !== undefined) {
    return (10-Math.min(Math.abs((18+breed-temperature)),9)); 
    //higher temp < 18+breed = higher score
    //higher temp > 18+breed = lower score
    //optimal temperature for a breed is given by 18 + breed 
    // e.g. if a breed has an optimal temperature of 20, breed = 2
  }
  return undefined;
}
const breedDictionary: { [key: string]: number } = {
  "husky": -8,
  "labrador": 3,
  "shiba": -2,
  "retriever": 1,
  "poodle": 2,
  "No breed available" : 0,
  "": 0
};


let temp: number | undefined;

function TimeToTemperature(x: number) {
  return (getTemperature(x).then(result => {
    temp = result;
    console.log("Temperature at", x, ":", temp);
    return temp;
  })
  )
}



let DONT_DELETE_THIS_THE_ENTIRE_WEBSITE_IS_DEPENDENT_ON_THIS = TimeToTemperature(0); 

//------------------------------

const now = new Date()

function addHours(date: Date, hours: number) {
  const newDate = new Date(date)
  newDate.setHours(date.getHours() + hours)
  return (newDate)
}

console.log(now.getHours())
function dateToHourString(date: Date) {
  return date.getHours() + ": 00"
} 
function temperature(dateyeye: Date){
  let hour = dateyeye.getHours();
  return TimeToTemperature(hour);
}
function score(dateyeye: Date, breed_n: number){
  return TemptoScore(temperature(dateyeye),breed_n);
}


function breedtochange(breedname: string): number{
  return breedDictionary[breedname];
}


async function colouring(scorePromise: Promise<number | undefined>): Promise<string> {
  try {
    const score = await scorePromise;
    if (score === undefined) {
      return "rgba(34, 197, 94, 0.7)";
    } else if (score <= 4) {
      return "rgba(220, 38, 38, 0.7)";
    } else if (score < 7) {
      return "rgba(245, 158, 11, 0.7)"; 
    } else {
      return "rgba(34, 197, 94, 0.7)";
    }
  } catch {
    return "rgba(34, 197, 94, 0.7)";
  }
}


export default function Home() {
  const [modalVisible, setModalVisible] = useState(false); // Added state for modal visibility
  const [dogsHourScores, setScores] = useState<DogHourScore[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch temperature
      const temp = await temperature(now);

      // Fetch saved user data from AsyncStorage
      try {
        const jsonString = await AsyncStorage.getItem("userData");
        if (jsonString != null) {
          const savedData = JSON.parse(jsonString);

          // Create time slots
          const dogsHourScores = await Promise.all(
            savedData.dogs.map(async (dog: Dog) => ({
              name: dog.name,
              image: dog.imageUri
                ? { uri: dog.imageUri }
                : "",
              temperature: `${temp}°C`,
              weather: "SUNNY",
              slots: await buildTimeSlots(dog.breed),
            }))
          )
          setScores(dogsHourScores);
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage:", error);
      }
    }

    fetchData();
  }, []);


  async function buildTimeSlots(breed: string) {
    const hoursToAdd = Array.from({ length: 12 }, (_, i) => i);
  
    const timeSlots = await Promise.all(
      hoursToAdd.map(async (h) => {
        const time = addHours(now, h);
        const scoreVal = await score(time, breedtochange(breed));
        const colorVal = await colouring(Promise.resolve(scoreVal));
  
        return {
          time: dateToHourString(time),
          score: scoreVal,
          color: colorVal,
        };
      })
    );
  
    return timeSlots;
  }

  return (
    <SafeAreaView
      style={styles.overlay}
      edges={["top"]}
    >
      <Menu title={"Dog Walking Time"}></Menu>

      <PagerView style={styles.pager} initialPage={0}>
        {dogsHourScores?.map((dog, index) => (
          <DogWeather key={index} {...dog} />
        ))}
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)", // Optional dim overlay
    padding: 20,
    paddingBottom: 0
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 60, // Position dropdown below header
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 200,
    marginLeft: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 18,
    color: "#000",
  },
  pager: {
    flex: 1,
    borderRadius: 20
  }
})