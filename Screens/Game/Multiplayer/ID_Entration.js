import React,{Component, useState,useLayoutEffect, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text, 
    Button,
    Image,
    TextInput,
    Alert,
    ImageBackground
  } from "react-native";
import { useRoute } from '@react-navigation/native';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,arrayUnion,getDoc, addDoc,where} from "firebase/firestore"; 
import { db,authentication } from '../../../config_firebase/firebase';
import img1 from '../../../../assets/Backgro3.png'


export default function IdEnteration({ navigation }) {
  const user = authentication.currentUser;
  const [room_ID, setRoom_ID] = useState('');
  const [Name,setName]=useState('')

  // const route = useRoute();
  // const { Update } = useFirestore(room_ID);
  //const [playersList, setPlayersList] = useState([])
  // const [gameStatus, setGameStatus] = useState([])

useEffect(() => {
  const douc= doc(db, "player",user.uid);
  getDoc(douc).then((doc)=>{
      setName(doc.get('name'))});
}, [])


  const Update= (value, merge,DocToBeUpdated,roomID)=>{

    const Ref = doc(db, "Game",roomID);
    
    if(DocToBeUpdated=='None'){
        setDoc(Ref,value,{merge:merge})
        .then(() => {
        //  alert("Document Updated")
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
         // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  
    else if(DocToBeUpdated=="Answer"){
      const myDoc = doc(Ref,"Votes","Answer");
      setDoc(myDoc,value,{merge:merge})
    .then(() => {
   //   alert("Document Updated")
    })
    .catch((error) => {
      alert(error.message)
    })
  }
 
  }


 async function validateEntry() {
    let playersList = [];

    let gameStatus = "";
    //............Read the data
    const Ref =  doc(db, 'Game', room_ID);
    await getDoc(Ref).then((doc) => {
      //setPlayersList(doc.get('Player'));
      
      playersList = doc.get('Players')
      // setGameStatus(doc.get('GameStatus'));
      gameStatus = doc.get('GameStatus')
     // Alert.alert(String(playersList))
      
     if((playersList && gameStatus)==undefined){
        Alert.alert('الرمز خاطئ')
      }
    }).catch((error) => {
      Alert.alert('الرمز خاطئ')
    });

let playerExist = playersList.filter(function(Player) { return Player.Email == user.email; }).length > 0 ;
  

    if (playersList.length >= 3 & !(playerExist)) {

      Alert.alert('الغرفة ممتلئة ')

    }

     else if (gameStatus == "Started" & (playerExist))  {
        navigation.navigate('Game__', { IDToBeSent: room_ID })
      }
    else if (gameStatus == "Started" & !(playerExist)){
      Alert.alert(' :( للأسف اللعبة بدأت بالغعل  ')
      }

      
      else if (gameStatus == "waiting") {

     
        navigation.navigate('WaitingRoom', { Room_ID: room_ID })
       // Update = useFirestore(room_ID)

        Update({
          "Players":arrayUnion({Email:user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
         },true,'None',room_ID)
      }
    else {
      Alert.alert(' :(  للأسف حالة اللعبة لاتسمح لك بالدخول  ')
    }
  }


return (
   <View  style={styles.container}>
     <ImageBackground source={img1} style={styles.img}>
       <Text style={styles.textstyle}>ادخلي الرمز</Text>
    <View style={styles.textinputLineStyle}/>
    <TextInput  textinputStyle value={room_ID} onChangeText= {(text) => setRoom_ID(text) }  placeholder={'< هنا >'} style={styles.textinputStyle}/> 
  
  <View style={styles.buttonStyle}>
        <Button title={"إنضمام "} onPress={()=> validateEntry() } 
            color="#FFFFFF"  />
        </View>
        </ImageBackground>
    </View>
 );
}

//CBDAE7
const styles = StyleSheet.create({
  container : {
      flex            : 1,  
      alignItems      : "center",
      justifyContent  : "center",
  },
  textinputLineStyle:{
    position:'absolute',
    color: "#4C5785",
      borderRadius:3,
      borderColor:'#4C5785',
      borderWidth:1,
      width:'59%',
      // left:'20%',
      justifyContent: "center",
      alignSelf: "center",
      position: "absolute",
      alignContent: "center",
      bottom:350,
  },
  textinputStyle:{
    position:'absolute',
      width:'55%',
     // left:'43%',
      bottom:'40%',
      alignSelf: "center",
      position: "absolute",
      alignContent: "center",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
  },
  img:{
    width:'100%',
    height:'100%'
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
    letterSpacing: -0.3,
    position: "absolute",
    width: 220,
    height: 58,
    top: '70%',
    bottom:'30%',
    // left:90,
    // right:10,
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    alignContent: "center",
    backgroundColor: "#6F97B1",
  },
  textstyle:{
color: '#4A7590',
fontSize:30,
top:'40%',
justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  }
});