import React from 'react';
import { Text, View ,ImageBackground, StyleSheet} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MainContainer from './navigation/MainContainer';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => <MainContainer />;

/*
const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Hello</Text>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
/*
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
  */
