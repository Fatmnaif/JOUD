import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getFirestore, onSnapshot,collection, getDocs ,query,where, doc, getDoc} from 'firebase/firestore';
import {db,authentication} from '../../config_firebase/firebase'


export default function login({navigation}) {
  const [Login,setLogin]=useState(false);
  let Admin;
  let Players;
 
  //text input states
  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
  const [secureEntry,setsecureEntry]=useState(true);
  

  const loginuser=async()=>{
    if(Email.length!=0 && Password.length!=0)
    {
    signInWithEmailAndPassword(authentication,Email,Password).then(async()=>{
      setLogin(true);

      const user=authentication.currentUser;
     
      await getDoc(doc(db, "Admin",user.uid)).then((doc)=>{
        Admin=(doc.get('email'));
        })

      await getDoc(doc(db, "player",user.uid)).then((doc)=>{
        Players=(doc.get('email'));
        })
        
      //  console.log('player:',players)
    
    if(Players==Email){
        navigation.navigate('player_navigator')
   }
   else if(Admin==Email) { 
    navigation.navigate('admin_navigator')
      }
    }).catch((error)=>{
      Alert.alert('الرجاء التاكد من البيانات المدخلة');})
   }
   else 
   Alert.alert(" الرجاء ادخال كافة البيانات ")}

  return (
    <View style={styles.container}>
     
      <Image style={styles.line}
          source= {require('../../../assets/line.png')}/>

      <Image style={styles.joud}
          source= {require('../../../assets/Joud2.png')}/>

      <Text style={styles.text1} >جود</Text>
      <Text style={styles.text2}>يرجى تسجيل الدخول</Text>
      <Text style={styles.text5}>مرحبا!</Text>
     
      <Text style={styles.text3}>البريد الألكتروني</Text>
      <TextInput style={styles.textInput1} placeholder={'exampl@example.com'} value={Email} onChangeText={text=>setEmail(text)}/>
      <View style={styles.line1}></View>

      <MaterialCommunityIcons style={styles.emailicon} name="email-outline"  size={18}/>  

      <Text style={styles.text4}> كلمة المرور </Text>
      <TextInput  secureTextEntry={secureEntry} style={styles.textInput2} placeholder={'*********'} value={Password} onChangeText={text=>setPassword(text)}/>
     
      <TouchableOpacity onPress={()=> {setsecureEntry((prev)=> !prev);}}>
      {secureEntry?
      <MaterialCommunityIcons style={styles.show} name="eye-outline"  size={18}/>   
      :
      <MaterialCommunityIcons style={styles.show} name="eye-off-outline"  size={18}/>  
      }
      </TouchableOpacity> 
      
      <View style={styles.line2}></View>
      
      <TouchableOpacity style={styles.nextlogin} onPress={loginuser}> 
          <Text style={styles.login}>تسجيل الدخول </Text>
       </TouchableOpacity>


       <Text style={styles.Color}>لم يسبق لك التسجيل ؟</Text>

      <TouchableOpacity style={styles.next} onPress={()=>navigation.navigate('signup')}> 
      <Text style={styles.text6}> تسجيل جديد</Text>
      </TouchableOpacity>
         

      <TouchableOpacity style={styles.next} onPress={()=>navigation.navigate('forget_password')}> 
      <Text style={styles.text7}>  نسيت كلمة المرور </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    backgroundColor:'white',
    width:500,
    height:900},

  line:{
      position: 'absolute',
      width: 370,
      height: 105,
      left:0,
      top:170},

  joud:{
      width:150.46,
      height:260.51,
      top:60},

  text1:{
      color:'#AAC3E3',
      fontSize:80,
      fontWeight:'bold',
      top:-90,
      left:170},

 text2:{
     color:'#4C5784',
     fontSize:17,
     top:-9,
     left:240},

  text3:{
      color:'#4C5784',
      fontSize:17,
      top:-10,
      left:270},

  text4:{
        color:'#4C5784',
        fontSize:17,
        top:40,
        left:300},
  text5:{
          color:'#4C5784',
          fontSize:17,
          top:-80,
          left:290,
          fontWeight:'bold',
          fontSize:35,
          color:'#6F96B3'},
  emailicon:{
    color:'#4C5784', 
    top:-14,
    left:80.5 },     
  line1:{
    width:290,
    height:0,
    top:14,
    left:70,
    borderRadius:100,
    borderColor:'#B7DFD7',
    borderWidth:1},

  line2:{
      width:290,
      height:0,
      top:54,
      left:70,
      borderRadius:100,
      borderColor:'#B7DFD7',
      borderWidth:1},

  textInput1:{
    left:120,
    top:5,
    width:190,
    height:20,
    alignItems:'center'
  },
  textInput2:{
    left:180,
    top:60,
    width:190,
    height:20,
    alignItems:'center'
  },
  nextlogin:{
    backgroundColor:'#AFD1CB',
     position: 'absolute',
     width: 224,
     height: 58,
     left: 100,
     top: 678,
     borderRadius:33,},

  login:{
    fontSize:18,
    left:54,
    top:15,
    color:'white'},

  next:{
    position: 'absolute',
    width: 224,
    height: 58,
    left: 145,
    top: 720,},
 Color:{
    color:'#636363',
    left:190,
    top:185,
    fontSize:15,
  },
  show:{
    top:40,
    color:'#4C5784', 
    left:80.50,
    height:20,
    width:20,
  },
  text6:{
    color:'#4C5784',
    left:-40,
    top:26,
    fontSize:15,
  },

  text7:{
    color:'#4C5784',
    left:20,
    top:55,
    fontSize:15,
  },
});