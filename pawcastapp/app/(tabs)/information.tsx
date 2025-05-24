import { Text, View, Image, StyleSheet } from "react-native";
import {Link} from "expo-router"
import {styles} from "./index"

export default function information() {
  return (
    <View style={styles.container}>
      {/*<Image style={styles.image} source = {require("../assets/images/Husky.png")} />*/}
      <Text style={{ color: 'red' }}>Information</Text>
      <Link href={"/"}>Go to home screen</Link>
      <Link href={"/details"}>Go to details </Link>

  </View>

  );
}