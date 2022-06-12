

 import React from 'react';
 import { StyleSheet, Text,View,Image,TouchableOpacity } from 'react-native';
 
 export default function Users({navigation}){
   return (
     <View style={styles.container}>

      <View style={styles.rectangle} />
      <View style={styles.rectangle2} />
      <View style={styles.rectangle4} />
      <View style={styles.rectangle3} />
      <View style={styles.baseTop} />
 
       <Text style={styles.Userst}> المستخدمين  </Text>
   

       <View style={styles.Admin}>
       <TouchableOpacity onPress={()=>navigation.navigate('admin') }>
         <Text style={styles.textstyle1}>مشرفات اللعبة </Text> 
         </TouchableOpacity>
       </View>
       
       <Image style={styles.Admin_icon}
         source= {require('../../../assets/Joudc.png')}/>
 
       <View style={styles.Player}>
       <TouchableOpacity onPress={()=>navigation.navigate('player')}>
         <Text style={styles.textstyle2}>اللاعبات </Text>  
         </TouchableOpacity>
       </View>

       <Image style={styles.Player_icon}
         source= {require('../../../assets/Joudc.png')}/>

    <TouchableOpacity  onPress={()=>navigation.navigate('admin_home')} >
      <Image style={styles.Back_icon}
         source= {require('../../../assets/Backicon.png')}/>  
     </TouchableOpacity>
 </View>
   );
 }
 
 const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',},
   
   
       Userst:{
       color: '#4C5785',
       height:25,
       fontWeight:'700',
       fontSize:20,
       alignContent:'center',
       position: 'absolute',
       left: '18%',
       top: 109,
       left:190},
   
     Admin:{
       backgroundColor:'#6F96B3',
       width:200,
       height:58,
       borderRadius:100,
       position: 'absolute',
       left: '40.8%',
       top: '37.35%',},

     
     Player:{
       backgroundColor:'#6F96B3',
       width:200,
       height:58,
       borderRadius:100,
       position: 'absolute',
       left: '8.8%',
       bottom: ' 23.03%',},
   
    textstyle1:{
       width:224,
       height:26,
       fontSize:20,
       color:'#fff',
       textAlign:'center',
       top:'50.57%',
      left: -10},
   
   
    textstyle2:{
       width:224,
       height:26,
       fontSize:20,
       color:'#fff',
       textAlign:'center',
       top:'40.57%',
       left:-15},

     Admin_icon:{
       position: 'absolute',
       left:-2.47,
       width:180,
       height:280,
       top: 190,
     },
     Player_icon:{
       position: 'absolute',
       left: 220.47,
       width:180,
       height:280,
       top: 470.78,
     },
     Back_icon:{
       position: 'absolute',
       left: 30.47,
       width:25,
       height:20,
       top: -30.78,
     },
     rectangle:{
     color:'#BBCEDB',
     left:40,
     top:50,
     width: 10 * 2,
     height: 20,
     },
     rectangle2: {
      width: 30,
      height: 40,
      top:80,
      left:360,
      backgroundColor: "rgba(111, 151, 177, 1)",
    },
    rectangle4: {
      width: 30,
      height: 40,
      top:40,
      left:390,
      backgroundColor: "#BBCEDB",
    },

    rectangle3: {
      width: 30,
      height: 40,
      top:0,
      left:330,
      backgroundColor: "rgba(76, 87, 133, 1)",
    },
    baseTop: {
      borderBottomWidth: 15,
      borderBottomColor: "rgba(76, 87, 133, 1)",
      borderLeftWidth: 20.5,
      borderLeftColor: "transparent",
      borderRightWidth: 20.5,
      borderRightColor: "transparent",
      transform: [{ rotate: "-90deg" }],
      left: 302,
      top: 113,
      position: "absolute",
    },
     });
 