


import React, { Component, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity} from "react-native";
import { authentication, db } from "../../../config_firebase/firebase";
import { doc, getDoc ,updateDoc} from "firebase/firestore";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";



export default function LossTape({ navigation,route }) {
  const { PoinT } = route.params;
  let Name;
  let totalGame;
  let totalLosses;

  let point;
  let FinalPoint;
  let AdmintotalGame;
  let Admintotallosses;

  const user = authentication.currentUser;
  var uid =user.uid;
  const docref = doc(db, "player", uid);

  useEffect(() => {
    database()
  }, []);

  async function database(){

    const docre = doc(db, "Game", 'zVI1SSB');
    await getDoc(docre).then((doc) => {
      AdmintotalGame=doc.get("TotalGames");
      Admintotallosses=doc.get("TotalLosses");
     });

    await getDoc(docref).then((doc) => {
      Name=doc.get("name");
      totalGame=doc.get("TotalGame");
      totalLosses=doc.get("TotalLosses");
      point= doc.get("Point");
    });
    
   await updateDoc(doc(db, "player", uid), {
      TotalGame: (totalGame + 1),
      TotalLosses: (totalLosses + 1),
      Point:(point+PoinT)
    });
    await updateDoc(docre , {
      TotalGames:AdmintotalGame + 1,
      TotalLosses:Admintotallosses + 1,
    });
  }
  return (
    <>
    
    
      <View
        style={{
          
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          borderColor: "black",
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
          //padding: 20,
          borderRadius: 20,
          // position: "absolute",
          // width: 350,
          // height: 350,
        }}
      >
        
       
        <View
          style={{
            
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <View style={{backgroundColor:'#D9E8F1', paddingTop:15,paddingLeft:15,paddingRight:15,marginBottom:100}}>
          <Text style={{marginBottom:20, fontSize: 20,textAlign:'center',fontWeight: "bold", fontStyle: "normal",color:'#4C5784'}}>أتلف الاستبيان!</Text>
          <Text style={{marginBottom:20, fontSize: 20,textAlign:'center',fontWeight: "bold", fontStyle: "normal",color:'#4C5784'}}>:(</Text>
          <Text style={{marginBottom:50, textAlign:'center',fontSize:15, fontStyle: "normal",color:'#4C5784'}}>نظرًا لعدم وصول الاستبيان إلى العمادة, فإن تطوير العملية التعليمية تعثر بعض الشيء</Text>
          </View>
          
          <Image
            source={require("../../../../assets/JoudTape.png")}
            style={{
              justifyContent: "center",
              
              width: 205,
              height: 329,
              resizeMode: "contain",
            }}
          />
   
          <View
            style={{
              backgroundColor: "#D9E8F1",
              borderRadius: 20,
              opacity: 0.6,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              position: "absolute",
              width: 74,
              height: 31,
              bottom: '65%',
              flexDirection: "row",
            }}
          >
            <Icon name="star" size={15} />
            <Text style={{ opacity: 1 }}> {PoinT}</Text>
          </View>
          
          <TouchableOpacity onPress={()=> navigation.navigate('Player_startgame') } style={{backgroundColor:'#6F97B1',marginTop:30,borderRadius:100,alignContent:"center"}}><Text style={{color:'white',fontStyle:'normal', fontSize:20,textAlign:'center',width:150,height:40,marginTop:10}}>إنهاء</Text></TouchableOpacity>
        </View>
        
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    position: "absolute",
    height: 69,
    width: 242,
    position: "absolute",
    top: 40,
    textAlign: "right",
    left: -2,
    fontSize: 12,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#4C5784",
    fontStyle: "normal",
    flex: 1,
  },
})







