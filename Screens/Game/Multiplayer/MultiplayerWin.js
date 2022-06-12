import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import { authentication, db } from "../../../config_firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { async } from "@firebase/util";


 export default function Win({ navigation ,route,navigator}) {

  const { PoinT } = route.params;
  const [Name, setName] = useState("");

  let totalGame;
  let totalWins;
  let point;
  let FinalPoint;
  let AdmintotalGame;
  let AdmintotalWins;

  const user = authentication.currentUser;
  var uid = user.uid;
 
  useEffect(() => {
    database()
  }, []);
 
async function database(){

  const docre = doc(db, "Game", 'zVI1SSB');
  await getDoc(docre).then((doc) => {
    AdmintotalGame=doc.get("TotalGames");
    AdmintotalWins=doc.get("TotalWins");
   });
  
 
  const docref = doc(db, "player", uid);
   await getDoc(docref).then((doc) => {
      point= doc.get("Point");
      totalGame=doc.get("TotalGame");
      totalWins=doc.get("TotalWins");
    });

    FinalPoint=(point+PoinT);

    await updateDoc(doc(db, "player", uid), {
      TotalGame:totalGame + 1,
      TotalWins:totalWins + 1,
      Point: FinalPoint,
    });
    await updateDoc(docre , {
      TotalGames:AdmintotalGame + 1,
      TotalWins:AdmintotalWins + 1,
    });

  }
  //  console.log(FinalPoint);
  
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
          <Text style={{marginBottom:20, fontSize: 20,textAlign:'center',fontWeight: "bold", fontStyle: "normal",color:'#4C5784'}}>تم إيصال الاستبيان بنجاح!</Text>
          <Text style={{marginBottom:50, textAlign:'center',fontSize:15, fontStyle: "normal",color:'#4C5784'}}>نظرًا لجهودك في إيصال الاستبيان استطاعت العمادة تطوير المناهج الدراسية</Text>
          </View>
          
          <Image
            source={require("../../../../assets/happyJoud.png")}
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



// import React, { Component, useState, useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   Button,
//   ImageBackground,
//   Touchable,
//   TouchableOpacity,
// } from "react-native";
// import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
// import { authentication, db } from "../../../config_firebase/firebase";
// import { doc, getDoc, updateDoc,onSnapshot } from "firebase/firestore";



//  export default function Win({ navigation ,route,navigator}) {

//   const { PoinT,IDToBeSent } = route.params;
//   let Players;
 
//   let totalGame;
//   let totalWins;
//   let point;
//   let FinalPoint;
//   let AdmintotalGame;
//   let AdmintotalWins;

//   // useEffect( () =>
//   //     onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
//   //       setPlayers(snapshot.data().Players)
        
//   //     ),
//   //   []
//   // );



//   useEffect(() => {
//     UpdatPlayersInfo()
//   }, []);
 
// async function UpdatPlayersInfo(){
  
//   const dore = doc(db, "Game", IDToBeSent);
//   await getDoc(dore).then((doc) => {
//     Players=doc.get("Players");
//    });

//   const docre = doc(db, "Game", 'zVI1SSB');
//   await getDoc(docre).then((doc) => {
//     AdmintotalGame=doc.get("TotalGames");
//     AdmintotalWins=doc.get("TotalWins");
//    });
  

// for (let index = 0; index < Players.length; index++) {
 
//   const docref = doc(db, "player",Players[index].ID);
//   await getDoc(docref).then((doc) => {
//      point= doc.get("Point");
//      totalGame=doc.get("TotalGame");
//      totalWins=doc.get("TotalWins");
//    });
//    FinalPoint=(point+PoinT);
//    await updateDoc(doc(db, "player", Players[index].ID), {
//      TotalGame:totalGame + 1,
//      TotalWins:totalWins + 1,
//      Point: FinalPoint,
//    });}
//    await updateDoc(docre , {
//     TotalGames:AdmintotalGame + 1,
//     TotalWins:AdmintotalWins + 1,
//   });

//  }
//   //  console.log(FinalPoint);
  
//   return (
//     <>
    
    
//       <View
//         style={{
          
//           flex: 1,
//           flexDirection: "column",
//           backgroundColor: "#FFFFFF",
//           borderColor: "black",
//           borderWidth: 3,
//           justifyContent: "center",
//           alignItems: "center",
//           //padding: 20,
//           borderRadius: 20,
//           // position: "absolute",
//           // width: 350,
//           // height: 350,
//         }}
//       >
        
       
//         <View
//           style={{
            
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             position: "absolute",
//           }}
//         >
//           <View style={{backgroundColor:'#D9E8F1', paddingTop:15,paddingLeft:15,paddingRight:15,marginBottom:100}}>
//           <Text style={{marginBottom:20, fontSize: 20,textAlign:'center',fontWeight: "bold", fontStyle: "normal",color:'#4C5784'}}>تم إيصال الاستبيان بنجاح!</Text>
//           <Text style={{marginBottom:50, textAlign:'center',fontSize:15, fontStyle: "normal",color:'#4C5784'}}>نظرًا لجهودك في إيصال الاستبيان استطاعت العمادة تطوير المناهج الدراسية</Text>
//           </View>
          
//           <Image
//             source={require("../../../../assets/happyJoud.png")}
//             style={{
//               justifyContent: "center",
              
//               width: 205,
//               height: 329,
//               resizeMode: "contain",
//             }}
//           />
   
//           <View
//             style={{
//               backgroundColor: "#D9E8F1",
//               borderRadius: 20,
//               opacity: 0.6,
//               justifyContent: "center",
//               alignItems: "center",
//               flex: 1,
//               position: "absolute",
//               width: 74,
//               height: 31,
//               bottom: '65%',
//               flexDirection: "row",
//             }}
//           >
//             <Icon name="star" size={15} />
//             <Text style={{ opacity: 1 }}> {PoinT}</Text>
//           </View>
          
//           <TouchableOpacity onPress={()=> navigation.navigate('Player_startgame') } style={{backgroundColor:'#6F97B1',marginTop:30,borderRadius:100,alignContent:"center"}}><Text style={{color:'white',fontStyle:'normal', fontSize:20,textAlign:'center',width:150,height:40,marginTop:10}}>إنهاء</Text></TouchableOpacity>
//         </View>
        
//       </View>
//     </>
//   );
// }
// const styles = StyleSheet.create({
//   text: {
//     position: "absolute",
//     height: 69,
//     width: 242,
//     position: "absolute",
//     top: 40,
//     textAlign: "right",
//     left: -2,
//     fontSize: 12,
//     lineHeight: 22,
//     fontWeight: "bold",
//     color: "#4C5784",
//     fontStyle: "normal",
//     flex: 1,
//   },
// })
