import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TextInput, Image, ScrollView } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc, docs, query, limit, getDoc, getDocs, snapshot } from "firebase/firestore";
import { Octicons } from '@expo/vector-icons';
import { db } from '../../config_firebase/firebase';
import { async } from '@firebase/util';


export default function QuestionsView({ route, navigation }) {

  const [Questions, setQuestions] = useState([""])
  const [filtered1, setFiltered1] = useState([])
  const [filtered2, setFiltered2] = useState([])
  const [filtered3, setFiltered3] = useState([])
  const [searching, setSearching] = useState(false)
  const [Levelone, setLevelOne] = useState([]);
  const [Leveltwo, setLeveltwo] = useState([]);
  const [Levelthree, setLevelthree] = useState([]);
  const [questionsearch, setQuestionsearch] = useState('');
  const [LeveloneView, setLeveloneView] = useState([]);
  const [LeveltwoView, setLeveltwoView] = useState([]);
  const [LevelthreeView, setLevelthreeView] = useState([]);


  useEffect(() => {
    onSnapshot(collection(db, "Level three"), (snapshot) =>
      setLevelthree(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    setLevelsView();
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "Level two"), (snapshot) =>
      setLeveltwo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "Level one"), (snapshot) =>
      setLevelOne(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
  }, []);

  async function setLevelsView() {

    const questionRef = collection(db, 'Level three');
    const q = query(questionRef, limit(3));
    const querySnapshot = await getDocs(q);
    setLevelthreeView(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setFiltered3(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    const questionRef2 = collection(db, 'Level two')
    const q2 = query(questionRef2, limit(3));
    const querySnapshot2 = await getDocs(q2);
    setLeveltwoView(querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setFiltered2(querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


    const questionRef1 = collection(db, 'Level one')
    const q1 = query(questionRef1, limit(3));
    const querySnapshot1 = await getDocs(q1);
    setLeveloneView(querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setFiltered1(querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  }



  function SendQuestion(id, Type) {
    if (Type == "إختيار من متعدد") {
      navigation.navigate("EditiMcq", { id })

    } else if (Type == "صح وخطأ")
      navigation.navigate("EditiTfq", { id })
  }

  const onSearch = (text) => {

    if (text) {
      setSearching(true)
      const tempList = Levelone.filter(item => {
        if (item.Questionis.match(text))
          return item.Questionis
      })
      setFiltered1(tempList)
    }
    else {
      setSearching(false)
      setFiltered1(LeveloneView)
    }
    if (text) {
      setSearching(true)
      //const temp = text.toLowerCase()
      const tempList = Leveltwo.filter(item => {
        if (item.Questionis.match(text))
          return item.Questionis
      })
      setFiltered2(tempList)
    }
    else {
      setSearching(false)
      setFiltered2(LeveltwoView)
    }
    if (text) {
      setSearching(true)
      //const temp = text.toLowerCase()
      const tempList = Levelthree.filter(item => {
        if (item.Questionis.match(text))
          return item.Questionis
      })
      setFiltered3(tempList)
    }
    else {
      setSearching(false)
      setFiltered3(LevelthreeView)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.rectangle1} />
        <View style={styles.rectangle2} />
        <View style={styles.rectangle3} />
        <View style={styles.baseTop} />
        <Text style={styles.Pagtitle}> الأسئلة </Text>
        <View style={styles.Search_Bar}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Image style={styles.Back_icon}
              source={require('../../../assets/Backicon.png')} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder={'بحث عن سؤال'}
            onChangeText={onSearch}
          />
          <Octicons style={styles.saerchicon} name="search" size={15} color="gray" />

        </View>

        <View style={styles.QuestionsList}>
          <ScrollView>
            <View>

              {filtered3.map((item3) => {
                return (
                  <View key={item3.id}>
                    <TouchableOpacity onPress={() => { SendQuestion(item3.id, item3.Type) }}>
                      <Text style={styles.Question}> {item3.Questionis} </Text>

                    </TouchableOpacity>

                  </View>



                )
              })}
            </View>
            <View >
              {filtered1.map((item1) => {
                return (
                  <View key={item1.id}>
                    <TouchableOpacity onPress={() => { SendQuestion(item1.id, item1.Type) }}>
                      <Text style={styles.Question}> {item1.Questionis} </Text>
                    </TouchableOpacity>
                  </View>)
              })}
            </View>

            <View>
              {filtered2.map((item2) => {
                return (
                  <View key={item2.id}>
                    <TouchableOpacity onPress={() => { SendQuestion(item2.id, item2.Type) }}>
                      <Text style={styles.Question}> {item2.Questionis} </Text>
                    </TouchableOpacity>
                  </View>)
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.circle}>

        <TouchableOpacity onPress={() => navigation.navigate('TypeOfQuestion')}>
          <Image style={styles.plusicon}
            source={require('../../../assets/plusicon.png')} />
        </TouchableOpacity>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  Pagtitle: {
    color: '#4C5785',
    height: 25,
    fontWeight: '700',
    fontSize: 20,
    alignContent: 'center',
    position: 'absolute',
    left: '59%',
    top: '80%',
    bottom: '87.44%',
  },

  Search_Bar: {
    position: 'absolute',
    width: 305,
    height: 41,
    left: 53,
    top: 210,
  },

  textInput: {
    position: 'absolute',
    left: '3.8%',
    right: '5.8%',
    top: '31.88%',
    bottom: '72.66%',
    fontSize: 13,
    height: 39,
    width: 300,
    color: '#4C5785',
    backgroundColor: '#fff',
    borderColor: '#6F97B1',
    borderWidth: 1,
    borderRadius: 33,
    textAlign: 'center'
  },
  saerchicon: {
    left: 265,
    top: 25
  },
  QuestionsList: {
    position: 'absolute',
    left: '15.8%',
    right: '5.8%',
    top: '235%',
    bottom: '40.66%',
    width: 300,
    height: 440,
    color: '#6F97B1',
    backgroundColor: '#fff',
    borderColor: '#DAE5EB',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'stretch',
    // marginVertical:8,
    padding: 5,
  },

  Question: {
    right: 45,
    left: 5,
    color: '#4C5785',
    fontSize: 16,
    top: 15.17,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 15,
    margin: 2,
    marginHorizontal: 8,
    //padding:2,
    direction: 'ltr',
    textAlign: 'right',
    justifyContent: 'space-evenly',
    borderColor: '#6F96B3',
    borderRadius: 15,
    borderWidth: 1
  },



  rectangle1: {
    width: 30,
    height: 40,
    top: 80,
    left: 360,
    backgroundColor: "rgba(111, 151, 177, 1)",
  },

  rectangle2: {
    width: 30,
    height: 40,
    top: 40,
    left: 390,
    backgroundColor: "#BBCEDB",
  },

  rectangle3: {
    width: 30,
    height: 40,
    top: 0,
    left: 330,
    backgroundColor: "rgba(76, 87, 133, 1)",
  },

  baseTop: {
    borderBottomWidth: 15,
    borderBottomColor: "rgba(76, 87, 133, 1)",
    borderLeftWidth: 20.5,
    borderLeftColor: "transparent",
    borderRightWidth: 20.5,
    borderRightColor: "transparent",
    transform: [{ rotate: "-90deg" }],
    left: 302,
    top: 92.5,
    position: "absolute",
  },
  circle: {
    position: 'absolute',
    left: 340,
    bottom: 105,
    height: 41,
    width: 41,
    borderRadius: 30,
    borderColor: '#6F97B1',
    borderWidth: 2
  },

  plusicon: {
    left: 6,
    bottom: -6.33,
    width: 25,
    height: 25
  },
  Back_icon: {
    position: 'absolute',
    left: -10.47,
    width: 25,
    height: 20,
    top: -110.78,
  },
  settingicon: {
    position: 'absolute',
    left: 25,
    width: 34,
    height: 30,
    bottom: -12,
    borderRadius: 10
  },
});



