import React from 'expo-status-bar';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';




export default function Navigator_Bar({ navigation }) {

  const Progress=({step,steps})=>{
  
    return(
      <>
         <Text style={styles.text}>
           {step}/{steps}
         </Text>
         <View style={styles.progressBar}>
  
         <View
         style={{
         backgroundColor: '#6F97B1',
         borderRadius:30,
         width: 320,
         height: 26,}}/>
  
         </View>
         <TouchableOpacity style={styles.nextlogin} onPress={()=>navigation.navigate('start') }> 
         <Text style={styles.text1}> تحميل ....</Text>
         </TouchableOpacity>
      </>
    )}
  return (
    <View style={styles.container}>

          <Image style={styles.Splash_Background}
          source= {require('../../../assets/Splash_Background.png')}/>
          <Progress step={1} steps={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container:{
  backgroundColor:'#D9E8F1',
  width:500,
  height:900,},
  
  Splash_Background:{
    width:500,
    height:900,
    top:25,},

  next:{
  top:-180,
  left:140,},

  progressBar: {
    height: 30,
    flexDirection: "row",
    left:50,
    top:-250,
    width: 320,
    backgroundColor: 'white',
    borderColor: '#6F97B1',
    borderWidth: 2,
    borderRadius: 30,
    overflow:'hidden'
  },
  text:{
    left:56,
    top:-255,
    color: '#6F97B1',
    fontSize:16
  },
  text1:{
    left:157,
    top:-240,
    color: '#6F97B1',
    fontSize:25
  }
});
