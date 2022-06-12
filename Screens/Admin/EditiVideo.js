 
import React ,{useState, useEffect} from 'react';
import { StyleSheet,Alert,Image,TextInput,TouchableOpacity,Text, View, ScrollView} from 'react-native';
import {setDoc ,doc,collection,updateDoc, firestore, getDoc, deleteDoc,get} from 'firebase/firestore';
import { db } from '../../config_firebase/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video } from 'expo-av';
import { async } from '@firebase/util';
 
 
export default function EditVideo({navigation,route}) {
  const { id } = route.params;
  const[NewTitle,setnewTitle]=useState('');
  const[Newdescreption,setnewDescreption]=useState('');
  const[status, setStatus]=useState('');
  const[videodescription,setVideodescription]=useState('');
  const[videotitle,setVideotitle]= useState('');
  const[videoURL,setVideoURL]= useState('');


  function EditVideo (id){
    if(NewTitle!='' || Newdescreption!=''){
    updateDoc(doc(db, "Video",id),{
      videotitle:NewTitle,
      videodescription:Newdescreption,
 
    }),{merge:true}
    Alert.alert('تم تعديل بنجاح')
  }
  ;

}

  function DeleteVideo (id){
      deleteDoc(doc(db, "Video", id))
       .then(() => {
         alert("تم حذف الفديو بنجاح")
       })
       .catch((error) => {
         alert(error.message)
       })
     }
 
  useEffect(() => {
      getVideo()
        }, [])
   
 
  async function getVideo(){
    const docRef = doc(db, "Video", id);
    const docSnap = await getDoc(docRef);
     setVideoURL(docSnap.data().videoURL);
     setVideotitle(docSnap.data().videotitle);
     setVideodescription(docSnap.data().videodescription);
      };
 
 
      return(
        // <ScrollView>
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

        <Text style={styles.Pagtitle}> تعديل الفيديو </Text>
        <Text style={styles.Note}>أدناه يمكنك تعديل على وصف وعنوان الفديو </Text>
        <Text style={styles.title1}> العنوان :</Text>
        <Text style={styles.title2}>  الوصف :</Text>
 
        <View style={styles.board}>
               <Video
                style={{width:200,height:250}}
                source={{uri:videoURL}}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />              
        </View>
 
              <TextInput
                placeholder={videotitle}
                onChangeText={(NewTitle)=>setnewTitle(NewTitle)}
                value={NewTitle}
                style={styles.input}
              />
              <TextInput
                placeholder={videodescription}
                onChangeText={(Newdescreption) => setnewDescreption(Newdescreption)}
                value={Newdescreption}
                style={styles.input2}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>{EditVideo(id)}}
                      style={styles.button}>
                <Text style={styles.buttonText}>تعديل</Text>
                </TouchableOpacity>
 
                <TouchableOpacity onPress={()=>{Alert.alert(
                      "حذف",
                      "هل تريدين حذف هذا الفديو؟",
                [{
                      text: "لا",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"},
                    { text: "نعم", onPress: () => {DeleteVideo(id)} }]
                );}}
                      style={styles.button2}>
              <Text  style={styles.buttonText}>حذف</Text>
                </TouchableOpacity>
              </View>
 
            </View>
            // {/* </ScrollView> */}
 
);}
 
   const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      height:1105
    },
    Pagtitle:{
      color: '#4C5785',
      height:25,
      fontWeight:'700',
      fontSize:20,
      alignContent:'center',
      position: 'absolute',
      left:220,
      top: 75,
      bottom: '87.44%',},
   
    Note:{
      color: '#4C5785',
      height:25,
      fontWeight:'700',
      fontSize:15,
      alignContent:'center',
      position: 'absolute',
      left: '30%',
      top: 130,
      bottom: '87.44%',},
      button1: {
        backgroundColor: '#ed2939',
        width:200,
        height:58,
        borderRadius:100,
        padding: 10,
        borderRadius: 50
      },
      
    title1:{
      left:308,
      fontSize:18,
      color:'rgba(76, 87, 133, 1)',
      top:475
    },
   
    title2:{
      left:300,
      fontSize:18,
      color:'rgba(76, 87, 133, 1)',
      top:545
    },
 
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
 
    rectanglesContainer:{
      top:290,
      left:175,
      justifyContent:'center',
      transform: [{ rotate: "90deg" }],},
     
    input:{
      height:39,
      marginTop:40,
      paddingHorizontal:15,
      left:65,
      top:88,
      width:290,
      borderRadius:10,
      borderColor:'rgba(187, 206, 219, 1)',
      borderWidth:1,
      textAlign:'right',},
      
      buttonText: {
        color: 'white',
        padding: 20,
        height:26,
        bottom: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
      },
    input2:{
      height:70,
      marginTop:40,
      paddingHorizontal:15,
      left:65,
      top:100,
      width:290,
      borderRadius:10,
      borderColor:'rgba(187, 206, 219, 1)',
      borderWidth:1,
      textAlign:'right',},
 
   
    baseTop: {
      borderBottomWidth: 15,
      borderBottomColor: "rgba(76, 87, 133, 1)",
      borderLeftWidth: 20.5,
      borderLeftColor: "transparent",
      borderRightWidth: 20.5,
      borderRightColor: "transparent",
      transform: [{ rotate: "-90deg" }],
      left: 324,
      top: 78.5,
      position: "absolute" },
   
    buttonContainer:{
      width:'60%',
      height:'40%',
      bottom:40,
      justifyContent:'center',
      alignItems:'center',
      left:85,
      },
   
    button:{
      backgroundColor:'rgba(76, 87, 133, 1)',
      width:200,
      height:58,
      margin:10,
      bottom:-90,
      borderRadius:50},
   
    button2:{
    backgroundColor: '#ed2939',
    width:200,
    height:58,
    borderRadius:100,
    padding: 10,
    borderRadius: 50,
    bottom:-90},
        
    buttonText2:{
      color:'white',
      bottom:5,
      fontSize:16,
      fontWeight:'700',
      textAlign:'center'},
   
    garbageicon:{
      position: 'relative',
      justifyContent:'center',
      left:10,
      width:20,
      color:'rgba(76, 87, 133, 1)',
      height:20,
      top: 12,
      borderRadius:10},
 
    board:{
      height:300,
      marginTop:40,
      padding:20,
      left:65,
      top:78,
      width:290,
      borderRadius:10,
      borderColor:'rgba(187, 206, 219, 1)',
      borderWidth:1,
      alignItems:'center'},

   Back_icon:{
   position: 'absolute',
         left: 30,
        width:25,
        height:20,
       top: 70,
    },
     
    });
     
     

