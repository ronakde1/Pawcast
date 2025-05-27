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
import { Dog } from '../register/registrationContext';
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
  "Affenpinscher": -6, 
  "Afghan Hound": 6, 
  "Airedale Terrier": 6, 
  "Akita": -6, 
  "Alaskan Klee Kai": 0, 
  "Alaskan Malamute": -6, 
  "American Bulldog": -6, 
  "American English Coonhound": -2, 
  "American Eskimo Dog": -2, 
  "American Foxhound": 6, 
  "American Hairless Terrier": 6, 
  "American Pit Bull Terrier": -2, 
  "American Staffordshire Terrier": -6, 
  "American Water Spaniel": -6, 
  "Anatolian Shepherd": 6, 
  "Aussiedoodle": -6, 
  "Australian Cattle Dog": 6, 
  "Australian Kelpie": 6, 
  "Australian Shepherd": 2,
  "Australian Terrier": 6, 
  "Azawakh": 6, 
  "Basenji": 6, 
  "Basset Hound": 0, 
  "Beagle": -6, 
  "Bearded Collie": -6, 
  "Beauceron": 0, 
  "Bedlington Terrier": -6, 
  "Belgian Malinois": -2, 
  "Belgian Sheepdog (Groenendael)": -6, 
  "Belgian Tervuren": -6, 
  "Bergamasco": -6, 
  "Berger Picard": -6, 
  "Bernedoodle": -6, 
  "Bernese Mountain Dog": -6, 
  "Bichon Frise": 0, 
  "Biewer Terrier": -6, 
  "Black and Tan Coonhound": 6, 
  "Black Russian Terrier": 0, 
  "Bloodhound": -6, 
  "Blue Lacy": 6, 
  "Bluetick Coonhound": -6, 
  "Boerboel (South African Mastiff)": 6,
  "Bolognese": 0, 
  "Border Aussie": -6, 
  "Border Collie": 0, 
  "Border Terrier": -6, 
  "Borzoi": -6, 
  "Boston Terrier": -6, 
  "Bouvier des Flandres": -6, 
  "Boxer": -6, 
  "Boykin Spaniel": 6, 
  "Bracco Italiano": 0, 
  "Briard": -2, 
  "Brittany (Brittany Spaniel)": -6, 
  "Brussels Griffon": -6, 
  "Bullmastiff": -6, 
  "Bull Terrier": 6, 
  "Cairn Terrier": 0, 
  "Canaan Dog": 6, 
  "Cane Corso": -6, 
  "Cardigan Welsh Corgi": 0, 
  "Carolina Dog": 6, 
  "Catahoula Leopard Dog": 6, 
  "Caucasian Shepherd Dog": -6, 
  "Cavalier King Charles Spaniel": -6, 
  "Cavapoo": -6, 
  "Central Asian Shepherd Dog": 6, 
  "Cesky Terrier": 0, 
  "Chesapeake Bay Retriever": -6, 
  "Chihuahua": 0, 
  "Chinese Crested": -6, 
  "Chinese Shar-Pei": -6, 
  "Chinook": -6, 
  "Chipoo": 6, 
  "Chorkie": -6, 
  "Chow Chow": -6, 
  "Chug": -6, 
  "Clumber Spaniel": -6, 
  "Cockapoo": -6, 
  "Cocker Spaniel": -6, 
  "Collie": 0, 
  "Coton de Tulear": -6, 
  "Curly-Coated Retriever": 0, 
  "Dachshund": -6, 
  "Dalmatian": 6, 
  "Dandie Dinmont Terrier": -6, 
  "Danish-Swedish Farmdog": -6, 
  "Doberman Pinscher": 0, 
  "Dogo Argentino": -6, 
  "Dogue de Bordeaux": -6, 
  "Dorgi": -6, 
  "Dorkie": 6, 
  "Dutch Shepherd": -6, 
  "English Cocker Spaniel": -6, 
  "English Foxhound": 0, 
  "English Setter": -6, 
  "English Springer Spaniel": -6, 
  "English Toy Spaniel": -6, 
  "Entlebucher Mountain Dog": -6, 
  "Estrela Mountain Dog": 6, 
  "Eurasier": -6, 
  "Field Spaniel": 0, 
  "Finnish Lapphund": -6, 
  "Finnish Spitz": -6, 
  "Flat-Coated Retriever": -6, 
  "French Bulldog": -6, 
  "Gerberian Shepsky": -6, 
  "German Pinscher": -6, 
  "German Shepherd": 0, 
  "German Shorthaired Pointer": 6, 
  "German Spitz": -6, 
  "German Wirehaired Pointer": 6, 
  "Giant Schnauzer": -6, 
  "Glen of Imaal Terrier": -6, 
  "Goberian": -6, 
  "Goldendoodle": -6, 
  "Golden Retriever": -6, 
  "Gordon Setter": -6, 
  "Grand Basset Griffon Vendéen": -6, 
  "Great Dane": -6, 
  "Greater Swiss Mountain Dog": -6, 
  "Great Pyrenees": -6, 
  "Greyhound": -6, 
  "Harrier": -6, 
  "Havanese": 6, 
  "Havapoo": 0, 
  "Hokkaido": -6, 
  "Ibizan Hound": 6, 
  "Icelandic Sheepdog": -6, 
  "Irish Doodle": -6, 
  "Irish Red and White Setter": 0, 
  "Irish Setter": 0, 
  "Irish Terrier": 0, 
  "Irish Water Spaniel": 6, 
  "Irish Wolfhound": -6, 
  "Italian Greyhound": 0, 
  "Jagdterrier": -6, 
  "Japanese Chin": -6, 
  "Japanese Spitz": 0, 
  "Japanese Terrier": 0, 
  "Jindo": -6, 
  "Karelian Bear Dog": -6, 
  "Keeshond": -6, 
  "Kerry Blue Terrier": -6, 
  "Kishu Ken": 0, 
  "Komondor": 6, 
  "Kuvasz": -6, 
  "Labradoodle": -6, 
  "Labrador Retriever": -6, 
  "Lagotto Romagnolo": 0, 
  "Lakeland Terrier": 6, 
  "Lancashire Heeler": 0, 
  "Leonberger": -6, 
  "Lhasa Apso": -6, 
  "Löwchen": -6, 
  "Malshi": -6, 
  "Maltese": -6, 
  "Maltipoo": -6, 
  "Manchester Terrier": -6, 
  "Mastiff": -6, 
  "Miniature American Shepherd": -6, 
  "Miniature Bull Terrier": -6, 
  "Miniature Pinscher": -6, 
  "Miniature Poodle": -6, 
  "Miniature Schnauzer": 0, 
  "Morkie": 0, 
  "Mountain Cur": -6, 
  "Mudi": -6, 
  "Neapolitan Mastiff": -6, 
  "Nederlandse Kooikerhondje": -6, 
  "Newfoundland": -6, 
  "Norfolk Terrier": 0, 
  "Norwegian Elkhound": -6, 
  "Norwegian Lundehund": -6, 
  "Norwich Terrier": -6, 
  "Nova Scotia Duck Tolling Retriever": -6, 
  "Old English Sheepdog": -6, 
  "Otterhound": -6, 
  "Papillon": 0, 
  "Parson Jack Russell Terrier": -6, 
  "Pekingese": -6, 
  "Pembroke Welsh Corgi": -6, 
  "Petit Basset Griffon Vendéen": 6, 
  "Pharaoh Hound": 6, 
  "Plott Hound": 0, 
  "Pointer": 0, 
  "Polish Lowland Sheepdog": -6, 
  "Pomchi": -6, 
  "Pomeranian": -6, 
  "Pomsky": -6, 
  "Portuguese Water Dog": 0, 
  "Pudelpointer": 0, 
  "Pug": -6, 
  "Puggle": -6, 
  "Puli": 0, 
  "Pumi": -6, 
  "Pyrenean Mastiff": -6, 
  "Rafeiro do Alentejo": -6, 
  "Rat Terrier": 6, 
  "Redbone Coonhound": -6, 
  "Rhodesian Ridgeback": 0, 
  "Rottweiler": -6, 
  "Russell Terrier": 0, 
  "Saint Bernard": -6, 
  "Saluki": 6, 
  "Samoyed": -6, 
  "Schipperke": -6, 
  "Schnoodle": -6, 
  "Scottish Deerhound": -6, 
  "Scottish Terrier": 0, 
  "Sealyham Terrier": -6, 
  "Sealyham Terrier": -6, 
  "Sheepadoodle": 0, 
  "Shepadoodle": -6, 
  "Sheprador": 0, 
  "Shetland Sheepdog (Sheltie)": -6, 
  "Shiba Inu": -6, 
  "Shichon": -6, 
  "Shih-Poo": -6, 
  "Shih Tzu": -6, 
  "Shikoku": 6, 
  "Shorkie": -6, 
  "Siberian Husky": -6, 
  "Silky Terrier": -6, 
  "Skye Terrier": -6, 
  "Sloughi": 6, 
  "Smooth Fox Terrier": -6, 
  "Soft Coated Wheaten Terrier": -6, 
  "Spanish Mastiff": -6, 
  "Spanish Water Dog": 6, 
  "Spinone Italiano": 0, 
  "Staffordshire Bull Terrier": -6, 
  "Standard Poodle": 0, 
  "Standard Schnauzer": 0, 
  "Sussex Spaniel": -6, 
  "Swedish Vallhund": -6, 
  "Texas Heeler": 6, 
  "Thai Ridgeback": 6, 
  "Tibetan Mastiff": -6, 
  "Tibetan Spaniel": -6, 
  "Tibetan Terrier": 6, 
  "Toy Fox Terrier": 6, 
  "Toy Manchester Terrier": 0, 
  "Toy Poodle": 0, 
  "Transylvanian Hound": 6, 
  "Treeing Walker Coonhound": 6, 
  "Vizsla": 6, 
  "Volpino Italiano": -6, 
  "Weimaraner": -6, 
  "Welsh Springer Spaniel": 6, 
  "Welsh Terrier": -6, 
  "West Highland White Terrier (Westie)": -6, 
  "Whippet": 6, 
  "Whoodle": -6, 
  "Wire Fox Terrier": 0,
  "Wirehaired Pointing Griffon": -6, 
  "Wirehaired Vizsla": -6, 
  "Xoloitzcuintli (Mexican Hairless)": 6, 
  "Yorkiepoo": 0, 
  "Yorkshire Terrier (Yorkie)": -6 
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
  return breedDictionary[breedname]??0;
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