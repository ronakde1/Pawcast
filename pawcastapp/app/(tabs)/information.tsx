import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Dog } from "../(register)/registrationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "./menu";

export default function Information() {
  // const [dogName, setDogName] = useState("");
  // const [breed, setBreed] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  const [editing, setEditing] = useState<{ dogIndex: number; field: "name" | "breed" } | null>(null);
  const [dogInfo, setDogInfo] = useState<Dog[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch saved user data from AsyncStorage
      try {
        const jsonString = await AsyncStorage.getItem("userData");
        if (jsonString != null) {
          const savedData = JSON.parse(jsonString);
          console.log(savedData)

          setDogInfo(savedData.dogs);
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage:", error);
      }
    }

    fetchData();
  }, []);

  // const calculateAge = () => {
  //   if (!birthDate) return "—";
  //   const birth = new Date(birthDate);
  //   const now = new Date();
  //   let years = now.getFullYear() - birth.getFullYear();
  //   let months = now.getMonth() - birth.getMonth();
  //   if (now.getDate() < birth.getDate()) months--;
  //   if (months < 0) {
  //     years--;
  //     months += 12;
  //   }
  //   if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
  //   return `${months} month${months > 1 ? "s" : ""}`;
  // };

  const saveField = async () => {
    try {
      await AsyncStorage.setItem(
        "userData", 
        JSON.stringify({ dogs: dogInfo })
      )
    } catch (e) {
      console.warn("Error saving field", e);
    }
    setEditing(null);
    Keyboard.dismiss();
  };

  const handleChange = (text: string, dogIndex: number, field: "name" | "breed") => {
    setDogInfo(prev =>
      prev ? prev.map((dog, i) => 
        i === dogIndex ? { ...dog, [field]: text } : dog
      )
      : prev
    );
  };

  const renderRow = (
    label: string,
    value: string,
    onChange: (t: string) => void,
    mode: "name" | "breed",
    index: number
  ) => (
    <BlurView intensity={70} tint="light" style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.label}>{label}</Text>
          {editing && editing.dogIndex === index && editing.field === mode ? (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={saveField}
              autoFocus
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          ) : (
            <Text style={styles.value}>{value}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (editing && editing.dogIndex === index && editing.field === mode) {
              saveField();
            } else {
              setEditing({ dogIndex: index, field: mode });
            }
          }}
        >
          <Text style={styles.edit}>
            {editing && editing.dogIndex === index && editing.field === mode ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <SafeAreaView style={styles.overlay}>
      <Menu title="Dog Information"></Menu>

      <View>
        {dogInfo?.map((dog: Dog, index: number) => (
          <View style={styles.box} key={index}>
            {renderRow("Name", dog.name, (text) => handleChange(text, index, "name"), "name", index)}
            {renderRow("Breed", dog.breed, (text) => handleChange(text, index, "breed"), "breed", index)}
          </View>
        ))}
      </View>



      {/* <BlurView intensity={70} tint="light" style={styles.card}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{calculateAge()}</Text>
          </View>
          <Text style={[styles.edit, { opacity: 0.4 }]}>Edit</Text>
        </View>
      </BlurView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: 20,
    paddingBottom: 0
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFE600",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: "#fff",
  },
  input: {
    fontSize: 18,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  edit: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00C2FF",
  },
  box: {
    padding: 12,
    paddingBottom: 0,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
  }
});
