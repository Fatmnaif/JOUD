
import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Image,
} from "react-native";
import Board from '../Game/Board';
import {authentication , db} from '../../config_firebase/firebase' // this onnnnnnnnne
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
import shortid from 'shortid'



export default function StartUp({ navigation }) {

//   const [board,setBoard]=useState([])
//   const [pssIndexs,setPssIndexs]=useState([])
//   const [tapeIndexs,setTapeIndexs]=useState([])
//   const [fogIndexs,setFogIndexs]=useState([])

//   useEffect(() => {
//     xx = Board();
//     setBoard(xx.Board);
//     setPssIndexs(xx.PssIndexs);
//     setFogIndexs(xx.FogIndexs);
//     setTapeIndexs(xx.TapeIndexs);
//     }, []);
//     let xx;
// let Board__=[];

// let index=0;
// while (index != 36) {
//     if (pssIndexs.includes(index)) {
//     Board__[index] = 'p'
//     } else if (fogIndexs.includes(index)) {
//     Board__[index] = 'f'
//     } else if (tapeIndexs.includes(index)) {
//     Board__[index] = 't'
//     } else {
//     Board__[index] = 's'
//     }
//     index++;
//     }

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
      <View>
        <Image source={require("../../../assets/startupscreen.png")} style={styles.imge1} />
        <Text style={styles.text1}>إبدأ اللعب الآن!</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.button1}>
        <Button
            title="لاعب واحد"
            onPress={() => {    navigation.navigate('Instruction') }}
            color="#FFFFFF"
          />
    
        </View>
        <View style={styles.button2}>
          <Button
            title="اكثر من لاعب"
            onPress={() => {//Game__ Select
              navigation.navigate("Select");
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
    top: 411,
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
    top: 500,
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
    top: 280,
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
  imge1: {
    width: 220,
    height: 296,
    resizeMode: "contain",
    left: -79,
    top: 100,
    transform: [{ rotate: "4deg" }],
  },
});