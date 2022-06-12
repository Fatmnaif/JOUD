
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ref, getDocs, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import { db } from '../../config_firebase/firebase';
import { Dropdown } from 'react-native-element-dropdown';


export default function EditQuestions({route,navigation}) {
 
  const { id } = route.params;
  const [Levelone,setLevelone]=useState();
  const [Level1,setLevel1List] = useState([]);
  const [Questionis,setQuestionis]=useState('');
  const [Answer, setAnswer]= useState('');
  const [Point,  setPoint]=useState(0);
  const [QuestionLevel,setQuestionLevel]=useState(0);
  const [Choice0, setChoice0]= useState('');
  const [Choice1,setChoice1]=useState('');
  const [Choice2,setChoice2]=useState('');
  const [Choice3,setChoice3]=useState('');
  const [value,  setValue] = useState(0);
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState(0);

/////////////////New consts for all variabels

  const [NewQuestionis,setNewQuestionis]=useState('');
  const [NewAnswer, setNewAnswer]= useState('');
  const [NewPoint,  setNewPoint]=useState(0);
  const [NewQuestionLevel,setNewQuestionLevel]=useState(0);
  const [NewChoice0, setNewChoice0]= useState('');
  const [NewChoice1, setNewChoice1]=useState('');
  const [NewChoice2, setNewChoice2]=useState('');
  const [NewChoice3, setNewChoice3]=useState('');
  const [Newvalue,  setNewValue] = useState(null);
  const [Newvalue2, setNewValue2] = useState('');
  const [Newvalue3, setNewValue3] = useState(null);

  const NewChoices=[
    {label:NewChoice0},
    {label:NewChoice1},
    {label:NewChoice2},
    {label:NewChoice3}]

  const point = [
    { label: 'نقطة'     , value: 1 },
    { label: 'نقطتان'   , value: 2 },
    { label: 'ثلاثة نقاط', value: 3 }];
  const questionLevel = [
    { label: 'سهل ' , value: 1 },
    { label: 'متوسط', value: 2 },
    { label: 'صعب'  , value: 3 }];

  const AnswerList=[{label:Choice0,value:Choice0},
    {label:Choice1,value:Choice1},
    {label:Choice2,value:Choice2},
    {label:Choice3,value:Choice3}]

async function getLevel1(id){

  const docRef= doc(db, "Level one",id);
  const docSnap= await getDoc(docRef);

  setAnswer(docSnap.data().Answer),
  setChoice0(docSnap.data().Choices[0].label),
  setChoice1(docSnap.data().Choices[1].label),
  setChoice2(docSnap.data().Choices[2].label),
  setChoice3(docSnap.data().Choices[3].label),
  setPoint(docSnap.data().Point),
  setQuestionLevel(docSnap.data().QuestionLevel),
  setQuestionis(docSnap.data().Questionis)
};

useEffect(() =>{
  getLevel1(id)
  },[] ); 

async function EditQuestion() {
  // Alert.alert('hi')
    const docRef = doc(db, "Level one",id );
    const docSnap = await getDoc(docRef);
    let data = docSnap.data();
 
      if(NewQuestionis.length !=0)
      {updateDoc(doc(db, "Level one",id),{
        Questionis:NewQuestionis,
      })}
     
     if(NewChoices[0] != null)
      {updateDoc(doc(db, "Level one",id),{
        Choices:[NewChoices[0]]
      })}

      if(Newvalue.length !=0){
      {updateDoc(doc(db, "Level one",id),{
        Point: Newvalue
      })}}
   
     if(Newvalue2.length !=0)
      {updateDoc(doc(db, "Level one",id),{
        Answer: Newvalue2
      })}
   
     if(Newvalue3.length !=0)
      {updateDoc(doc(db, "Level one",id),{
        QuestionLevel: Newvalue3
      })}
    }

const renderItem = (item) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value}
    </View>
  );};

const renderItem2 = (item) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value}
    </View>
  );};

