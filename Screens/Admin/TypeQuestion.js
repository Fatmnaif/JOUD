import { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
 
export default function TypeOfQuestion({navigation}) {
   
 return (
   <View style={styles.container}>
 
 <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle} />
        <View style={styles.rectangle2} />
        <View style={styles.rectangle3} />
      </View>
      <View style={styles.baseTop} />
      <TouchableOpacity  onPress={()=>navigation.goBack()} >
      <Image style={styles.Back_icon}
         source= {require('../../../assets/Backicon.png')}/>  
     </TouchableOpacity>
              <Text style={styles.pagetitle}> نوع السؤال </Text>
              <Text style={styles.note}> يمكنك إختيار نوع السؤال المُراد للانتقال لإضافته </Text>
             
              <View style={styles.Question}>
      <TouchableOpacity onPress={()=>{navigation.navigate("AddMcq")}}>
        <Text style={styles.textstyle2}>إختيار من متعدد</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.Videos}>
      <TouchableOpacity onPress={()=>{navigation.navigate("AddTFq")}}>
        <Text style={styles.textstyle3}>صح وخطأ</Text> 
        </TouchableOpacity>
      </View>
    
   </View>
);
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'},
 
  iconStyle: {
    width: 20,
    height: 20,
    right:250},
 
  pagetitle:{
    //left:0.5,
    left:210,
    fontSize:25,
    color:'rgba(76, 87, 133, 1)',
    bottom:360},
 
  note:{
    left:85,
    fontSize:16,
    color:'rgba(76, 87, 133, 1)',
    bottom:340,
    fontWeight:"500"},
  rectanglesContainer: {
    bottom: 133,
    left: 173,
    justifyContent: 'center',
    transform: [{ rotate: "90deg" }],
  },

  rectangle: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(187, 206, 219, 0.54)"
  },

  rectangle2: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(111, 151, 177, 1)"
  },

  rectangle3: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(76, 87, 133, 1)"
  },

  baseTop: {
    borderBottomWidth: 15,
    borderBottomColor: "rgba(76, 87, 133, 1)",
    borderLeftWidth: 20.5,
    borderLeftColor: "transparent",
    borderRightWidth: 20.5,
    borderRightColor: "transparent",
    transform: [{ rotate: "-90deg" }],
    left: 322,
    top: 95,
    position: "absolute",
  },
  Back_icon:{
    position: 'absolute',
    left: -180.47,
    width:25,
    height:20,
    top: -96.78,
  },
 
  buttonContainer:{
    width:'90%',
    alignItems:'center',
    padding:2,
    bottom:130,
    left:20},
 
  button:{
    backgroundColor:'rgba(76, 87, 133, 1)',
    margin:20,
    width:'50%',
    padding:2,
    borderRadius:50},
 
 button2:{
    backgroundColor:'rgba(76, 87, 133, 1)',
    width:'50%',
    padding:2,
    borderRadius:50},
 
  buttonText:{
    color:'white',
    padding:20,
    bottom:10,
    fontSize:18,
    paddingBottom:10,    
    fontWeight:'500',
    textAlign:'center'},

    Question:{
      backgroundColor:'#6F96B3',
      width: 224,
     height: 58,
      borderRadius:100,
      position: 'absolute',
      left: 100,
      top: 360.35,},
  
   Videos:{
      backgroundColor:'#6F96B3',
      width: 224,
      height: 58,
      borderRadius:100,
      position: 'absolute',
      left: 100,
      top: 460.35,},
      textstyle2:{
        width:224,
        height:26,
        fontSize:20,
        color:'#fff',
        textAlign:'center',
        top:'40.57%'},
    
     textstyle3:{
        width:224,
        height:26,
        fontSize:20,
        color:'#fff',
        textAlign:'center',
        top:'40.57%'},
        Back_icon:{
          position: 'absolute',
          left: 30.47,
          width:25,
          height:20,
          top: -352.78,
        },
     });
 
 

