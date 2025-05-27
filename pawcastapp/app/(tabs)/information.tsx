import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList, 
  
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Dog } from "../(register)/registrationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Menu from "./menu";
import { useRouter } from 'expo-router';


export default function Information() {
  const router = useRouter();
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
const removeDog = async (indexToRemove: number) => {
      if (!dogInfo) return;
    
      const updatedDogs = dogInfo.filter((_, index) => index !== indexToRemove);
      setDogInfo(updatedDogs);
    
      try {
        await AsyncStorage.setItem("userData", JSON.stringify({ dogs: updatedDogs }));
      } catch (e) {
        console.warn("Error removing dog", e);
      }
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

      <FlatList
        data={dogInfo}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.box}>
            {renderRow("Name", item.name, (text) => handleChange(text, index, "name"), "name", index)}
            {renderRow("Breed", item.breed, (text) => handleChange(text, index, "breed"), "breed", index)}
            <TouchableOpacity onPress={() => removeDog(index)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.addBtn}>
            <TouchableOpacity onPress={() => router.push('/addDog')}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
    color: "#000",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: "#000",
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
  remove: {
    fontSize: 16,
    fontWeight: "600",
    color: "#C50A1A",
  },
  box: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 50
  },
  addBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  add: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    overflow: 'hidden',
    textAlign: 'center',
  }
});
