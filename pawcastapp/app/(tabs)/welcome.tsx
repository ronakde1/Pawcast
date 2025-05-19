import { Text, View, Image, StyleSheet } from "react-native";
import {Link} from "expo-router"
import {styles} from "./index"
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function welcome() {
  return (
    <View style={styles.container}>
      {/*<Image style={styles.image} source = {require("../assets/images/Husky.png")} />*/}
      <Text style={{ color: 'red' }}>Welcome</Text>
      <Link href={"/"}>Go to home screen</Link>
      <Link href={"/information"}>Go to information </Link>
      <Link href={"/details"}>Go to details </Link>

  </View>

  );
}