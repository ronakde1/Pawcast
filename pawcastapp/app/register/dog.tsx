import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DogDetails() {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const router = useRouter();

  const breedsList = [
    { label: 'Husky', value: 'husky' },
    { label: 'Labrador', value: 'labrador' },
    { label: 'Shiba Inu', value: 'shiba' },
  ]

  const handleNext = () => {
    router.push({
      pathname: "/register/dog",
      params: { }, // Need to pass state
    });
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("dogName", dogName);
      await AsyncStorage.setItem("breed", breed);

      router.push({
        pathname: "/(tabs)",
        params: {}  // Need to pass state
      });
    } catch (error) {
      console.error("Error saving dog data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME</Text>
      <Text style={styles.subheader}>Tell us something about your dog:</Text>

      <View style={styles.inputContainer}>
        <Text>Dog Name</Text>
        <TextInput
          style={styles.boxstyle}
          value={dogName}
          onChangeText={setDogName}
          placeholder=""
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Breed</Text>
        <RNPickerSelect
          onValueChange={(value) => setBreed(value)}
          placeholder={{ label: 'Choose the breed', value: null }}
          items={breedsList}
          style={pickerSelectStyles}
          value={breed}
        />
      </View>

      <View style={styles.btn}>
        <Button onPress={handleNext} title="Next" color="#841584" />
      </View>
      <View style={styles.btn} >
        <Button onPress={handleSubmit} title="Register" color="#841584" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  boxstyle: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  btn: {
    padding: 2
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
  viewContainer: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },
});