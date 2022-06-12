import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text,Alert,StyleSheet,Button ,LogoTitle,View} from 'react-native';
import { GiftedChat ,InputToolbar , Bubble} from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  getDocs,
  getDoc,
  doc
} from 'firebase/firestore';
//  import { signOut } from 'firebase/auth';
// import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
// import colors from '../colors';
import { db,authentication} from '../../../config_firebase/firebase';
// import { transparent } from 'react-native-paper/lib/typescript/styles/colors';


///import { Alert } from 'react-native-web';

export default function Chat({route}){
  const navigationOptions = {
    // headerTitle:' <LogoTitle />',
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#fff"
        />
      ),
    };


  const [messages,setMessages] = useState([]);
  const navigation = useNavigation();
  const user = authentication.currentUser;
  const { R_ID } = route.params;
  const [playerName,setPlayerName]= useState('');
  const [avatarImg,setAvatarImg]= useState('');
 // const {players} =useFirestore(R_ID);

   
  const [players,setPlayers]= useState([]);
  useEffect(async()=> onSnapshot(doc(db,'Game',roomID),
  (snapshot)=>setPlayers(snapshot.data().Players)),[])
  
  
            
  useLayoutEffect(() => {

      const collectionRef = collection(db,'message',R_ID,R_ID);
      const q = query(collectionRef, orderBy('createdAt','desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
           
          setMessages(
              querySnapshot.docs.map(doc => ({
              _id:doc.id,
              createdAt:doc.data().createdAt.toDate(),
              text:doc.data().text,
              user:doc.data().user

          })));
       });
      return () => unsubscribe();
  }, []);
  getUserName();
  showAvatar();
  const onSend = useCallback((messages = []) => {
      getUserName();
      showAvatar();
    setMessages(previousMessages => GiftedChat.append(previousMessages,messages));
      const{ _id, createdAt, text, user} = messages[0];
      addDoc(collection(db,'message',R_ID,R_ID),{
          _id,
          createdAt,
          text,
          user
      });
  },[]);

   function getUserName(){
    //   const q = query(collection(db, "player"),where("email", "==", user.email));
    //   const querySnapshot1 = await getDocs(q);
    // querySnapshot1.forEach((doc) => {
    //     setPlayerName(doc.data().name)
    // })
    // const q = query(collection(db, "player"), where("email", "==", user.email));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   Alert.alert('j')
    //  // console.log(doc.id, " => ", doc.data());
    //   setPlayerName(doc.data().name)
    // });
    const douc= doc(db, "player",user.uid);
    getDoc(douc).then((doc)=>{
      setPlayerName(doc.get('name'))});
      }

async function showAvatar(){
   let playersList = [];
  const docref=doc(db,'Game', R_ID)
     await getDoc(docref).then((doc)=>{
     playersList= doc.get('Players')
  });



  if(playersList[0].Email==user.email)//fat
   setAvatarImg('https://i.postimg.cc/MTCLpbpg/joud1.png')//pink
  else if(playersList[1].Email==user.email)//shat
  setAvatarImg('https://i.postimg.cc/Bb3Czh6Z/joud5.png')
  else if(playersList[2].Email==user.email)
  setAvatarImg( 'https://i.postimg.cc/VLYRBHpD/joud3.png')
  else  if(playersList[3].Email==user.email)
  setAvatarImg('https://i.postimg.cc/CKfHxynL/joud4.png')
  else if(playersList[4].Email==user.email)
  setAvatarImg('https://i.postimg.cc/RVV7nJJY/joud2.png')
  else 
  return 'https://placeimg.com/140/140/any'
}
const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'white',
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        borderRadius:1,
       
      }}
    />
  );
};



  return(

      <GiftedChat
      messages={messages}
    //  renderAvatar={null}

      renderUsernameOnMessage={true}
      onSend={messages => onSend(messages)}
      renderInputToolbar={props => customtInputToolbar(props)}
      user ={{
          _id: user.email,
          name:playerName,
          avatar:avatarImg,
      }}
      messagesContainerStyle={{
          backgroundColor: 'rgba(0,0,0,0.5)',
         
        }}

        showAvatarForEveryMessage={true}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                     color:'#4C5784',
                    },
                }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#D9E8F1',
                },
                right: {
                  backgroundColor: '#6B749B',
                },
              }}
            />
          );
        }}
      />
   
  )

}