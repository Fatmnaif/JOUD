
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import React, { useState ,useEffect ,useLayoutEffect} from 'react';
import { authentication ,db} from '../../../config_firebase/firebase';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,where,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
//import shortid from 'shortid'
import Board from '../Board'


export default function Game ( {route,navigation,Component }) {
 let board =Board();
// ------------------------update
 const [Gamesesion, setGamesession] = useState([]);

 function Update (value, merge,DocToBeUpdated){
   const Ref = doc(db, "Game",roomID);
   
   if(DocToBeUpdated=='None'){
       setDoc(Ref,value,{merge:merge})
       .then(() => {
         alert("Document Updated")
       })
       .catch((error) => {
         alert(error.message)
       })}
 
 
       else if(DocToBeUpdated=='Room'){
             const myDoc = doc(Ref,"Votes","Rooms");
             setDoc(myDoc,value,{merge:merge})
           .then(() => {
             alert("Document Updated")
           })
           .catch((error) => {
             alert(error.message)
           })
       }
 
       else if(DocToBeUpdated=="Explorer"){
         const myDoc = doc(Ref,"Votes","Explorer");
         setDoc(myDoc,value,{merge:merge})
       .then(() => {
         alert("Document Updated")
       }  
       )
       .catch((error) => {
         alert(error.message)
       })
   }

       
   else if(DocToBeUpdated=="Answer"){
     const myDoc = doc(Ref,"Votes","Answer");
     setDoc(myDoc,value,{merge:merge})
   .then(() => {
     alert("Document Updated")
   })
   .catch((error) => {
     alert(error.message)
   })
 }
 
 
} 
 //-----------------------------end update

  const user = authentication.currentUser;
 
  const roomID = 'nZNuWob2U'

  const GamesRef = doc(db, "Game",roomID);
  


const [Player, setPlayer] = useState([]);



useLayoutEffect(() => {
 const collectionRef = collection(db,'Game',roomID,'Votes');

 const q = query(collectionRef, where('Room2', 'array-contains',user.email)
 );
 
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
     setPlayer(
         querySnapshot.docs.map(doc => ({
           Room2:doc.data().Room2,
     }))
     );
    
  }
  );
  return () => unsubscribe
},
[]);

function Update (value, merge,DocToBeUpdated){
  const Ref = doc(db, "Game",roomID);
  
  if(DocToBeUpdated=='None'){
      setDoc(Ref,value,{merge:merge})
      .then(() => {
        alert("Document Updated")
      })
      .catch((error) => {
        alert(error.message)
      })}


      else if(DocToBeUpdated=='Room'){
            const myDoc = doc(Ref,"Votes","Rooms");
            setDoc(myDoc,value,{merge:merge})
          .then(() => {
            alert("Document Updated")
          })
          .catch((error) => {
            alert(error.message)
          })
      }

      else if(DocToBeUpdated=="Explorer"){
        const myDoc = doc(Ref,"Votes","Explorer");
        setDoc(myDoc,value,{merge:merge})
      .then(() => {
        alert("Document Updated")
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  else if(DocToBeUpdated=="Answer"){
    const myDoc = doc(Ref,"Votes","Answer");
    setDoc(myDoc,value,{merge:merge})
  .then(() => {
    alert("Document Updated")
  })
  .catch((error) => {
    alert(error.message)
  })
}

}


// useEffect(
//   () =>
//     onSnapshot(doc(db,'Game',roomID,'Votes','Rooms'), where('Room2', 'array-contains','h'),(snapshot) =>
//       setGamesession(snapshot.docs.map((doc) => ({ ...doc.data()})))
//     ),
    
//   []
// );
       

let count=0;



  var gameState=board.Board
  


const initializaGame =() => {
console.log(gameState)
gameState=board.Board}



//board  

const onTilePress = () =>{
  initializaGame();

}

  return (
  
    <View style={styles.container}>
    
    {Player.map((data) => (

   <View key={data.id} >
   
   <Text style={styles.mytext}>  أهلاً بك {data.Room2} </Text>

</View>

))}
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> 
      onTilePress(0,0)

      }  style={styles.tile}>
         
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,1)} style={styles.tile} >
        
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,2)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress (0,3)} style={styles.tile}>
      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,4)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,5)} style={styles.tile}>
       
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(1,0)} style={styles.tile}>
      
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,1)} style={styles.tile} >
       
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,2)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,3)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,4)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,5)} style={styles.tile}>
      
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(2,0)} style={styles.tile}>
        
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,1)} style={styles.tile} >
      
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,2)} style={styles.tile}>
        
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,3)} style={styles.tile}>
   
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,4)} style={styles.tile}>
    
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,5)} style={styles.tile}>
    
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(3,0)} style={styles.tile}>
          
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,1)} style={styles.tile} >
        
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,2)} style={styles.tile}>
     
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,3)} style={styles.tile}>
    
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,4)} style={styles.tile}>
      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,5)} style={styles.tile}>
   
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(4,0)} style={styles.tile}>
   
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,1)} style={styles.tile} >

          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,2)} style={styles.tile}>
      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,3)} style={styles.tile}>
 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,4)} style={styles.tile}>
     
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,5)} style={styles.tile}>
      
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(5,0)} style={styles.tile}>
       
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,1)} style={styles.tile} >
    
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,2)} style={styles.tile}>
 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,3)} style={styles.tile}>
        
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,4)} style={styles.tile}>
       
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,5)} style={styles.tile}>
        
          </TouchableOpacity>
      </View>

  
    </View>
  
  );
 //}
 //}
 
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:60,
  },
  tile:{
    borderWidth: 10,
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  tileX:{
    color:"red",
    fontSize:30,

  },
  tileO:{
    color:"green",
    fontSize:30,

  },
  tileF:{
    color:"grey",
    fontSize:30,

  },
  tileC:{
    color:"blue",
    fontSize:30,

  }
});