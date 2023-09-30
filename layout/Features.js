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


const Features = () => {

const navigation = useNavigation()

    const gotohome = () => {
        navigation.push('home')
    }


    return (
        <View style={{ padding: 20 }}>

            <View style={{ paddingVertical: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: 'rgb(115,115,115)' }}>Features</Text>
            </View>


            <View style={{ padding: 15, backgroundColor: 'rgb(167,243,208)', borderRadius: 12 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/chatgptIcon.png')} style={{ width: width * 0.1, height: height * 0.05 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> ChatGPT </Text>
                </View>
                <View style={{ marginTop: 7 }}>
                    <Text style={{ fontWeight: '400', color: 'rgb(55,65,81)' }}>ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.</Text>
                </View>

            </View>

            <View style={{ padding: 15, backgroundColor: 'rgb(233,213,255)', borderRadius: 12, marginVertical: 12 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/dalleIcon.png')} style={{ width: width * 0.1, height: height * 0.05 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> DALL-E </Text>
                </View>
                <View style={{ marginTop: 7 }}>
                    <Text style={{ fontWeight: '400', color: 'rgb(55,65,81)' }}>DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.</Text>
                </View>

            </View>

            <View style={{ padding: 15, backgroundColor: 'rgb(254,205,211)', borderRadius: 12 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../assets/images/smartaiIcon.png')} style={{ width: width * 0.1, height: height * 0.05 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Smart AI </Text>
                </View>
                <View style={{ marginTop: 7 }}>
                    <Text style={{ fontWeight: '400', color: 'rgb(55,65,81)' }}>A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.</Text>
                </View>

            </View>


            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:10}}>
                <TouchableOpacity onPress={gotohome}>
                    <Image
                        source={require("../assets/images/arrow.png")}
                        style={{ height: 40, width: 40 }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Features;
