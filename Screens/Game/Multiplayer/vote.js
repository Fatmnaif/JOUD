import React ,{useState,useEffect}from 'react';
import { StyleSheet,Alert,TextInput,TouchableOpacity,Text, View} from 'react-native';
import {authentication,db} from '../../../config_firebase/firebase';
import {setDoc ,doc,docs,collection,updateDoc,onSnapshot} from 'firebase/firestore';
import { updatePassword,updateEmail} from 'firebase/auth';

export default function Admin_Setting({navigation}) {

 const user = authentication.currentUser;

 const [player,setplayer]=useState([]);

 const roomID = 'nZNuWob2U'

 const Ref = doc(db, "Game",roomID);

 const collectionRef = collection(db,'Game','nZNuWob2U','Votes');
 //const collectionRef = doc(db,'Game',roomID);
 
 

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


//Votes 
function validateExplorerVote(value){
    

  Update({"Player1":arrayRemove(user.email)},true,'Explorer');
  Update({"Player2":arrayRemove(user.email)},true,'Explorer');
  Update({"Player3":arrayRemove(user.email)},true,'Explorer');
  Update({"Player4":arrayRemove(user.email)},true,'Explorer');
  Update({"Player5":arrayRemove(user.email)},true,'Explorer');
  if(value=="Player1")
    {
      Update({
        "Player1":arrayUnion(user.email)
      },true,'Explorer')
    }
  else if(value=="Player2")
    {
      Update({
        "Player2":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player3")
    {
      Update({
        "Player3":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player4")
    {
      Update({
        "Player4":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player5")
    {
      Update({
        "Player5":arrayUnion(user.email)
      },true,'Explorer')
    }
}

  
  return (
    <View style={styles.container}>

      <View style={styles.voteholder}>
       <View style={styles.textholder} > 
       <Text style={styles.text}> يبدو أن المحبطين قريبين منك ! </Text>
       <Text style={styles.text}> قومي بالتصويت على مستكشفة </Text>
       <Text style={styles.text}>لتستكشف الغرفة التالية </Text>
      </View>

  
   
    <View style={styles.Playercontainer}>
    <TouchableOpacity >
      <Text>{}</Text>
    </TouchableOpacity>
    </View>
   

      </View>
     </View>
  )
  }
const styles = StyleSheet.create({
container:{
    backgroundColor:'white',
    height:900,
    width:900,
    },
voteholder:{
   backgroundColor:'black',
   height:380,
   width:360,
   left:27,
   top:190,
   borderRadius:33,
},
textholder:{
   backgroundColor:'#AFD1CB',
   height:80,
   width:300,
   left:27,
   top:30,
   borderRadius:33,
},
 text:{
 color:'#4C5785',
 fontSize:18,
 left:17
 
 },
 player:{
    backgroundColor:'#AFD1CB',
    height:40,
    width:300,
    left:27,
    top:30,
    borderRadius:33,
 },
  Playercontainer:{
    left:20,
    right:10,
    borderColor:'#6F96B3',
    borderRadius: 24,
    borderWidth:1,
    backgroundColor:'white',
    width:325,
    height:41,
    top: 50.17,
    marginVertical:8,
    padding:5
  },
});

