import { Text, View, Image, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchWeatherApi } from 'openmeteo';
import PagerView from "react-native-pager-view";
import DogWeather from "./weather";

//------------------------

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
let temp: number | undefined;

function TimeToTemperature(x: number) {

  return (getTemperature(x).then(result => {
    temp = result;
    console.log("Temperature at", x, ":", temp);
    return temp;
  })
  )
}
let x = 5;
let newtemp = TimeToTemperature(5);


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

function colouring(temperature: number) {
    if (temperature <= 15) {
      return "#D00000";
    } else if (temperature < 20) {
      return "#F4A300";
    } else if (temperature < 25) {
      return "#38B000";
    } else {
      return "#D00000";
    }
}



const timeSlots = [
  // Need to compute colour for these timings
  { time: dateToHourString(now), score: temperature(addHours(now, 1)),   color: "#F4A300"},
  { time: dateToHourString(addHours(now, 1)), score: temperature(addHours(now, 1)),   color: "#F4A300"},
  { time: dateToHourString(addHours(now, 2)), score: temperature(addHours(now, 2)),   color: "#38B000"},
  { time: dateToHourString(addHours(now, 3)), score: temperature(addHours(now, 3)),   color: "#38B000"},
  { time: dateToHourString(addHours(now, 4)), score: temperature(addHours(now, 4)),   color: "#D00000"},
  { time: dateToHourString(addHours(now, 5)), score: temperature(addHours(now, 5)),   color: "#F4A300"},
  { time: dateToHourString(addHours(now, 6)), score: temperature(addHours(now, 6)),   color: "#D00000"},
]

const dogPages = [
  {
    name: "Lil Grey",
    image: require("../../assets/images/Husky.png"),
    temperature: "23°C",
    weather: "SUNNY",
    slots: timeSlots
  },
  {
    name: "Barkley",
    image: require("../../assets/images/Husky.png"),
    temperature: "18°C",
    weather: "CLOUDY",
    slots: timeSlots
  },
];

const currenttemp = temperature(now);
//const currenttemp = 200;
export default function Home() {
  return (
    <SafeAreaView
      style={styles.overlay}
      edges={["top"]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="menu" size={35} color="#fff" />
        <Text style={styles.title}>Dog-walking time</Text>
      </View>

      <PagerView style={{ flex: 1 }} initialPage={0}>
        {dogPages.map((dog, index) => (
          <DogWeather key={index} {...dog} />
        ))}
      </PagerView>
    </SafeAreaView>
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
  background: {
  flex: 1,
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