const renderItem3 = (item) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value}
    </View>
  );};


  return (
      <ScrollView>
        <View style={styles.container}>

        <View style={styles.rectanglesContainer}>
         <View style={styles.rectangle} />
         <View style={styles.rectangle2} />
         <View style={styles.rectangle3} />
        </View>
        <View style={styles.baseTop} />
        <Text style={styles.pagetitle}> إختيار من متعدد </Text>
        <Text style={styles.Note1}> يمكنك التعديل على أي من محتويات السؤال</Text>
        <Text style={styles.Note2}>والضغط على " تعديل " و" حذف " لحذف السؤال  </Text>

        <Text style={styles.title1}> السؤال :</Text>
        <Text style={styles.title2}> الإختيار الأول :</Text>
        <Text style={styles.title3}> الإختيار الثاني :</Text>
        <Text style={styles.title4}> الإختيار الثالث :</Text>
        <Text style={styles.title5}> الإختيار الرابع :</Text>
        <Text style={styles.title6}> الجواب :</Text>
        <Text style={styles.title7}> مستوى صعوبة السؤال :</Text>
        <Text style={styles.title8}> النقاط المستحقة :</Text>

        <TextInput
          placeholder={Questionis}
          onChangeText={(NewQuestionis)=>setNewQuestionis(NewQuestionis)}
          style={styles.input}
        />
        <TextInput
          placeholder={Choice0}
          onChangeText={(NewChoice0) => setNewChoice0(NewChoice0)}
          style={styles.input}
        />

        <TextInput
          placeholder={Choice1}
          onChangeText={(NewChoice1) => setNewChoice1(NewChoice1)}
          style={styles.input}
        />

        <TextInput
        placeholder={Choice2}
        onChangeText={(NewChoice2) => setNewChoice2(NewChoice2)}
        style={styles.input}
        />

        <TextInput
        placeholder={Choice3}
        onChangeText={(NewChoice3) => setNewChoice3(NewChoice3)}
        style={styles.input}
        />

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={point}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={Point}
        value={Newvalue}
        onChange={item =>{
          setNewValue(item.value);}}
        renderItem={renderItem}
        />

       <Dropdown
        style={styles.dropdown2}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={AnswerList}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={Answer}
        value={Newvalue2}
        onChange={item =>{
          setNewValue2(item.value);}}
        renderItem={renderItem2}
        />

       <Dropdown
        style={styles.dropdown3}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={questionLevel}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={QuestionLevel}
        value={Newvalue3}
        onChange={item =>{
          setNewValue3(item.value);}}
        renderItem={renderItem3}
        />

      <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>{EditQuestion()}}
                      style={styles.button}>
                <Text style={styles.buttonText}>تعديل</Text>
                </TouchableOpacity>
     </View>

                   {/* <View>
                    <Text style={styles.Question}>{Questionis}</Text>
                    <Text style={styles.Question}>{Answer}</Text>
                    <Text style={styles.Question}>{Choice0}</Text>
                    <Text style={styles.Question}>{Choice1}</Text>
                    <Text style={styles.Question}>{Choice2}</Text>
                    <Text style={styles.Question}>{Choice3}</Text>
                    <Text style={styles.Question}>{QuestionLevel}</Text> 
                    <Text style={styles.Question}>{Point}</Text>                    
                       </View>*/}
       </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent:'center',
  height:1100,
  width:500
},

contentContainer: {
  paddingVertical: 20
},

iconStyle: {
  width: 20,
  height: 20,
  right:250},

pagetitle:{
  //left:0.5,
  left:185,
  fontSize:25,
  color:'rgba(76, 87, 133, 1)',
  bottom:145},

title1:{
  left:308,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  bottom:120
},

title2:{
  left:265,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  bottom:50
},

title3:{
  left:265,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:15
},

title4:{
  left:265,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:70
},

title5:{
  left:265,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:130
},

title6:{
  left:303,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:190
},

title7:{
  left:203,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:335
},

title8:{
  left:237,
  fontSize:18,
  color:'rgba(76, 87, 133, 1)',
  top:230
},

Note1:{
  left:125,
  fontSize:16,
  color:'rgba(76, 87, 133, 1)',
  bottom:140},

Note2:{
  left:100,
  fontSize:16,
  color:'rgba(76, 87, 133, 1)',
  bottom:140},

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
  top:130,
  left:130,
  justifyContent:'center',
  transform: [{ rotate: "90deg" }],},

