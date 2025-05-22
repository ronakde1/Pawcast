import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#ffd33d"
  }}>
    <Tabs.Screen name="index" 
      options = {{
        headerTitle: "Pawcast",
        headerShown: false, 
        tabBarIcon: ({focused, color}) => 
        <Ionicons 
        name = {focused? "home-sharp": "home-outline"} 
        size = {30}
        color = {color}
        />
      }}
    />
    <Tabs.Screen name="details" 
    options = {{headerTitle: "Details",
      tabBarIcon: ({focused, color}) => 
        <Ionicons 
        name = {focused? "ellipsis-vertical-circle-sharp": "ellipsis-vertical-circle-outline"} 
        size = {30}
        color = {color}
        />


    }}
    />
    <Tabs.Screen name="information" 
    options = {{headerTitle: "Information", 
      tabBarIcon: ({focused, color}) => 
        <Ionicons 
        name = {focused? "information-circle-sharp": "information-circle-outline"} 
        size = {30}
        color = {color}
        />

    }}
    />
    <Tabs.Screen name="register" 
     options = {{headerTitle: "register", 
      tabBarIcon: ({focused, color}) => 
        <Ionicons 
        name = {focused? "document-sharp": "document-outline"} 
        size = {30}
        color = {color}
        />
    }}
    />
    <Tabs.Screen name="weather" 
    options={{
      tabBarStyle: { display: 'none' },
      tabBarButton: (props) => null,
    }}/>
</Tabs>;
}
