import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, ScrollView, Text, Alert, TouchableOpacity, Image, TextInput }  from 'react-native';
import { Video  } from 'expo-av';
import React,{Component, useState,useLayoutEffect, useEffect} from 'react';
import { collection,  setDoc, getDocs } from "firebase/firestore"; 
import { db,authentication } from '../../config_firebase/firebase';
import { AntDesign } from '@expo/vector-icons';
 
export default function ListVideo() {
  const [VideoList, setVideoList] = useState([]);
  const [status, setStatus] = React.useState({});
  const [filtered, setFiltered] = useState([])
  const [searching, setSearching] = useState(false)
  const video = React.useRef(null);
 
 
  async function getVideo() {
    const VideoCol = collection(db, "Video");
    const VideoSnapshot = await getDocs(VideoCol);
    setVideoList(VideoSnapshot.docs.map((doc) => (
      {
        videotitle: doc.data().videotitle,
        videoURL: doc.data().videoURL,
        videodescription: doc.data().videodescription,
        ID:doc.id,
      })))
   
    };
 
  useEffect(() => {
    getVideo()
  }, [])
 
 
  return (
 
    <View style={styles.container} >
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle} />
        <View style={styles.rectangle2} />
        <View style={styles.rectangle3} />
      </View>
      <View style={styles.baseTop} />
 
     {/* <TouchableOpacity  onPress={()=>navigation.navigate('admin_home')} >
      <Image style={styles.Back_icon}
         source= {require('./assets/Backicon.png')}/>  
  </TouchableOpacity>*/}
 
      <Text style={styles.pagetitle}> دقيقة مع جود  </Text>
     
      <View style={styles.VideoContainer1}>
        <ScrollView >
  <View>
        {VideoList.map((element1) => {
            return (
              <View style={styles.VideoContainer2} key={element1.ID}>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{ uri: element1.videoURL }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={setStatus}
                />
 
                <Text style={{ textAlign: 'center', color: '#4C5785', fontSize: 18, fontWeight: 'bold' }}> {element1.videotitle} </Text>
                <Text style={{ textAlign: 'center', color: '#4C5785', fontSize: 16, }} > {element1.videodescription} </Text>
               
                <StatusBar style="auto" />
              </View>
 
            )})}
</View>
 
        </ScrollView>
      </View>
    </View>
 
  );
}
 
const styles = StyleSheet.create({
 
container: {
    flex: 1,
//    top: ,
    height: 880,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',},
 
pagetitle: {
    //left:0.5,
    left: 60,
    fontSize: 25,
    color: 'rgba(76, 87, 133, 1)',
    bottom: 61},
 
video: {
    justifyContent: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 0,
    marginRight: 0,
    height: 190, },
 
buttons: {
    margin: 16},
 
VideoContainer1: {
    borderColor: '#6F97B1',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    width: '90%',
    height: '70%',
    margin: 19,
    padding: 20,
    bottom: 35},
 
VideoContainer2: {
    borderColor: '#6F97B1',
    backgroundColor: '#E8F0F4',
    padding: 12,
    borderWidth: 1,
    margin: 5,
    borderRadius: 30,},
 
circle: {
    position: 'absolute',
    left: 340,
    bottom: 105,
    height: 41,
    width: 41,
    borderRadius: 30,
    borderColor: '#6F97B1',
    borderWidth: 2},
 
plusicon: {
    left: 6,
    bottom: -6.33,
    width: 25,
    height: 25},
 
rectanglesContainer: {
    bottom: 10,
    left: 173,
    justifyContent: 'center',
    transform: [{ rotate: "90deg" }],},
 
rectangle: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(187, 206, 219, 0.54)"},
 
rectangle2: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(111, 151, 177, 1)"},
 
rectangle3: {
    width: 20 * 2,
    height: 20,
    backgroundColor: "rgba(76, 87, 133, 1)"},
 
baseTop: {
    borderBottomWidth: 15,
    borderBottomColor: "rgba(76, 87, 133, 1)",
    borderLeftWidth: 20.5,
    borderLeftColor: "transparent",
    borderRightWidth: 20.5,
    borderRightColor: "transparent",
    transform: [{ rotate: "-90deg" }],
    left: 322,
    top: 66,
    position: "absolute",},
 
Back_icon:{
    position: 'absolute',
    left: -180.47,
    width:25,
    height:20,
    top: -96.78, },
 
textInput:{
    position: 'absolute',
    right:-140,
    bottom:50,
    fontSize: 13,
    height: 39,
    width:300,
    color: '#4C5785',
    backgroundColor:'#fff',
    borderColor:'#6F97B1',
    borderWidth:1,
    borderRadius:33,
    textAlign:'center'},
 
saerchicon:{
    bottom:60,
    left:115},
});
 


