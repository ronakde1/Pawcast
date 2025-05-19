import { Text, View, Image, StyleSheet } from "react-native";
import {Link} from "expo-router"
import {styles} from "./index"

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'red' }}>Hello</Text>
      <Link href={"/"}>Go to home screen</Link>
      {<Link href={"/information"}>Go to information</Link>}
      <Link href={"/welcome"}>Go to welcome </Link>
  </View>

  );
}
