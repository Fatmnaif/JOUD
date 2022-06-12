import React, { Component, useState ,useEffect,useLayoutEffect} from "react";
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,ScrollView
} from "react-native";
import { db ,authentication} from "../../../config_firebase/firebase";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,where,arrayUnion,getDoc, addDoc,update} from "firebase/firestore"; 
import { useRoute } from '@react-navigation/native';

import joud from "../../../../assets/Joudicon.png";

export default function WaitingRoom({ navigation,route }) {
  const { Room_ID } = route.params;
  const IDToBeSent = Room_ID;
  
  const [writePlayers, setWritePlayers] = useState([]);
  const user = authentication.currentUser;
  const [players,setPlayers]= useState([]);

  useEffect(() => { 
    const q = query(collection(db, 'Game'),where('RoomID','==',Room_ID))
    const finish=  onSnapshot(q, (querySnapshot) => {
      setWritePlayers(querySnapshot.docs.map(doc =>({ ...doc.data(),
         id: doc.data().id,
         Player: doc.data().Players,
         Host: doc.data().Host,
         GameStatus:doc.data().GameStatus,
      
         }))
         )
       //  Alert.alert(writePlayers.GameStatus)
      })
  return finish;
    },[])
  
  useEffect(async()=> onSnapshot(doc(db,'Game',Room_ID),
  (snapshot)=>setPlayers(snapshot.data().Players)),[])
  
  
useEffect(() => {
   // Alert.alert(String(players.GameStatus))
   writePlayers.map((data) => {
if(data.GameStatus=='Started'){
  // Alert.alert(String(writePlayers.GameStatus))
  navigation.navigate('Game__', {IDToBeSent})
}

})
})

 
function determineHost(){
   let showButton = false ;
   let morethanone=false;
    writePlayers.map((data) => {

    if(data.Host==user.email){
showButton=true;
   
    }
  
  })
if(players.length>1){
  morethanone=true;
}
if(showButton){

    return <View>
     <TouchableOpacity  style={styles.buttonStyle} onPress={()=>{ if(morethanone){ navigation.navigate('Game__', {IDToBeSent})
          Update({
           'GameStatus':'Started'
         },true,'None',Room_ID)
       }else{Alert.alert('عدد اللاعبات غير كافي')}}}>
        <Text style={styles.Textofbutton}>  بدأ اللعبة </Text>
        </TouchableOpacity>
    <Text></Text>

      </View>
}  
     }

const Update= (value, merge,DocToBeUpdated,roomID)=>{

const Ref = doc(db, "Game",roomID);

if(DocToBeUpdated=='None'){
    setDoc(Ref,value,{merge:merge})
    .then(() => {
    })
    .catch((error) => {
      alert(error.message)
    })}


    else if(DocToBeUpdated=='Room'){
          const myDoc = doc(Ref,"Votes","Rooms");
          setDoc(myDoc,value,{merge:merge})
        .then(() => {
        //  alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message)
        })
    }

    else if(DocToBeUpdated=="Explorer"){
      const myDoc = doc(Ref,"Votes","Explorer");
      setDoc(myDoc,value,{merge:merge})
    .then(() => {
    //  alert("Document Updated")
    })
    .catch((error) => {
      alert(error.message)
    })
}

else if(DocToBeUpdated=="Answer"){
  const myDoc = doc(Ref,"Votes","Answer");
  setDoc(myDoc,value,{merge:merge})
.then(() => {
 // alert("Document Updated")
})
.catch((error) => {
  alert(error.message)
})
}

}
return (
  <View style={styles.container}>

<View style={styles.Players}> 
     <Text style={{marginBottom:20, fontSize: 20,textAlign:'center',fontWeight: "bold", fontStyle: "normal",color:'#4C5784'}}> اللاعبات المتواجدات ... </Text>
     {players.map((item) => {
return(
  <ScrollView> 
  <View style={styles.Playercontainer}>

   <Text style={styles.Player_name}> {item.Name}</Text>
    <Image style={styles.Joudicon}
    source= {joud}/>
 </View>
 </ScrollView> 
   )
     })
     }
     </View>
    
   <Text style={styles.copyText1} > اضغطي مطولا لنسخ الرمز ومشاركته </Text>
   <Text selectable={true} style={styles.copyText2}>{Room_ID}</Text>
   {/* <TouchableOpacity onPress={() => Clipboard.setString(Room_ID)}>
   <MaterialCommunityIcons name="copy" size={15} />
</TouchableOpacity> */}
<View style={styles.copyTextContainer}>
     
    </View>
    {/* <Button title={'إبدا اللعبة' } onPress={()=> navigation.navigate('game', {IDToBeSent}) } /> */}
    {determineHost()}
    <View>
   
     
    </View>
    
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex:1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:'#fff',
 
},
img:{
  width:'100%',
  height:'100%',
  top:'-20%',
},
buttonStyle:{
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  fontSize: 14,
  lineHeight: 26,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 2.3,
  position: "absolute",
  width: '55%',
  height: 55,
  top:270,
  bottom:20,
  // left:90,
  // right:10,
  borderRadius: 100,
  alignSelf: "center",
  position: "absolute",
  alignContent: "center",
  backgroundColor: "#6F97B1",
},

textstyle2:{
  position: 'absolute',
  left:10,
  right: 100.2,
  top: 55.42,
  bottom: 40.89,
  backgroundColor:'#AFD1CB',
  top: 2.17,
  bottom: 40.64,
  
  borderRadius:10},
  textstyle2:{
    position: 'absolute',
    left:10,
    right: 100.2,
    top: 55.42,
    bottom: 40.89,
    backgroundColor:'#AFD1CB',
    top: 2.17,
    bottom: 40.64,
   
    borderRadius:10},
item: {
padding: 10,
fontSize: 18,
height: 60,
left:70,
right:'auto',
color:'#4C5784',
borderRadius:4,
borderEndWidth:2,
borderColor:'#B7DFD7',
},
Playercontainer:{
  left:10,
  borderColor:'#EBF2F8',
  borderRadius: 24,
  borderWidth:1,
  width:'90%',
  height:70,
  top: 0.17,
  marginVertical:4,
  backgroundColor:'#EBF2F8'
},

backgrounicon:{
  position: 'absolute',
  width:39,
  height:35,
  left: 175,
  right: 0.67,
  top: 2.17,
  bottom: 40.64,
  backgroundColor:'#B7DFD7',
},
Player_name:{
marginLeft:85,
  color:'#4C5785',
  fontSize:20,
  top: 2.17,
  margin:1,
  marginTop:15,
},

  Joudicon:{
    position: 'absolute',
    width:40,
    height:40,
    left: '5%',
    margin:2,
    marginTop:10,
    right: 0.67,
    top: 5.17,
    bottom: 60.64,
 }, 

 Players:{
  justifyContent: "center",
  // alignItems: "center",
  position: 'absolute',
  // left: '11.8%',
  // right: '5.8%',
  top: '13.88%',
  bottom: '40.66%',
  width:'80%',
  color: '#6F97B1',
  backgroundColor:'#fff',
  borderColor:'#EBF2F8',
  borderWidth:1,
  borderRadius:10,
  textAlign:'center',
  marginVertical:1,
  padding:4,
},

Textofbutton:{
    fontSize:20,
    color:'white',
    fontWeight: "bold",

  },
 copyText1:{
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  fontSize: 18,
  position: "absolute",
color:'#ADC1CE',
  top: '65%',
 // bottom:'30%',
  // left:90,
  // right:10,
  alignSelf: "center",
  position: "absolute",
  alignContent: "center",
 },
 copyText2:{
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  fontSize: 18,
  padding:(10,10,10,10),
  position: "absolute",
color:'#6F97B1',
backgroundColor:'#f1f1f1',
  top: '70%',
 // bottom:'30%',
  // left:90,
  // right:10,
  alignSelf: "center",
  position: "absolute",
  alignContent: "center",
 },

});
