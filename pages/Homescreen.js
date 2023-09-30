import React, { useEffect, useState, useRef } from "react";
import Voice from '@react-native-community/voice';
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
    Platform, StyleSheet, TouchableWithoutFeedback, Dimensions, PermissionsAndroid
} from 'react-native';
import appstyle from "../assets/css/appstyle";
import { useNavigation } from "@react-navigation/native";
import Features from "../layout/Features";
import { chat, ChatgptApi, DalleAApi } from "../api/OpenAI";


const dummydata = [
    {
        role: 'assistant',
        content: 'Hello user! How can I help you today ?'
    },

]


const { height, width } = Dimensions.get('window');



const Homescreen = () => {

    const [message, setMessage] = useState(dummydata)
    const [recording, setRecording] = useState(false)
    const [speaking, setSpeaking] = useState(false)
    const [text, setText] = useState("")

    const navigation = useNavigation()

    const scrollViewref = useRef()
    // const gotomessage = () => {
    //     navigation.navigate('home')
    // }



    const requestAudioPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            console.log("results", PermissionsAndroid.RESULTS)

            if (PermissionsAndroid.RESULTS.GRANTED === granted) {
                console.log('You can use the audio');
            } else {
                console.log('Audio permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };





    const speech_start = e => {
        // setRecording(true)
        console.log("speech started")
    }

    const speech_end = e => {
        setRecording(false)
        console.log("speech ended")
    }

    const speech_result = e => {
        console.log("speech results: ", e)
    }

    const speech_error = e => {
        console.log("speech error: ", e)
    }

    const start_record = async () => {

        console.log('start record button pressed')
        setSpeaking(true)
        setRecording(true)

        try {
            console.log('try_blk')
            const resp = await Voice.start('en-US');
        }

        catch (err) {
            console.log('start record error', err)
        }

    }


    const stop_record = async () => {

        console.log('stop record button pressed')
        setRecording(false)
        setSpeaking(false)

        try {
            await Voice.stop();
            await Voice.destroy();
            // setRecording(false)
        }

        catch (err) {
            console.log('stop record error', err)
        }

    }

    // useEffect(() => {

    //         requestAudioPermission()

    //         Voice.onSpeechStart = speech_start;
    //         Voice.onSpeechEnd = speech_end;
    //         Voice.onSpeechResults = speech_result;
    //         Voice.onSpeechError = speech_error;



    //         setRecording(false)
    //         setSpeaking(false)
    //         requestAudioPermission()

    //         return () => {
    //             console.log('Destroys the current SpeechRecognizer instance')
    //             Voice.destroy().then(Voice.removeAllListeners);
    //         }

    //     }, [])




    // let msg_arr = []

    const user_message_list = async () => {



        console.log('prompt', text)

        const my_val = text.search('image')
        // ,'painting','Painting','Sketch','sketch','AI','ai','Model','model','Figure','figure','Drawing','drawing','Portrait','portrait'


        console.log(my_val)

        if (text.trim().length > 0 && my_val !== -1) {

            let temp_json = {
                role: 'user',
                content: text.trim()
            }



            console.log('images_text')
            const resp = await DalleAApi(text)

            updateScrollview()
            setMessage([...message, temp_json, resp])

        }

        else {

            console.log('text_text')



            let temp_json = {
                role: 'user',
                content: text.trim()
            }


            const resp = await ChatgptApi(text)

            updateScrollview()

            console.log('retmsg_arr', resp)
            setMessage([...message, temp_json, resp])

            console.log('message', message)


        }


    }

    const updateScrollview = () => [
        setTimeout(()=>{
            scrollViewref.current.scrollToEnd({animated: true})
        },2000)
    ]


    const clearmessage = () => {
        setMessage([])
    }


    const stopspeaking = () => {
        // Also stop the voice instance --- call the method using async / await
        setSpeaking(false)
        setRecording(false)
    }


    return (
        <View style={{ display: 'flex', flex: 1, backgroundColor: "#fff" }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Image source={require("../assets/images/bot.png")} style={{ width: width * 0.4, height: height * 0.2 }} />
            </View>


            {
                message.length > 0 ? (

                    <View style={{
                        marginVertical: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignSelf: 'center'
                        // alignItems: 'center'

                    }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: 'rgb(82,82,82)' }}>Assistant</Text>
                        </View>


                        <View style={{
                            backgroundColor: 'rgb(212,212,212)',
                            width: width * 0.9,
                            height: height * 0.6,
                            borderRadius: 20,
                           

                        }}>
                            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}  ref={scrollViewref}>

                                {
                                    message.map((data, index) => (

                                        data.role === 'assistant' ? (


                                            data.content.includes('https') ? (

                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 15 }} key={index}>

                                                    <View>

                                                        <Image
                                                            source={{ uri: data.content }}
                                                            resizeMode='contain'

                                                            style={{ width: width * 0.65, height: height * 0.3, borderRadius: 20 }}

                                                        />
                                                        {/* <Text>{data.content}</Text> */}
                                                    </View>

                                                </View>


                                            ) : (

                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 5, paddingHorizontal: 10 }} key={index}>

                                                    <View
                                                        style={{
                                                            backgroundColor: 'rgb(209,250,229)', width: width * 0.75, padding: 10,
                                                            borderBottomLeftRadius: 15,
                                                            borderBottomRightRadius: 15,
                                                            borderTopRightRadius: 15
                                                        }}>
                                                        <Text style={{ fontWeight: '500' }}>{data.content}</Text>
                                                    </View>

                                                </View>
                                            )



                                        ) : (

                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: 15 }} key={index}>

                                                <View
                                                    style={{
                                                        backgroundColor: '#fff', width: width * 0.6, padding: 10,
                                                        borderBottomLeftRadius: 15,
                                                        borderBottomRightRadius: 15,
                                                        borderTopLeftRadius: 15
                                                    }}>
                                                    <Text style={{ fontWeight: 'bold', color: 'rgb(82,82,82)' }}>{data.content}</Text>
                                                </View>

                                            </View>
                                        )



                                    ))

                                }




                            </ScrollView>

                            <View style={{
                                // display:'flex',
                                // flexDirection:'row',
                                marginHorizontal: 5,
                                height: 40,
                                margin: 12,
                                borderWidth: 2,
                                borderRadius: 8,
                                borderColor: '#777983',
                                backgroundColor: 'white',

                            }}>
                                <TextInput placeholder="Type here ..."
                                    multiline={true}
                                    placeholderTextColor='rgb(115,115,115)'
                                    value={text}
                                    onChangeText={(e) => setText(e)}
                                    style={{ padding: 5 }}
                                />

                                <TouchableOpacity onPress={user_message_list}>
                                    <Image source={require("../assets/images/arrow.png")}
                                        style={{ position: 'absolute', right: 3, width: 35, height: 35, bottom: 0.5 }}
                                    />
                                </TouchableOpacity>




                            </View>

                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',marginTop:10 }}>
                            <TouchableOpacity onPress={clearmessage}>
                                <Image
                                    source={require("../assets/images/bin.png")}
                                    style={{ height: 40, width: 40 }}
                                />
                            </TouchableOpacity>
                        </View>



                    </View >

                ) : (

                    <Features />
                )
            }


            {
                speaking ? (

                    <TouchableOpacity onPress={stopspeaking}
                        style={{ backgroundColor: 'rgb(253,164,175)', padding: 5, height: 30, width: 70, borderRadius: 20, position: 'absolute', left: 20, bottom: 30 }}>
                        <Text style={{ fontWeight: '500', textAlign: 'center' }}>Stop</Text>
                    </TouchableOpacity>
                ) : null
            }



            {
                recording ? (

                    // When recording started


                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={stop_record}>
                            <Image
                                source={require("../assets/images/voiceLoading.gif")}
                                style={{ height: 60, width: 60 }}
                            />
                        </TouchableOpacity>
                    </View>

                ) : (null

                    // when Recording ended

                    // <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    //     <TouchableOpacity onPress={clearmessage}>
                    //         <Image
                    //             source={require("../assets/images/bin.png")}
                    //             style={{ height: 40, width: 40 }}
                    //         />
                    //     </TouchableOpacity>
                    // </View>


                )
            }

            {/* {
                message.length > 0 && (

                    <TouchableOpacity onPress={clearmessage}
                        style={{ backgroundColor: 'rgb(214,211,209)', padding: 5, height: 30, width: 70, borderRadius: 20, position: 'absolute', right: 20, bottom: 30 }}>
                        <Text style={{ fontWeight: '500', textAlign: 'center' }}>Clear</Text>
                    </TouchableOpacity>
                )
            } */}







        </View >
    )
}

export default Homescreen;
