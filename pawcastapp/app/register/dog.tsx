import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRegistration, Dog } from './registrationContext';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DogDetails() {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [dogAge, setDogAge] = useState('');
  const [dogImageUri, setDogImageUri] = useState('');
  const [imageName, setImageName] = useState<string>('');
  const { setData } = useRegistration();
  const router = useRouter();

  const breedsList = [
    { label: 'Husky', value: 'husky' },
    { label: 'Labrador', value: 'labrador' },
    { label: 'Shiba Inu', value: 'shiba' },
    { label: 'Golden Retriver', value: 'retriever' },
    { label: 'Poodle', value: 'poodle' },
  ]

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const img = result.assets[0]
      setDogImageUri(img.uri);
      setImageName(img.fileName ?? '');
    }
  };

  const handleAddMore = () => {
    const newDog: Dog = {
      name: dogName,
      breed: breed,
      age: Number(dogAge),
      imageUri: dogImageUri,
    };

    setData(prev => ({
      ...prev,
      dogs: [...prev.dogs, newDog],
    }));

    router.push({
      pathname: "/register/dog"
    });
  };

  const handleSubmit = async () => {
    const newDog: Dog = {
      name: dogName,
      breed: breed,
      age: Number(dogAge),
      imageUri: dogImageUri,
    };

    setData(prev => {
      const updated = {
        ...prev,
        dogs: [...prev.dogs, newDog],
      };

      // Save updated data to AsyncStorage to use after registration
      AsyncStorage.setItem('userData', JSON.stringify(updated)).catch(err => {
        console.error('Failed to save to AsyncStorage:', err);
      });

      return updated;
    });
    
    router.push({
      pathname: "/(tabs)",
    })
  }

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
          <Button onPress={handleAddMore} title="Add more" color="#2C2C2C" />
        </View>
        <View style={styles.btn} >
          <Button onPress={handleSubmit} title="Register" color="#2C2C2C" />
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