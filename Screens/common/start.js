import React from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';

export default function Navigator_Bar({ navigation }) {
  return (
    <View style={styles.container}>
      
    
      <Image style={styles.firstc}
          source= {require('../../../assets/firstc.png')}/>
     
      <Image style={styles.srcondc}
          source= {require('../../../assets/srcondc.png')}/>
      
      <Image style={styles.joud}
          source= {require('../../../assets/Joud.png')}/>
      
      <Text style={styles.text1}>  مرحبا بك !</Text>
      <Text style={styles.text2}>  في لعبة جود </Text>
      <Text style={styles.text3} > بإشراف عمادة ضمن الجودة و الاعتماد الأكاديمي </Text>
      <Text style={styles.text4}>بجامعة الاميرة نورة بنت عبدالرحمن </Text>
     
      <TouchableOpacity style={styles.nextlogin} onPress={()=>navigation.navigate('login') }> 
          <Text style={styles.login}>تسجيل الدخول </Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.nextsignup} onPress={()=>navigation.navigate('signup') }> 
          <Text style={styles.signup}> تسجيل جديد </Text>
       </TouchableOpacity>
         
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    width:500,
    height:900},
    
  nextlogin:{
    backgroundColor:'#6F97B1',
     position: 'absolute',
     width: 224,
     height: 58,
     left: 96,
     top: 540,
     borderRadius:33,},

  login:{
    fontSize:18,
    left:54,
    top:15,
    color:'white'},

  nextsignup:{
    backgroundColor:'#AFD1CB',
     position: 'absolute',
     width: 224,
     height: 58,
     left: 96,
     top: 640,
     borderRadius:33,},

  signup:{
    fontSize:18,
    left:63,
    top:15,
    color:'white'
  },

  firstc:{
    position: 'absolute',
    width: 220.88,
    height: 230.41,
    top:180,
    left:200,
    transform:[{rotate:'-10deg'}]},

  srcondc:{
    width: 200.88,
    height: 240.41,
    top:67,
    left:70,
    transform:[{rotate:'-13deg'}]
  },
  joud:{
    position: 'absolute',
    width: 200,
    height: 320,
    left: -80,
    top: 160, },

  text1:{
    position: 'absolute',
    left: 244,
    right: -16.53,
    top: 278,
    color:'#6F97B1',
    fontSize:22,
    fontWeight:'bold'},

    text2:{
      position: 'absolute',
      left: 166,
      top: 320,
      color:'#AFD1CB',
      fontSize:22,
      fontWeight:'bold'},

    text3:{
      position: 'absolute',
      left: 46,
      top: 440,
      color:'#7D7C7C',
      fontSize:18,},

    text4:{
      position: 'absolute',
      left: 90,
      top: 470,
      color:'#7D7C7C',
      fontSize:18,} });