baseTop: {
  borderBottomWidth: 15,
  borderBottomColor: "rgba(76, 87, 133, 1)",
  borderLeftWidth: 20.5,
  borderLeftColor: "transparent",
  borderRightWidth: 20.5,
  borderRightColor: "transparent",
  transform: [{ rotate: "-90deg" }],
  left: 322,
  top:55,
  position: "absolute" },

buttonContainer:{
  width:'60%',
  justifyContent:'center',
  alignItems:'center',
  bottom:40,
  left:65},

button:{
  backgroundColor:'rgba(76, 87, 133, 1)',
  width:'50%',
  padding:10,
  borderRadius:50},

buttonText:{
  color:'white',
  padding:20,
  bottom:10,
  fontSize:16,
  fontWeight:'700',
  textAlign:'center'},

inputContainer:{
  height:15,
  padding:3,
  bottom:350,
  marginTop:20,
  textAlign:'center'},
  
input:{
  height:39,
  marginTop:45,
  paddingHorizontal:15,
  left:65,
  bottom:305,
  width:290,
  borderRadius:100,
  borderColor:'#DAE5EB',
  borderWidth:1,
  textAlign:'right'},

iconStyle: {
  width: 20,
  height: 20,
  right:250},
  item: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'},
  
textItem: {
  flex: 1,
  fontSize: 15,
  height:30},

placeholderStyle: {
  fontSize: 13,
  color: '#B7B7B7',
  textAlign:'right' },

selectedTextStyle: {
  fontSize: 13,
  color:'black',
  textAlign:'right'},

dropdown: {
  height:39,
  left:65,
  bottom:180,
  width:290,
  borderRadius:100,
  borderColor:'#DAE5EB',
  borderWidth:1,
  textAlign:'center'},
 
dropdown2: {
  height:39,
  left:65,
  bottom:300,
  width:290,
  borderRadius:100,
  borderColor:'#DAE5EB',
  borderWidth:1,
  textAlign:'center'},
 
dropdown3: {
  height:39,
  left:65,
  bottom:175,
  width:290,
  borderRadius:100,
  borderColor:'#DAE5EB',
  borderWidth:1,
  textAlign:'center'},

Question:{
  right:45,
  left:5,
  color:'#4C5785',
  fontSize:16,
  top: 15.17,
  paddingLeft:15,
  paddingRight:15,
  paddingVertical:15,
  margin:2,
  marginHorizontal:8,
  //padding:2,
  direction:'ltr',
  textAlign:'right',
  justifyContent:'space-evenly',
  borderColor:'#6F96B3',
  borderRadius:15,
  borderWidth:1},

})


















// import React,{useState} from 'react';
// import { Text, View ,Button} from 'react-native';
// import { Audio } from 'expo-av';


// const YourApp = () => {


//     const [sound, setSound] = useState();

//     async function playSound(soundName) {
//       let audio;
//       switch(soundName){
        
//           case 'alert-hp-2': audio = require('/Users/shahadfehaidalqhatni/s/assets/Alert-high-pitch-t1.mp3');break;
//           case 'alert-hp-1': audio = require('/Users/shahadfehaidalqhatni/s/assets/Alert-high-pitch-t2.mp3');break;
//           case 'pop-hp-2': audio = require('/Users/shahadfehaidalqhatni/s/assets/pop-high-pitch-3.mp3');break;
//           case 'pop-hp-3': audio = require('/Users/shahadfehaidalqhatni/s/assets/felix_blume_human_people_group_praying_whispering.mp3');break;
//       }
//       const { sound } = await Audio.Sound.createAsync(
//          audio
//       );
//       setSound(sound);
    
//       console.log('Playing Sound');
//       await sound.playAsync(); }
    
//     React.useEffect(() => {
//       return sound
//         ? () => {
//             console.log('Unloading Sound');
//             sound.unloadAsync(); }
//         : undefined;
//     }, [sound]);
    

//  return (
//    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//      <Text>
//        Try editing me! 🎉
//      </Text>

//      <Button title='Alert-high-pitch-t2' onPress={()=>{playSound('alert-hp-2')}}></Button>
//    </View>
//  );


// }

// export default YourApp;













