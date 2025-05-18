import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';





export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>Clicked Screen</Text>
      

      
      
        <Link
        href="/navigation/screens/DetailsScreen"
        style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        Go to Detailed Screen
        </Link>
      
    </View>

    
  );
}
