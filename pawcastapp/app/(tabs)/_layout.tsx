import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#ffd33d"
  }}>
    <Tabs.Screen name="index" 
    options = {{headerTitle: "Pawcast"}}
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
