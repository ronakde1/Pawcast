import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

import ClickedScreen from './ClickedScreen'
import { Link } from 'expo-router';

const Stack = createNativeStackNavigator();

export default function DetailsScreen({ navigation }) {
  return (

        
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detailed Screen</Text>
      <Link
        href="/navigation/screens/ClickedScreen"
        style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}
      >
        Go to Clicked Screen Screen
      </Link>

      {/* Touchable icon */}

    </View>
  );
}
