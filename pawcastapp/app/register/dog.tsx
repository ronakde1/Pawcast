import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

export default function DogDetails() {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: "/register/dog",
      params: { },
    });
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/(tabs)",
      params: {  }
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
        <TextInput
          style={styles.boxstyle}
          value={breed}
          onChangeText={setBreed}
          placeholder=""
        />
      </View>

      <Button onPress={handleNext} title="Next" color="#841584" />
      <Button onPress={handleSubmit} title="Register" color="#841584" />
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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
});
