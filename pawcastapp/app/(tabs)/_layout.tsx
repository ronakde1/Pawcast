import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#ffd33d",
    tabBarStyle:{backgroundColor: "#25292e"}
  }}>
    <Tabs.Screen name="index" 
      options = {{
        headerTitle: "Pawcast",
        headerShown: false, 
        tabBarIcon: ({focused, color}) => 
        <Ionicons 
        name = {focused? "home-sharp": "home-outline"} 
        size = {30}
        />
      }}
    />
    <Tabs.Screen name="details" 
    options = {{headerTitle: "Details"}}
    />
    <Tabs.Screen name="information" 
    options = {{headerTitle: "Information"}}
    />
    <Tabs.Screen name="register" 
    options = {{headerTitle: "register"}}
    />
</Tabs>;
}
