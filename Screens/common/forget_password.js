import React,{useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Alert} from 'react-native';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import {authentication} from '../../config_firebase/firebase';

export default function Reset_password({navigation}) {

  const [Email,setEmail]=useState('');
  const auth = getAuth();

  function restpassword(){
  sendPasswordResetEmail(auth, Email)
  .then(() => {
    Alert.alert("تم ارسال طلب إعادة تعيين كلمة السر  إلى بريدك الالكتروني")
  })
  .catch((error) => {
    Alert.alert("تعذر إرسال طلب إعادة تعيين كلمة السر الرجاء التحقق من البريد المدخل ")
  });
  }
  
  return (
    <View  style={{ flex: 1, backgroundColor: "#FFFFFF" }}>


        
       
       <View style={styles.password_new}>
        <Text style={styles.pass_new}>الايميل    </Text>
        <TextInput style={styles.textInput2} placeholder={'example@example.com'} value={Email} onChangeText={text=>setEmail(text)}/>
        </View>
  


       <View style={styles.update}>
      <TouchableOpacity onPress={restpassword}>
        <Text style={styles.textstyle1}>ارسل </Text> 
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  password_old:{
    width:330,
    height:0,
    top:340,
    left:50,
    borderRadius:100,
    borderColor:'#B7DFD7',
    borderWidth:1
  },
  
  pass_old:{
    position: 'absolute',
    left: 212,
    top: -27.85,
    color:'#4C5784',
    fontSize:17
  },
  textInput1:{
    position: 'absolute',
    left: 85.27,
    top: -25.85,
    fontSize:15,
    width:90},
 
    password_new:{
      width:330,
      height:0,
      top:410,
      left:50,
      borderRadius:100,
      borderColor:'#B7DFD7',
      borderWidth:1
    },
    
    pass_new:{
      position: 'absolute',
      left: 275.27,
      top: -27.85,
      color:'#4C5784',
      fontSize:17
    },
    textInput2:{
      position: 'absolute',
      left: 65.27,
      top: -25.85,
      fontSize:15,
      width:190},

    update:{
      backgroundColor:'#6F97B1',
      width: 224,
      height: 58,
      borderRadius:100,
      position: 'absolute',
      left: 100,
      top: 560.35,
    },
    textstyle1:{
      width:224,
      height:26,
      fontSize:20,
      color:'#fff',
      left:70,
      textAlign:'center',
      top:'40.57%',
      width:90}
});
