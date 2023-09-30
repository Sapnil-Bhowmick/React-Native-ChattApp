import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({

    textdes : {
        color : "red"
    } ,

    welcomeview: {
        backgroundColor:"#fff",
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        flex:1,
       

    } , 

    botimage : {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:Dimensions.get('window').height * 0.15
       
    },

})