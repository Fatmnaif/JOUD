import React, { useState, useEffect, useLayoutEffect,useFirestore } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  ImageBackground,
  Image,
  Alert,
  Pressable,
  TouchableOpacity
 } from "react-native";

import { db,authentication} from '../../../config_firebase/firebase';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
import shortid from 'shortid'
import { useRoute } from '@react-navigation/native';
import slantedJoud from '../../../../assets/slantedJoud.png'
import Board from '../Board';

export default function Select({ navigation }) {

  const user = authentication.currentUser;
  const [board,setBoard]=useState([])
  const [pssIndexs,setPssIndexs]=useState([])
  const [tapeIndexs,setTapeIndexs]=useState([])
  const [fogIndexs,setFogIndexs]=useState([])
  const [Name,setName]=useState('')
  const [readPlayers, setReadPlayers] = useState([]);

  // useEffect(() => {
    // const q = collection(db, 'Game')
    // const finish=  onSnapshot(q, (querySnapshot) => {
    //   setReadPlayers(querySnapshot.docs.map(doc =>({ ...doc.data(),
    //     id: doc.id,
    //     Player:doc.data().Players,
    //     GameStatus:doc.data().GameStatus,
    //     SessionType:doc.data().SessionType,
    //     RoomID:doc.data().RoomID, })))
  //     })
  // return finish;
  //   },[])
  

  useEffect(() => {
    const douc= doc(db, "player",user.uid);
    getDoc(douc).then((doc)=>{
        setName(doc.get('name'))});
  }, [])
  
  let currentBoard = ['','light','close','close','close','close'
  ,'light','close','close','close','close','close',
   'close','close','close','close','close','close',
   'close','close','close','close','close','close',
   'close','close','close','close','close','close',
   'close','close','close','close','close','']
   
  
    useEffect(() => {
      xx = Board();
      setBoard(xx.Board);
      setPssIndexs(xx.PssIndexs);
      setFogIndexs(xx.FogIndexs);
      setTapeIndexs(xx.TapeIndexs);
      }, []);
      let xx;
  let Board__=[];
  
  
  //function initBoard(){
    let index=0;
    while (index != 36) {
        if (pssIndexs.includes(index)) {
        Board__[index] = 'p'
        } else if (fogIndexs.includes(index)) {
        Board__[index] = 'f'
        } else if (tapeIndexs.includes(index)) {
        Board__[index] = 't'
        } else {
        Board__[index] = 's'
        }
        index++;
        }
    //}
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
                
              })
              .catch((error) => {
                alert(error.message)
              })
          }
    
          else if(DocToBeUpdated=="Explorer"){
            const myDoc = doc(Ref,"Votes","Explorer");
            setDoc(myDoc,value,{merge:merge})
          .then(() => {
            
          })
          .catch((error) => {
            alert(error.message)
          })
      }
    
      else if(DocToBeUpdated=="Answer"){
        const myDoc = doc(Ref,"Votes","Answer");
        setDoc(myDoc,value,{merge:merge})
      .then(() => {
        
      })
      .catch((error) => {
        alert(error.message)
      })
    }
   
    }
  
  
    
    function createSession (SessionType_p){
  
    let Generated_ID = shortid.generate();

    //let board=["q"]
    //initBoard()
    const GamesRef = doc(db, "Game",Generated_ID);
    const VoteRef = collection(GamesRef,"Votes")
    setDoc(GamesRef, { 
        Board:Board__, CurrentQuestion:"", ExplorerModal:false, FinalAnswer:0,FinalExplorer:"",GameStatus:"waiting",NumberOftape:3,Players:[],Points:0,
        QuestionModal:false,RoomID:Generated_ID,SessionType:SessionType_p, currentPosition:0,CurrentBoard:currentBoard, Host:user.email}
      )
      setDoc(doc(GamesRef,"Votes","Rooms"),{
          Room1: [],
          Room2: [],
          Room3: [],
          Room4: [],
          
      })
      setDoc(doc(GamesRef,"Votes","Explorer"),{
        Player1: [],
        Player2: [],
        Player3: [],
      
        
    })
    setDoc(doc(GamesRef,"Votes","Answer"),{
        Choice1: [],
        Choice2: [],
        Choice3: [],
        Choice4: [],
      
        
    })
       Update({
        "Players":arrayUnion({Email:user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
       },true,'None',Generated_ID)
  
      return Generated_ID;
    }
    
    // function joinRandomRoom(){
    //   Alert.alert('join random room');
    // let thereisRoom = [];
    // readPlayers.forEach(element => {
    // if(element.Player.length < 3 && (element.SessionType == 'public' && element.GameStatus == 'waiting')){
    // thereisRoom.push(element.RoomID);
    // }
    // });
    // if(thereisRoom.length!=0){
    // //فيه هنا مشكلللللللللللللللللللللللللللللللللللللللللههههههههههههههههه حليها
    // Alert.alert('1')
    // navigation.navigate('WaitingRoom', {Room_ID: thereisRoom[0]} )
    // //Update = useFirestore( thereisRoom[0]),
    // // Alert.alert(thereisRoom[0])
    // Update({
    // "Players":arrayUnion({Email: user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
    // },true,'None',thereisRoom[0])
    // }
    // else{
    // Alert.alert("joined new")
    // let Generated_ID1 = createSession('public');
    // navigation.navigate('WaitingRoom', {Room_ID: Generated_ID1} )
    // //Update = useFirestore(Generated_ID1),
    // Update({
    // "Players":arrayUnion({Email:user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
    // },true,'None',Generated_ID1)}
    // // Alert.alert('2')
    // }
    useEffect(() => {
      const q = collection(db, 'Game')
      const finish=  onSnapshot(q, (querySnapshot) => {
        setReadPlayers(querySnapshot.docs.map(doc =>({ ...doc.data(),
         id: doc.id,
          Player:doc.data().Players,
          GameStatus:doc.data().GameStatus,
          SessionType:doc.data().SessionType,
          RoomID:doc.data().RoomID, })))
        })
    return finish;
      },[])
    
    function joinRandomRoom(){

     
      // const q = collection(db, 'Game')
      // const finish=  onSnapshot(q, (querySnapshot) => {
      //   setReadPlayers(querySnapshot.docs.map(doc =>({ ...doc.data(),
      //    id: doc.id,
      //     Player:doc.data().Players,
      //     GameStatus:doc.data().GameStatus,
      //     SessionType:doc.data().SessionType,
      //     RoomID:doc.data().RoomID, })))
      //   })
   // return finish;

    
    Alert.alert('Join random');

   let thereisRoom = [];
   readPlayers.forEach(element => {
          if(element.Player.length < 3 && (element.SessionType == 'public' &&  element.GameStatus == 'waiting')){
        thereisRoom.push(element.RoomID); 
        Alert.alert('found random');
      }  
});  
  
    if(thereisRoom.length!=0){
       Alert.alert('WaitingRoom');

        navigation.navigate('WaitingRoom', {Room_ID: thereisRoom[0]} ) 
        Update({
          "Players":arrayUnion({Email: user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
         },true,'None',thereisRoom[0])

    }
    else{
      Alert.alert('create public');
        let Generated_ID1 = createSession('public');
        navigation.navigate('WaitingRoom', {Room_ID: Generated_ID1} ) 
       Update({
        "Players":arrayUnion({Email:user.email,ActiveState: true,Position:0,ID:user.uid,Name:Name})
       },true,'None',Generated_ID1)}      
  
     }

    return (
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
        <Image style={styles.img1} source={slantedJoud}></Image>
        <View>
          <Text style={styles.text1}>إنضمام إلى : </Text>
        </View>  
        <View style={styles.container}>
          <View style={styles.button1}>
            <Button
              title="الدخول لغرفه عشوائيه "
              
              onPress={() => {
                joinRandomRoom();
              }}
              color="#FFFFFF"
            />
          </View> 

          <View style={styles.button2}>
         
         <Button
             title="انشاء غرفه خاصه"
             onPress={() => {
              let Generated_ID2 = createSession('private');
              navigation.navigate("WaitingRoom",{Room_ID: Generated_ID2 });
             }}
             color="#FFFFFF"
             
           />
         </View>

         <View style={styles.button3}>
          <Button
              title="الدخول لغرفه خاصه "
              onPress={() => {
                navigation.navigate("IdEnteration");
              }}
              color="#FFFFFF"
            />
  
          </View>
  
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'#F2F2F2',
      left:214,
    },
    button1: {
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
      width: 224,
      height: 58,
      top: 431,
      left:-120,
      right:-90,    
      borderRadius: 100,
      alignSelf: "center",
      position: "absolute",
      alignContent: "center",
      backgroundColor: "#6F97B1",
    },
    button2: {
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
      width: 224,
      height: 58,
      top: 522,
      left:-120,
      right:-90,
      borderRadius: 100,
      alignSelf: "center",
      position: "absolute",
      alignContent: "center",
      backgroundColor: "#AFD1CB",
    },
    text1: {
      position: "absolute",
      top: 310,
      textAlign: "center",
      alignSelf: "center",
      left: 140,
      fontSize: 22,
      lineHeight: 41,
      fontWeight: "bold",
      letterSpacing: -0.3,
      color: "#4C5785",
      fontStyle: "normal",
      flex: 1,
    },
    button3: {
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      fontSize: 14,
      lineHeight: 26,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: -0.3,
      position: "absolute",
      width: 224,
      height: 58,
      top: 614,
      right:-105,
      backgroundColor: "#6F97B1",
      borderRadius: 100,
  
    },
  img1:{
    position: "absolute",
    width:140,
  height:320,
  left:-2,
  top:100,
  right:90,
  padding:2,
  margin:2,
  bottom:0
  },
  });
   