import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  FlatList,
  Platform, StyleSheet, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import appstyle from "../assets/css/appstyle";
import { useNavigation } from "@react-navigation/native";


const { height, width } = Dimensions.get('window');



const Welcomescreen = () => {

const navigation = useNavigation()



const featurenav = () => {

  navigation.navigate('feature')

}

  return (
    <View style={appstyle.welcomeview}>

      <View >
        <View style={{ marginBottom: 10}}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: "bold", color: "gray" }}> JARVIS </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "500", letterSpacing: 1.5 }}> The Future is Here, Powered by AI</Text>
        </View>
      </View>

      <View style={appstyle.botimage}>
        <Image source={require("../assets/images/welcome.png")} style={{ width: width * 0.8, height: height * 0.4 }} />
      </View>

      <TouchableOpacity onPressOut={featurenav}>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor: "rgb(5,150,105)", padding: 5, width: width * 0.65, height: height * 0.05, borderRadius:10}}>
          <Text style={{color: 'white', fontWeight: "bold", fontSize: 15 }}> Get Started </Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

export default Welcomescreen;
