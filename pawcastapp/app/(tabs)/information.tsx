import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";

export default function Information() {
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [editing, setEditing] = useState<"name" | "breed" | null>(null);

  useEffect(() => {
    (async () => {
      const n = await AsyncStorage.getItem("dogName");
      const b = await AsyncStorage.getItem("breed");
      const d = await AsyncStorage.getItem("birthDate");
      if (n) setDogName(n);
      if (b) setBreed(b);
      if (d) setBirthDate(d);
    })();
  }, []);

  const calculateAge = () => {
    if (!birthDate) return "—";
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (now.getDate() < birth.getDate()) months--;
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const saveField = async () => {
    try {
      if (editing === "name") {
        await AsyncStorage.setItem("dogName", dogName);
      }
      if (editing === "breed") {
        await AsyncStorage.setItem("breed", breed);
      }
    } catch (e) {
      console.warn("Error saving field", e);
    }
    setEditing(null);
    Keyboard.dismiss();
  };

  const renderRow = (
    label: string,
    value: string,
    onChange: (t: string) => void,
    mode: "name" | "breed"
  ) => (
    <BlurView intensity={70} tint="light" style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.label}>{label}</Text>
          {editing === mode ? (
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
            if (editing === mode) {
              saveField();
            } else {
              setEditing(mode);
            }
          }}
        >
          <Text style={styles.edit}>{editing === mode ? "Save" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/Husky.png")}
      resizeMode="cover"
      style={styles.background}
      blurRadius={Platform.OS === "android" ? 2 : 0} // Android no soporta blur en ImageBackground
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Dog information</Text>

        {renderRow("Name", dogName, setDogName, "name")}
        {renderRow("Breed", breed, setBreed, "breed")}

        <BlurView intensity={70} tint="light" style={styles.card}>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{calculateAge()}</Text>
            </View>
            <Text style={[styles.edit, { opacity: 0.4 }]}>Edit</Text>
          </View>
        </BlurView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
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
});
