import React, { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet, BackHandler } from 'react-native';
import { Dog } from './registrationContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

export default function DogDetails() {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogImageUri, setDogImageUri] = useState('');
  const [imageName, setImageName] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; breed?: string }>({});
  const router = useRouter();

  const breedsList = [
      { label: 'American Bulldog', value: 'American Bulldog'},
      { label: 'Black Russian Terrier', value: 'Black Russian Terrier'},
      { label: 'Bloodhound', value: 'Bloodhound'},
      { label: 'Cane Corso', value: 'Cane Corso'},
      { label: 'Chihuahua', value: 'Chihuahua'},
      { label: 'Chow Chow', value: 'Chow Chow'},
      { label: 'Dachshund', value: 'Dachshund'},
      { label: 'Dalmatian', value: 'Dalmatian'},
      { label: 'English Foxhound', value: 'English Foxhound'},
      { label: 'English Springer Spaniel”', value: 'English Springer Spaniel'},
      { label: 'French Bulldog”', value: 'French Bulldog'},
      { label: 'German Shepherd', value: 'German Shepherd'},
      { label: 'Golden Retriever', value: 'Golden Retriever'},
      { label: 'Great Dane', value: 'Great Dane'},
      { label: 'Greyhound', value: 'Greyhound'},
      { label: 'Havapoo', value: 'Havapoo'},
      { label: 'Irish Terrier', value: 'Irish Terrier'},
      { label: 'Japanese Terrier', value: 'Japanese Terrier'},
      { label: 'Komondor', value: 'Komondor'},
      { label: 'Labradoodle', value: 'Labradoodle'},
      { label: 'Maltipoo', value: 'Maltipoo'},
      { label: 'Manchester Terrier', value: 'Manchester Terrier'},
      { label: 'Otterhound', value: 'Otterhound'},
      { label: 'Pug', value: 'Pug'},
      { label: 'Rottweiler', value: 'Rottweiler'},
      { label: 'Shih Tzu', value: 'Shih Tzu'},
      { label: 'Siberian Husky', value: 'Siberian Husky'},
      { label: 'Yorkshire Terrier (Yorkie)', value: 'Yorkshire Terrier (Yorkie)'},
  ]

  const validate = () => {
    const newErrors: { name?: string; breed?: string } = {};
    if (!dogName.trim()) newErrors.name = 'Dog name is required';
    if (!breed) newErrors.breed = 'Breed is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0]
      setDogImageUri(img.uri);
      setImageName(img.fileName ?? '');
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const newDog: Dog = {
      name: dogName.trim(),
      breed: breed,
      age: Number(dogAge),
      imageUri: dogImageUri,
    };

    try {
        const jsonString = await AsyncStorage.getItem("userData");
        if (jsonString != null) {
          const savedData = JSON.parse(jsonString);
          savedData.dogs.push(newDog)
          console.log(savedData)
          await AsyncStorage.setItem("userData", JSON.stringify(savedData));
        }
      } catch (error) {
        console.error("Error saving user data to AsyncStorage:", error);
    }

    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add more dogs</Text>

      <View style={styles.inputContainer}>
        <Text>Dog Name</Text>
        <TextInput
          style={styles.boxstyle}
          value={dogName}
          onChangeText={setDogName}
          placeholder=""
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text>Breed</Text>
        <Dropdown
          style={styles.dropdown}
          data={breedsList}
          labelField="label"
          valueField="value"
          placeholder="Choose the breed"
          search
          value={breed}
          onChange={obj => {
            console.log(obj.value)
            setBreed(obj.value);
          }}
        />
        {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text>Dog Age (years)</Text>
        <TextInput
          style={styles.boxstyle}
          keyboardType='numeric'
          value={dogAge}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setDogAge(numericText);
          }}
          placeholder=""
        />
      </View>

      <View style={styles.btn}>
        <Button title="Upload Image" onPress={pickImage} color="grey"/>
        {imageName !== '' && <Text>{imageName}</Text>}
      </View>
      <View style={styles.navContainer}>
        <View style={styles.btn}>
          <Button onPress={() => router.back()} title="Back" color="#2C2C2C" />
        </View>
        <View style={styles.btn} >
          <Button onPress={handleSubmit} title="Add" color="#2C2C2C" />
        </View>
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
  navContainer: {
    paddingTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  dropdown: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});

// const pickerSelectStyles = StyleSheet.create({
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     color: 'black',
//   },
//   viewContainer: {
//     height: 40,
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginTop: 5,
//     marginBottom: 5,
//     justifyContent: 'center',
//   },
// });