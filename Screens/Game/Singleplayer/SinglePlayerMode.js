import React, { Component, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  Pressable,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import FlashMessage from "react-native-flash-message";
import Board from "../Board";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Audio } from 'expo-av';
import { db, authentication } from "../../../config_firebase/firebase";
import { collection, getDocs, endAt, startAt, orderBy, query, limit, where, onSnapshot,addDoc, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { values } from "lodash";


//----------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  box: {
    flex: 4,
    marginTop: 150,
  },
  container: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    padding: 0,
    marginTop: 0,
  },
  board: {
    width: 50,
    height: 50,
    backgroundColor: "powderblue",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonbox: {
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor:"#5c879c",
    flex: 1,

  },
  buttonc: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    flex: 1,
  },
  buttonr: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    flex: 1,
  },
  buttonrestart: {
    width: 102,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  boxButton: {
    flexDirection: "row",
  },
  padd: {
    padding: 10,
  },
  padd0: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  showQbox: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
  },
  showQ: {
    backgroundColor: "powderblue",
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    width: 352,
    height: 340,
    flexDirection: "column",
    bottom: 260,
    left: 35,
    // opacity:0.5
    //margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  containerShowQ: {
    //flexDirection: "row",
    //alignItems: "center",
    padding: 10,
    //flex:1,
    flex: 1,
    width: 300,
    //height: 340,
  },
  tapee: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    width: 102,
    height: 40,
    left: 273,
    top: 2,
    position: "absolute",
    flex: 1,
  },
  pointt: {
    marginTop: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    width: 102,
    height: 40,
    left: 293,
    top: 88,
    padding: 10,
    //position: "absolute",
    flex: 1,
  },
  pointtbox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  info: {
    flex: 1,
    position: "absolute",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
    left: 13,
    top: 30,
    padding: 5,
  },
  textInfo: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textShowQ: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    padding: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  tt: {
    marginTop: 30,
    position: "absolute",
    width: 34,
    height: 33,
    left: 341,
    top: 33,
  },
});

export const fog = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../../../../assets/foggy.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  </View>
);

export const tape = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

export const pessimist = (
  <View style={{ top: 25, right: 5 }}>
    <Image
      source={require("../../../../assets/pessimist.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const close = (
  <ImageBackground
    source={require("../../../../assets/Assetcc.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></ImageBackground>
);

const Light = (
  <ImageBackground
    source={require("../../../../assets/Assetcc.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ImageBackground
      source={require("../../../../assets/highlight.png")}
      resizeMode="stretch"
      style={{
        width: 63,
        height: 65,
        resizeMode: "contain",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></ImageBackground>
  </ImageBackground>
);

export const den = (
  <ImageBackground
    source={require("../../../../assets/deanship.png")}
    resizeMode="stretch"
    style={{
      width: 63,
      height: 65,
      resizeMode: "contain",
      alignItems: "center",
      justifyContent: "center",
    }}
  ></ImageBackground>
);

const Tape2 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape3 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const Tape1 = (
  <View style={styles.pointtbox}>
    <Image
      source={require("../../../../assets/tape.png")}
      style={{ width: 30, height: 30, resizeMode: "contain" }}
    />
  </View>
);

const sta = " ";

//----------------------------------------------------------------------------------------------

export default function SinglePlayerMode({navigation,route}) {
  const { Boardf } = route.params;
  const [isModalVisible, setModalVisible] = useState(''); //
  // const [isModalVisible2, setModalVisible2] = useState(false); //
  // const [isLossPessimist, setLossPessimist] = useState(false);
  // const [isLossTape, setLossTape] = useState(false);
  // const [isWin, setWin] = useState(false);
  // const [finalAnswer, setFinalAnswer] = useState(0);
  let positionOfNextRoom;
  const [numberOfTape, setnumberOfTape] = useState(3);
  const [Point, setPoint] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState();
  const [questionType, setQuestionType] = useState();
  const [questionPoint, setQuestionPoint] = useState();

  const [point, setpoint] = useState(0);//navigation
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [ModalContent, setModalContent] = useState('');
  const [qlevelone, setqlevelone] = useState([]);
  // const [sound, setSound] = useState();
  const [questionLevel, setQuestionLevel] = useState();
  // const [myPath, setMyPath] = useState([0]);
  const [board1, setBoard1] = useState([]);
  const [random, setrandom] = useState(0);
  const [pssIndexs, setPssIndexs] = useState([]);
  const [fogIndexs, setFogIndexs] = useState([]);
  const [tapeIndexs, setTapeIndexs] = useState([]);
  const [styleb1, setStyleb1] = useState(styles.button);
  const [styleb2, setStyleb2] = useState(styles.button);
  const [styleb3, setStyleb3] = useState(styles.button);
  const [styleb4, setStyleb4] = useState(styles.button);

  let l = [];



  const questionLevelone=[
    [3,
    {Choices:["الطالبات","أعضاء هيئة التدريس ", "أعضاء الهيئة الإدارية ","جميع ما سبق "]}
    ,1,1,"ما دلالة مصطلح منسوبي الجامعة؟ ","إختيار من متعدد",468],
   
    [0,
      {Choices: ["متطلب للتميز والتنافس ","رفاهية وثانوية ", "أحد المتطلبات الغير مهمه ","تحقيقها قد يُمثل إنجاز "]}
      ,1,1,"تُعتبر الجودة الاكاديمية ……….","إختيار من متعدد",387],
      
     [3,
      {Choices: ["أعضاء هيئة التدريس ","إدارة الجامعة ", "طالبات الجامعة ","جميع منسوبات الجامعة "]}
        ,1,1,"الجودة هي من مسؤولية ……….","إختيار من متعدد",386],
       
       [0,
        {Choices:   ["صح","خطأ"]}
          ,1,1,"الطالبة هي المستهدف الأول من ضمان الجودة ","صح وخطأ",654],
       
          [0,
            {Choices:   ["صح","خطأ"]}
            ,1,1,"توفير فرص عمل أفضل بعد التخرج هي فائدة من ضمن فوائد الاعتماد الاكاديمي ","صح وخطأ",598],
         
            [0,
              {Choices:["صح","خطأ"]}
              ,1,1,"تحقق الجودة عندما تلبي المؤسسة التعليمية المعايير المطلوبة ","صح وخطأ",538],
         
              [1,
                {Choices:  ["تنوع البرامج الدراسية ","رفع تصنيف الجامعة عالمياً", "سهولة القبول الجامعي ","لا يساهم بشيء "]}
                ,1,1,"يُساهم الحصول على عدد من الاعتمادات الاكاديمية في ……….","إختيار من متعدد",438],
               
                [2,
                  {Choices:["حبي وقربي من أستاذة المقرر","درجاتي التي حصلت عليها بالمقرر", "الشفافية والحيادية والمصداقية","لا شيء مما سبق"]}
                  ,1,1,"تعبئة الاستبانات الخاصة بتقويم المقرر لابد ان تكون معتمدة على ………. ","إختيار من متعدد",386]]
 

  const questionLeveltwo=[
                    [1,
                      {Choices: ["صح", "خطأ"]}
                    ,2,2,"الجودة الاكاديمية هي نظام إداري يحدد مستوى البرامج التعليمية فقط مقارنةً بمعايير محددة بهدف التحسين المستمر ","صح وخطأ",321],
                   
                    [0,
                      {Choices: ["صح","خطأ"]}
                     ,2,2,"الجودة جهد جماعي تعاوني بين جميع قطاعات المؤسسة التعليمية ","صح وخطأ",180],
                      
                     [0,
                      {Choices: ["اعتراف من الهيئة باستيفاء المؤسسة لمعايير الجودة ","تحديد نقاط الضعف والقوة في المؤسسة ", "تقويم مدى تحقيق معايير التصنيف بالمؤسسة ","عملية مرحلية لتحسين الاداء في مجال التوظيف "]}
                      ,2,2,"المقصود بالاعتماد المؤسسي ……….","إختيار من متعدد",220],
                       
                       [2,
                        {Choices: ["أهداف الاستبانات ","مهام وكالة الجودة ","مواصفات خريجة الجامعة ","فوائد الاعتماد الاكاديمي "]}
                         ,2,2,"يُعد امتلاك مهارة التواصل والشراكة بفاعلية مع الأسرة ومؤسسات المجتمع المحلي من ……….","إختيار من متعدد",205],
                       
                          [0,
                            {Choices:["صح","خطأ"]}
                           ,2,2,"الجودة عملية متكاملة تغطي جميع مدخلات وعمليات العملية التعليمية ومخرجاتها ","صح وخطأ",153],
                         
                            [0,
                              {Choices:["اعتراف من الهيئة باستيفاء المؤسسة لمعايير الجودة ","تحديد نقاط الضعف والقوة في المؤسسة ","تقويم مدى تحقيق معايير التصنيف بالمؤسسة ","عملية مرحلية لتحسين الاداء في مجال التوظيف "]}
                             ,2,2,"المقصود بالاعتماد المؤسسي ……….","إختيار من متعدد",220],
                         
                              [3,
                                {Choices:["جودة المخرجات ","كفاءة أعضاء هيئة التدريس ", "برامج تعليمية مواكبة لسوق العمل ","جميع ما سبق "]}
                                ,2,2,"أي مما يلي يُعد من العوامل المساعدة في الحصول على الاعتمادات للجامعة؟ ","إختيار من متعدد",100],
                               
                                [3,
                                  {Choices: ["الرسالة والغايات والأهداف ","إدارة التعلم والتعليم، إدارة ضمان الجودة وتحسينها ", "إدارة شؤون الطلاب والخدمات المساندة ومصادر التعلم، والمرافق والتجهيزات","جميع ما سبق "]}
                                  ,2,2,"يعتمد الاعتماد الاكاديمي على مجموعة من المعايير لضمان جودة مؤسسات وبرامج التعليم العالي واعتمادها منها ……….","إختيار من متعدد",386]]
                 
  const questionLevelthree=[
                                    [2,
                                      {Choices: ["التواصل الفعال ", "التطوع والخدمة المجتمعية ","القيم والمهارات الشخصية ","جميع ما سبق "]}
                                    ,3,3,"من خصائص خريجة جامعة الأميرة نورة بنت عبدالرحمن: 1- الاعتزاز بالقيم الإسلامية 2-الاعتزاز بالهوية الوطنية والتي تتبع مجال ……….","إختيار من متعدد",129],
                                   
                                    [1,
                                      {Choices:  ["صح","خطأ"]}
                                     ,3,3,"رسالة المقرر هي من أهم مفاهيم الجودة ","صح وخطأ",780],
                                      
                                     [3,
                                      {Choices:["الجودة ","الاستبانة ", "البحث العلمي ","أداة التحليل الرباعي "] } 
                                      ,3,3," هو الذي يميز الاعتماد البرامجي للدراسات العليا عن البكالوريوس؟ ","إختيار من متعدد",238],
                                       
                                       [2,
                                        {Choices:  ["صح","خطأ"]}
                                         ,3,3,"المقصود بالمراجعة الداخلية هو عملية ضبط الجودة بالمؤسسة لتأهيلها للاعتماد ","صح وخطأ",427],
                                       
                                          [0,
                                            {Choices: ["صح","خطأ"]}
                                           ,3,3,"المجتمع من أهم الجهات أو الهيئات التي تهتم بوجود خريجة لديها المهارة التي تؤهلها لسوق العمل بالمستوى المطلوب  ","صح وخطأ",245],
                                         
                                            [1,
                                              {Choices: ["مجالين ","ثلاثة مجالات ","أربعة مجالات ","ستة مجالات "]}
                                             ,3,3,"كم عدد مجالات الخصائص لخريجة جامعة الأميرة نورة بنت عبدالرحمن؟ ","إختيار من متعدد",175],
                                         
                                             [0,
                                              {Choices: ["صح","خطأ"]}
                                              ,3,3,"يسعى البرنامج التعليمي لتطبيق معايير الجودة لتوفير الموضوعية والشفافية للحكم على البرنامج","صح وخطأ",327],
                                              [0,
                                                {Choices: ["صح","خطأ"]}
                                                ,3,3,"الخدمة لأعضاء المجتمع المحلي، وتفعيل المشاركة المجتمعية التي تقوم بها الكلية تعتبر عنصر مهم من عناصر الاعتماد الاكاديمي ","صح وخطأ",458]]
                                              
                                
const randoma=[0,1,2,3,4,5,6,7] ;

                  const [board, setBoard] = useState([
    sta,
    Light,
    close,
    close,
    close,
    close,
    Light,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    close,
    den,
  ]);

  let xx;

  useEffect(() => {
    let index=0
    while (index != 36) {
      if (Boardf[index] == 'p') {
     pssIndexs.push(index);
     board1[index]=pessimist;
      } else if(Boardf[index] == 'f') {
     fogIndexs.push(index);
     board1[index]=fog;
      } else if (Boardf[index] == 't' ) {
      tapeIndexs.push(index);
      board1[index]=tape;
      } else {
      board1[index]='';
      }
      index++;
      }
  }, []);


  let joudChar = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];

  let arrLight = [];

  let aa = [1, -1, 6, -6];

  const questionLevel1 = [0, 1, 2, 3, 6, 7, 8, 12, 13, 18];
  const questionLevel2 = [
    4, 5, 9, 10, 11, 14, 15, 16, 19, 20, 21, 24, 25, 26, 30, 31,
  ];
  const questionLevel3 = [17, 22, 23, 27, 28, 29, 32, 33, 34, 35];


  joudChar[roomNum] = (
    <Image
      source={require("../../../../assets/joud5.png")}
      style={{ width: 45, height: 45, resizeMode: "contain" }}
    />
  );

  let t;
  if (numberOfTape == 3) t = Tape3;
  else if (numberOfTape == 2) t = Tape2;
  else if (numberOfTape == 1) t = Tape1;

//--------------------------------------- new
  // useEffect(async () => {
  //   // const q = query(collection(db, 'Level one'),orderBy('serialNumber'))
  //   // const finish=  onSnapshot(q, (querySnapshot) => {
  //   //   setqlevelone(querySnapshot.docs.map(doc =>({ ...doc.data(),
  //   //      Questionis: doc.data().Questionis,
  //   //      Type: doc.data().Type,
  //   //      Answer: doc.data().Answer,
  //   //      Choices:doc.data().Choices,
  //   //      Point:doc.data().Point,
  //   //      }))
  //   //      )
  //   //   })
  //   const QuestionCol = collection(db, 'Level one');
  //   const QuestionSnapshot = await getDocs(QuestionCol);
  //   const QuestionList = (QuestionSnapshot.docs.map((doc) => doc.data()))
  //   setrandom(Math.floor(Math.random() * QuestionList.length))

  //   setqlevelone(QuestionList)

  //   let qac = (QuestionList[random]);

  //   setQuestion(qac.Questionis);
  //   setQuestionType(qac.Type);
  //   setQuestionPoint(qac.Point);
  //   setChoices(qac.Choices);
  //   //  setQuestionLevel(doc.data().QuestionLevel);
  //   setCorrectAnswer(qac.Answer);

  //   console.log('random : ', random)

  // }, [random])

  //-----------------------------------------------------بلوك خاص بالاتنبيهات
  
  
  function showFogWarnaing (){
    if (fogIndexs.includes(positionOfNextRoom)) {
      playSound('piss');
      showMessage({
        message: "!!احذري المحبطين قريبين منك ",
        type: "warning",
      });
    }
  };


  //--------------------------------------------------------------DataBase
  async function ChoessNextRoom(Next_Room) {

   if(isModalVisible==false){
    if (
      roomNum - 1 == Next_Room ||
      roomNum + 1 == Next_Room ||
      roomNum - 6 == Next_Room ||
      roomNum + 6 == Next_Room
    ) {
     playSound('pres');
      if (Next_Room == roomNum + 1) {
        //-----------------------------------------moveR
        if ((roomNum - 5) % 6 != 0) {
          positionOfNextRoom = (roomNum + 1);
        }
      } else if (Next_Room == roomNum - 1) {
        //-----------------------------------------moveL
        if (roomNum % 6 != 0) {
          positionOfNextRoom = (roomNum - 1);
        }
      } else if (Next_Room == roomNum - 6) {
        //-------------------------------------------moveUp
        if (roomNum > 5) {
          positionOfNextRoom = (roomNum - 6);
        }
      } else if (Next_Room == roomNum + 6) {
        //-----------------------------------------------moveD
        if (roomNum < 30) {
          positionOfNextRoom = (roomNum + 6);
        }
      }

      // setStyleb1(styles.buttonr);
      // setStyleb2(styles.buttonr);
      // setStyleb3(styles.buttonr);
      // setStyleb4(styles.buttonr);

      getQuestion();
      ModalC('Question');
      setModalVisible(true);

 }}}
  // console.log('board : ', pssIndexs)

  function ChoessAnswer(FinalAnswer) {
    playSound('pres');
    if (FinalAnswer == correctAnswer) {
     setTimeout(()=> setModalVisible(false),2000)
      setPoint(Point + questionPoint);
      move();
    }
    
    else if (FinalAnswer != correctAnswer) {
      playSound('wrong');
      setTimeout(()=> setModalVisible(false),2000)
      if (correctAnswer === 0)  setStyleb1(styles.buttonc);
      if (correctAnswer === 1)  setStyleb2(styles.buttonc);
      if (correctAnswer === 2)  setStyleb3(styles.buttonc);
      if (correctAnswer === 3)  setStyleb4(styles.buttonc);

      if (numberOfTape === 1) {
        endGame(2);
      } else {
        setnumberOfTape(numberOfTape - 1);

      }
    }
    setTimeout(() => setStyleb1(styles.button), 1000);

   setTimeout(() => setStyleb2(styles.button), 1000);

   setTimeout(() => setStyleb3(styles.button), 1000);

   setTimeout(() => setStyleb4(styles.button), 1000);
  }

  async function getQuestion (){
    let qac;
    let QuestionCol;
 if(questionLevel1.includes(roomNum)){
  QuestionCol = collection(db, "question1");
  
 }
 else if(questionLevel2.includes(roomNum)){
   QuestionCol = collection(db, "question2");


 }
 else if(questionLevel3.includes(roomNum)){
   QuestionCol = collection(db, "question3");

 }
  
 const QuestionSnapshot = await getDocs(QuestionCol);
 const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data().q);
 qac= QuestionList[Math.floor(Math.random() * QuestionList.length)];
 setQuestion(qac[4]);
 setQuestionType(qac[5]);
 setQuestionPoint(qac[2]);
 setChoices(qac[1].Choices);
 setQuestionLevel(qac[3]);
 setCorrectAnswer(qac[0]);

  
 

  }

  //console.log('question level one ==>',qlevelone[5])

  //console.log('ModalVisible',isModalVisible);
  // useEffect(async() => {
  //  const QuestionCol = collection(db, "Level one",);
  //   const QuestionSnapshot = await getDocs(QuestionCol);
  //   const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
  // //random = Math.floor(Math.random() * QuestionList.length);
  //   //  QuestionList[random]


  //   for (let index = 0; index < QuestionList.length; index++) {
  //   l.push(index)

  //   }
  // }, [])

  //console.log('random question',question)
  //console.log('modal', isModalVisible, question,'question type',questionType)

  useEffect(() => {
    getQuestion();
    ModalC('Question');
  }, [])

  //------------------------------------------------------------------
  function ModalC(Type) {
    console.log('inn modal contetnt')
    console.log('inn modal type', Type)
    console.log('inn  type', questionType)
    // if (Type == "Question") {

    // let  QuestionCol = collection(db, "QuestionsInfo",);
    // if (questionLevel1.includes(positionOfNextRoom)) {
    //   QuestionCol = collection(db, "Level one",);
    // }
    // else if (questionLevel2.includes(positionOfNextRoom)) {
    //   QuestionCol = collection(db, "Level two",);
    // }
    // else if (questionLevel3.includes(positionOfNextRoom)) {
    //   QuestionCol = collection(db, "Level three",);
    // }

    // QuestionSnapshot = await getDocs(QuestionCol);
    // QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());

    // random = Math.floor(Math.random() * QuestionList.length);
    //  QuestionList[random]
    // await updateDoc(doc(db, "Game", IDToBeSent), {
    //   CurrentQuestion: random,
    // });

    //   const docref = doc(db, "Game", IDToBeSent);
    //   await getDoc(docref).then((doc) => {
    //     randomQuestion = doc.get("CurrentQuestion");
    //   });
    //  // randomQuestion = QuestionList[random];

    // onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
    // randomQuestion=(snapshot.data().CurrentQuestion)
    // )
    if (questionType == 'إختيار من متعدد') {
      setModalContent(
        <View style={{ zIndex: 999 }} >
          {/* <View style={styles.showQ}> */}
          <Text style={styles.textShowQ}>{question}</Text>
          <View style={styles.showQbox}>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb1}
                onPress={() => {
                  // playSound('pop-hp-3')
                  if (correctAnswer === 0) {
                    setStyleb1(styles.buttonc);
                  } else {
                    setStyleb1(styles.buttonr);
                  }
                  ChoessAnswer(0);
                }}
              >
                <Text style={styles.text}>{choices[0]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb2}
                onPress={() => {
                  // playSound('pop-hp-2')
                  if (correctAnswer === 1) {
                    setStyleb2(styles.buttonc);
                  } else {
                    setStyleb2(styles.buttonr);
                  }
                  ChoessAnswer(1);
                }}
              >
                <Text style={styles.text}>{choices[1]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb3}
                onPress={() => {
                  // playSound('pop-hp-3')
                  if (correctAnswer === 2) {
                    setStyleb3(styles.buttonc);
                  } else {
                    setStyleb3(styles.buttonr);
                  }
                  ChoessAnswer(2);
                }}
              >
                <Text style={styles.text}>{choices[2]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb4}
                onPress={() => {
                  // playSound('pop-hp-3')
                  if (correctAnswer === 3) {
                    setStyleb4(styles.buttonc);
                  } else {
                    setStyleb4(styles.buttonr);
                  }
                  ChoessAnswer(3);
                }}
              >
                <Text style={styles.text}>{choices[3]}</Text>
              </Pressable>
            </View>
          </View>

        </View>
      );
    }
    else if (questionType == 'صح وخطأ') {
      setModalContent(
        <View style={{ zIndex: 999 }} >
          {/* <View style={styles.showQ}> */}
          <Text style={styles.textShowQ}>{question}</Text>
          <View style={styles.showQbox}>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb1}
                onPress={() => {
                  // playSound('pop-hp-3')
                  if (correctAnswer === 0) {
                    setStyleb1(styles.buttonc);
                  } else {
                    setStyleb1(styles.buttonr);
                  }
                  ChoessAnswer(0);
                }}
              >
                <Text style={styles.text}>{choices[0]}</Text>
              </Pressable>
            </View>
            <View style={styles.containerShowQ}>
              <Pressable
                style={styleb2}
                onPress={() => {
                
                  if (correctAnswer === 1) {
                    setStyleb2(styles.buttonc);
                  } else {
                    setStyleb2(styles.buttonr);
                  }
                  ChoessAnswer(1);
                }}
              >
                <Text style={styles.text}>{choices[1]}</Text>
              </Pressable>
            </View>
          </View>

        </View>
      );
    }
    //}
  }
  //------------------------------------------------------------------

  function endGame (type){
    //type{[1]LossPessimist or [2]LossTape or [3]Tape=0}

    //navigation.navigate("LossPessimist");
    if (type == 1) {
    
      navigation.navigate("SinglePlayerLossPessimist", { PoinT: Point  });
      //setLossPessimist(!isLossPessimist);
    } else if (type == 2) {
      navigation.navigate("SinglePlayerLossTape", { PoinT: Point  });
      //setLossTape(!isLossTape);
    } else if (type == 3) {
      playSound('win')
      navigation.navigate("SinglePlayreWin", { PoinT: Point  });
      const docref = doc(db, "player");
      getDoc(docref).then((doc) => {
        setpoint(doc.get("Point"));
        setTotalGame(doc.get("TotalGame"));
        setTotalWins(doc.get("TotalWins"));
      }); //setWin(!isWin);
    }
  };

  // const showConfirmDialog = () => {

  // //  Alert.alert("هل انت متأكد من انهاء اللعبة؟", [
  // //     {
  // //       text: "نعم",
  // //       onPress: () => {

  // // Alert.alert
  // //        navigation.navigate('Player_startgame');
  // //   //     },
  //   //   },
  //   //   {
  //   //     text: "لا",
  //   //   },
  //   // ]);
  // };

const [sound, setSound] = useState();

  async function playSound(soundName) {
    let audio;
    switch(soundName){
      case 'open': audio = require('../../../../assets/open.mp3'); break;
      case 'win': audio = require('../../../../assets/Win.mp3'); break;
      case 'wrong': audio = require('../../../../assets/wrong.mp3'); break;
      case 'piss': audio = require('../../../../assets/p.mp3'); break;
      case 'pres': audio = require('../../../../assets/Press.mp3'); break;
    }
    const { sound } = await Audio.Sound.createAsync(
       audio
    );
    setSound(sound);
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  function move() {

  if(tapeIndexs.includes(positionOfNextRoom)){
    board1[positionOfNextRoom]='';
    tapeIndexs=tapeIndexs.filter((value)=> value==positionOfNextRoom )
    if (
      numberOfTape != 3
    ) {
      setnumberOfTape(numberOfTape + 1);
    } else if ( numberOfTape == 3) {
      setPoint(Point + 3);
    }}
    showFogWarnaing(positionOfNextRoom);


    board[positionOfNextRoom] = board1[positionOfNextRoom];
    playSound('open');
    //-------------------------------------------------------------
    setRoomNum(positionOfNextRoom);

    if (pssIndexs.includes(positionOfNextRoom)) {
      endGame(1);
    }

    //-------------------------------------------------------------highlight adj room 

    let adjRoomNum = [];
    if ((positionOfNextRoom - 5) % 6 != 0) {
      adjRoomNum.push(positionOfNextRoom + 1);
    }
    if (positionOfNextRoom % 6 != 0) {
      adjRoomNum.push(positionOfNextRoom - 1);
    }
    if (positionOfNextRoom > 5) {
      adjRoomNum.push(positionOfNextRoom - 6);
    }
    if (positionOfNextRoom < 30) {
      adjRoomNum.push(positionOfNextRoom + 6);
    }
    console.log('adj', adjRoomNum)
    for (let i = 0; i < 36; i++) {

      if (board[i] == Light && adjRoomNum.includes(i) != true && i != 0 && i != 35) {
        board[i] = close;
      }
      else if (adjRoomNum.includes(i) && board[i] != Light && i != 0 && i != 35 && board[i] == close) {
        board[i] = Light;
      }
    }

    if (positionOfNextRoom === 35) {
      endGame(3)
    }

  }

  return (

    <MenuProvider>
      <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
        <View style={{ backgroundColor: "#FFF7F0", top: 15, left: 18 }}>
          <View style={styles.tapee}>{t}</View>
          <View style={styles.tt} opacity={1}>
            <Pressable
              onPress={() => {
                if (numberOfTape != 3 && Point >= 3 && isModalVisible==false) {
                  playSound('pres');
                  setnumberOfTape(numberOfTape + 1);
                  setPoint(Point - 3);
                }
              }}
            >
              <Image
                source={require("../../../../assets/Assetp.png")}
                style={{ width: 34, height: 33, resizeMode: "contain" }}
              />
            </Pressable>
          </View>
        </View>
        <Menu style={{ flex: 1, position: "absolute", top: 15 }}>
          <MenuTrigger>
            <View style={styles.info}>
              <Icon name="menu" size={25} color={"#FFF7F0"} />
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => { playSound('pres'); alert(`info`)}} text="تعليمات اللعبة" />
            <MenuOption
              onSelect={()=>{{ playSound('pres');Alert.alert(
                "",
                "هل انت متأكد من انهاء اللعبة؟",
          [{
                text: "لا",
                style: "cancel"},
              { text: "نعم", onPress: () => { navigation.navigate('Player_startgame');} }]
          );}}}
              text="انهاء اللعبه"
            />
          </MenuOptions>
        </Menu>
        {/* <Pressable
          style={styles.info}
          onPress={() => {
            Alert.alert("مرحبا بك بجود 3>");
          }}
        >
          <Image
            source={require(".../../../../assets/Asset1.png")}
            style={{ width: 48, height: 50, resizeMode: "contain" }}
          />
        </Pressable> */}

        <View style={styles.pointt}>
          <Text style={styles.text}>{Point} نقاط</Text>
        </View>

        {/* <View style={styles.buttonrestart}>
          <Button onPress={reStart} title="ReStart" color="red" />
        </View> */}

        <View style={styles.box}>
          <View style={styles.container}>
            <Pressable
              key={35}
              onPress={() => {
                {
                  ChoessNextRoom(35);
                }
              }}
            >
              <ImageBackground
                source={require("../../../../assets/deanship.png")}
                resizeMode="stretch"
                style={{
                  width: 63,
                  height: 65,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageBackground
                  style={{ width: 63, height: 65, flexDirection: "row" }}
                >
                  <View style={{ flex: "1.5", top: 5 }}>
                    <Text>{joudChar[35]}</Text>
                  </View>
                  <Text>{board[35]}</Text>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>

          <View style={styles.container}>
            {[34, 29].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[33, 28, 23].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
          <View style={styles.container}>
            {[32, 27, 22, 17].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[31, 26, 21, 16, 11].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[30, 25, 20, 15, 10, 5].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[24, 19, 14, 9, 4].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[18, 13, 8, 3].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[12, 7, 2].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            {[6, 1].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  {
                    ChoessNextRoom(i);
                  }
                }}
              >
                <ImageBackground
                  source={require("../../../../assets/roomm.png")}
                  resizeMode="stretch"
                  style={{
                    width: 63,
                    height: 65,
                    resizeMode: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    style={{ width: 63, height: 65, flexDirection: "row" }}
                  >
                    <View style={{ flex: "1.5", top: 5 }}>
                      <Text>{joudChar[i]}</Text>
                    </View>
                    <Text>{board[i]}</Text>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            <Pressable
              key={0}
              onPress={() => {
                {
                  ChoessNextRoom(0);
                }
              }}
            >
              <ImageBackground
                source={require("../../../../assets/roomm.png")}
                resizeMode="stretch"
                style={{
                  width: 63,
                  height: 65,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageBackground
                  style={{ width: 63, height: 65, flexDirection: "row" }}
                >
                  <View style={{ flex: "1.5", top: 5 }}>
                    <Text>{joudChar[0]}</Text>
                  </View>
                  <Text>{board[0]}</Text>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>

          {isModalVisible ?
            <View style={styles.showQ} >
              <Text>{ModalContent}</Text>
            </View>
            :
            null
          }

          {/* <Modal
            isVisible={isModalVisible}
            animationInTiming={60}
            animationOutTiming={900}
          >
            <View style={styles.showQ}>
              <Text style={styles.textShowQ}>{question}</Text>
              <View style={styles.showQbox}>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb1}
                    onPress={() => {
                    // playSound('pop-hp-3')
                      if (correctAnswer == 0) {
                        setStyleb1(styles.buttonc);
                      } else {
                        setStyleb1(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 0);
                    }}
                  >
                    <Text style={styles.text}>{choices[0]}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb2}
                    onPress={() => {
                      // playSound('pop-hp-2')
                      if (correctAnswer == 1) {
                        setStyleb2(styles.buttonc);
                      } else {
                        setStyleb2(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 1);
                    }}
                  >
                    <Text style={styles.text}>{choices[1]}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb3}
                    onPress={() => {
                      // playSound('pop-hp-3')
                      if (correctAnswer == 2) {
                        setStyleb3(styles.buttonc);
                      } else {
                        setStyleb3(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 2);
                    }}
                  >
                    <Text style={styles.text}>{choices[2]}</Text>
                  </Pressable>
                </View>
                <View style={styles.containerShowQ}>
                  <Pressable
                    style={styleb4}
                    onPress={() => {
                      // playSound('pop-hp-3')
                      if (correctAnswer == 3) {
                        setStyleb4(styles.buttonc);
                      } else {
                        setStyleb4(styles.buttonr);
                      }
                      displayQuestion(nexRoomNum, 3);
                    }}
                  >
                    <Text style={styles.text}>{choices[3]}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal> */}

          {/* <Modal
            isVisible={isModalVisible2}
            animationInTiming={60}
            animationOutTiming={900}
          >
            <View style={styles.showQ}>
              <Text>{question}</Text>

              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb1}
                  onPress={() => {
                    setStyleb1(styles.buttonc);
                    displayQuestion(nexRoomNum, 1);
                    {
                      /* {choices[0]}
                    
                  }}
                >
                  <Text style={styles.text}>صح</Text>
                  {/* {choices[0]}
                </Pressable>
                <View style={styles.padd}></View>
                <Pressable
                  style={styleb2}
                  onPress={() => {
                    setStyleb2(styles.buttonr);
                    displayQuestion(nexRoomNum, 2);
                    {
                      /* {choices[1]}
                    }
                  }}
                >
                  <Text style={styles.text}>خطأ</Text>
                  {/* {choices[1]}}
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal isVisible={isLossPessimist}>
            <LossTape />
          </Modal>
          <Modal isVisible={isLossTape}>
            <LossPessimist />
          </Modal>
          <Modal isVisible={isWin}>
            <Win />
          </Modal> */}

          {/* <View style={styles.board}>
            <Text>{roomNum}</Text>
          </View> */}
        </View>
        <FlashMessage />
      </View>
    </MenuProvider>
  );
}

// import React, { Component, useState, useEffect } from "react";

// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   Button,
//   ImageBackground,
//   Image,
//   Alert,
//   Pressable,
// } from "react-native";
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
//   MenuProvider,
// } from "react-native-popup-menu";
// import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
// import FlashMessage from "react-native-flash-message";
// import { showMessage, hideMessage } from "react-native-flash-message";
// import Board from "../Board";
// import LossPessimist from "./SingleplayerLossPessimist.js";
// import LossTape from "./SingleplayerLossTape.js";
// import Modal from "react-native-modal";
// import { Audio } from 'expo-av';
// import { db,authentication } from "../../../config_firebase/firebase";
// import { collection, getDocs, endAt, startAt, orderBy, query, limit, where, onSnapshot, doc, getDoc } from "firebase/firestore";
// import Win from "./SinglePlayerWin.js"; //position:"absolute",

// //----------------------------------------------------------------------------------------------------------------
// const styles = StyleSheet.create({
//   box: {
//     flex: 4,
//     marginTop: 150,
//   },
//   container: {
//     flex: 4,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   container2: {
//     flexDirection: "row",
//     padding: 0,
//     marginTop: 0,
//   },
//   board: {
//     width: 50,
//     height: 50,
//     backgroundColor: "powderblue",
//     borderColor: "black",
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonbox: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "#5c879c",
//     flex: 1,
//   },
//   buttonc: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "green",
//     flex: 1,
//   },
//   buttonr: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "red",
//     flex: 1,
//   },
//   buttonrestart: {
//     width: 102,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 4,
//     backgroundColor: "#fff",
//   },
//   boxButton: {
//     flexDirection: "row",
//   },
//   padd: {
//     padding: 10,
//   },
//   padd0: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 0,
//   },
//   showQbox: {
//     flex: 1,
//     flexDirection: "column",
//     //justifyContent: "center",
//     alignItems: "center",
//   },
//   showQ: {
//     backgroundColor: "powderblue",
//     borderColor: "black",
//     borderWidth: 3,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 20,
//     position: 'absolute',
//     width: 352,
//     height: 340,
//     flexDirection: "column",
//     bottom: 260,
//     left: 35,
//     // opacity:0.5
//     //margin: 10,
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
//   containerShowQ: {
//     //flexDirection: "row",
//     //alignItems: "center",
//     padding: 10,
//     //flex:1,
//     flex: 1,
//     width: 300,
//     //height: 340,
//   },
//   tapee: {
//     marginTop: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//     borderColor: "black",
//     borderWidth: 1,
//     backgroundColor: "#5c879c",
//     width: 102,
//     height: 40,
//     left: 273,
//     top: 2,
//     position: "absolute",
//     flex: 1,
//   },
//   pointt: {
//     marginTop: 30,
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//     borderColor: "black",
//     borderWidth: 1,
//     backgroundColor: "#5c879c",
//     width: 102,
//     height: 40,
//     left: 293,
//     top: 88,
//     padding: 10,
//     //position: "absolute",
//     flex: 1,
//   },
//   pointtbox: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     flex: 1,
//   },
//   info: {
//     flex: 1,
//     position: "absolute",
//     borderRadius: 50,
//     borderColor: "black",
//     borderWidth: 1,
//     backgroundColor: "#5c879c",
//     left: 13,
//     top: 30,
//     padding: 5,
//   },
//   textInfo: {
//     fontSize: 30,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
//   textShowQ: {
//     fontSize: 15,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     // justifyContent: "center",
//     // alignItems: "center",
//     textAlign: "center",
//     padding: 5,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   tt: {
//     marginTop: 30,
//     position: "absolute",
//     width: 34,
//     height: 33,
//     left: 341,
//     top: 33,
//   },
// });

// export const fog = (
//   <View style={{ top: 25, right: 5 }}>
//     <Image
//       source={require("../../../../assets/foggy.png")}
//       style={{ width: 45, height: 45, resizeMode: "contain" }}
//     />
//   </View>
// );

// export const tape = (
//   <View style={{ top: 25, right: 5 }}>
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//   </View>
// );

// export const pessimist = (
//   <View style={{ top: 25, right: 5 }}>
//     <Image
//       source={require("../../../../assets/pessimist.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//   </View>
// );

// const close = (
//   <ImageBackground
//     source={require("../../../../assets/Assetcc.png")}
//     resizeMode="stretch"
//     style={{
//       width: 63,
//       height: 65,
//       resizeMode: "contain",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   ></ImageBackground>
// );

// const Light = (
//   <ImageBackground
//     source={require("../../../../assets/Assetcc.png")}
//     resizeMode="stretch"
//     style={{
//       width: 63,
//       height: 65,
//       resizeMode: "contain",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   >
//     <ImageBackground
//       source={require("../../../../assets/highlight.png")}
//       resizeMode="stretch"
//       style={{
//         width: 63,
//         height: 65,
//         resizeMode: "contain",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     ></ImageBackground>
//   </ImageBackground>
// );

// export const den = (
//   <ImageBackground
//     source={require("../../../../assets/deanship.png")}
//     resizeMode="stretch"
//     style={{
//       width: 63,
//       height: 65,
//       resizeMode: "contain",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   ></ImageBackground>
// );

// const Tape2 = (
//   <View style={styles.pointtbox}>
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//   </View>
// );

// const Tape3 = (
//   <View style={styles.pointtbox}>
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//   </View>
// );

// const Tape1 = (
//   <View style={styles.pointtbox}>
//     <Image
//       source={require("../../../../assets/tape.png")}
//       style={{ width: 30, height: 30, resizeMode: "contain" }}
//     />
//   </View>
// );

// const sta = " ";

// //----------------------------------------------------------------------------------------------

// export default function SinglePlayerMode({ navigation }) {
//   const route = useRoute();
//   const [isModalVisible, setModalVisible] = useState(false); //
//   const [isModalVisible2, setModalVisible2] = useState(false); //
//   const [isLossPessimist, setLossPessimist] = useState(false);
//   const [isLossTape, setLossTape] = useState(false);
//   const [isWin, setWin] = useState(false);
//   let random; 
//   const [finalAnswer, setFinalAnswer] = useState(0);
//   const [positionOfNextRoom,setPositionOfNextRoom]= useState(0);
//   const [numberOfTape, setnumberOfTape] = useState(3);
//   const [Point, setPoint] = useState(0);
//   const [roomNum, setRoomNum] = useState(0);
//   const [nexRoomNum, setNexRoomNum] = useState(-1);
//   const [question, setQuestion] = useState();
//   const [correctAnswer, setCorrectAnswer] = useState();
//   const [questionType, setQuestionType] = useState();
//   const [questionPoint, setQuestionPoint] = useState();
//   const [point, setpoint] = useState(0);
//   const [choices, setChoices] = useState(["", "", "", "",]);
//   const [ModalContent, setModalContent] = useState('');

//   const [sound, setSound] = useState();
//   const [questionLevel, setQuestionLevel] = useState();
//   const [myPath, setMyPath] = useState([0]);
//   const [board1, setBoard1] = useState([]);
//   const [pssIndexs, setPssIndexs] = useState([]);
//   const [fogIndexs, setFogIndexs] = useState([]);
//   const [tapeIndexs, setTapeIndexs] = useState([]);
//   const [styleb1, setStyleb1] = useState(styles.button);
//   const [styleb2, setStyleb2] = useState(styles.button);
//   const [styleb3, setStyleb3] = useState(styles.button);
//   const [styleb4, setStyleb4] = useState(styles.button);
//   let l=[];
//   const [board, setBoard] = useState([
//     sta,
//     Light,
//     close,
//     close,
//     close,
//     close,
//     Light,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     close,
//     den,
//   ]);

//   let xx;
//   useEffect(() => {
//     xx = Board();
//     setBoard1(xx.Board);
//     setPssIndexs(xx.PssIndexs);
//     setFogIndexs(xx.FogIndexs);
//     setTapeIndexs(xx.TapeIndexs);
//   }, []);


//   let joudChar = [
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//     " ",
//   ];

//   let arrLight = [];

//   let aa = [1, -1, 6, -6];
//   const questionLevel1 = [0, 1, 2, 3, 6, 7, 8, 12, 13, 16];
//   const questionLevel2 = [
//     4, 5, 9, 10, 11, 14, 15, 19, 20, 21, 24, 25, 26, 30, 31,
//   ];
//   const questionLevel3 = [17, 22, 23, 32, 33, 34, 35];


//   joudChar[roomNum] = (
//     <Image
//       source={require("../../../../assets/joud5.png")}
//       style={{ width: 45, height: 45, resizeMode: "contain" }}
//     />
//   );

//   let t;
//   if (numberOfTape == 3) t = Tape3;
//   else if (numberOfTape == 2) t = Tape2;
//   else if (numberOfTape == 1) t = Tape1;

//   //-----------------------------------------------------بلوك خاص بالاتنبيهات
//   const showFogWarnaing = () => {
//     if (fogIndexs.includes(positionOfNextRoom)) {
//       showMessage({
//         message: "warning!!",
//         type: "warning",
//       });
//     }
//   };

//   //--------------------------------------------------------------DataBase
//   async function ChoessNextRoom(Next_Room) {

//     if (
//       roomNum - 1 == Next_Room ||
//       roomNum + 1 == Next_Room ||
//       roomNum - 6 == Next_Room ||
//       roomNum + 6 == Next_Room
//     ) {

//       setPositionOfNextRoom(Next_Room);
//         getQuestion();
//         ModalC('Question');
//         setModalVisible(true);

//     }

//   }
//   console.log('board : ', pssIndexs)
//    function ChoessAnswer(FinalAnswer) {
//     setModalVisible(false);
//     if (FinalAnswer == correctAnswer) {
//       setPoint(Point + questionPoint);
//       move();
//     }
//     else if (FinalAnswer != correctAnswer) {

//       if (correctAnswer == 0) setStyleb1(styles.buttonc);
//       if (correctAnswer == 1) setStyleb2(styles.buttonc);
//       if (correctAnswer == 2) setStyleb3(styles.buttonc);
//       if (correctAnswer == 3) setStyleb4(styles.buttonc);

//       if (numberOfTape === 1) {
//         endGame(2);
//       } else {
//         setnumberOfTape(numberOfTape - 1);

//       }
//     }

//   }

//   const getQuestion = async () => {

//     // const QuestionCol = doc(db, "Level one", 'uxZhGMPvG7yxZt91sw36');
//     // getDoc(QuestionCol).then((doc) => {
//     //   setQuestion(doc.get('Questionis'));
//     //   setQuestionType(doc.get('Type'));
//     //   setQuestionPoint(doc.get('Point'));
//     //   setChoices(doc.get('Choices'));
//     //   setQuestionLevel(doc.get('QuestionLevel'));
//     //   setCorrectAnswer(doc.get('Answer'));
//     // })
//     //const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
//     // let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];
//     // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
//     //     getQuestion();

 
//     // while(!found){
//     // let random = Math.floor(Math.random() * 1000)
//     // const q = query(collection(db,'Level one'),orderBy('serialNumber'),startAt(random),limit(1));
//     // const querySnapshot = await getDocs(q);
//     // querySnapshot.forEach((doc) => {
//     //   if(doc.data()!=undefined){
//     //     setQuestion(doc.data().Questionis);
//     //     setQuestionType(doc.data().Type);
//     //     setQuestionPoint(doc.data().Point);
//     //     setChoices(doc.data().Choices);
//     //     setQuestionLevel(doc.data().QuestionLevel);
//     //     setCorrectAnswer(doc.data().Answer);
//     //   found=true;
//     //  } });
//     // // console.log('while',question)
//     //    }

//     //  if(!found){
//     //   const q = query(collection(db,'QuestionsInfo'),orderBy('serialNumber'),endAt(27),limit(1));
//     //   const querySnapshot = await getDocs(q);
//     //   querySnapshot.forEach((doc) => {
//     //   console.log(doc.data().question);
//     //   setQuestion(doc.data().Questionis);
//     //   setQuestionType(doc.data().Type);
//     //   setQuestionPoint(doc.data().Point);
//     //   setChoices(doc.data().Choices);
//     //   setQuestionLevel(doc.data().QuestionLevel);
//     //   setCorrectAnswer(doc.data().Answer);
//     //   })


//     // }
//     // let found = false;
//     // random =Math.floor(Math.random() * 1000)

//     // const q = query(collection(db, 'Level one'),where('serialNumber','==',6));
    
//     // getDoc(q).then((doc) => {
//     //     setQuestion(doc.get('Questionis'));
//     //     setQuestionType(doc.get('Type'));
//     //     setQuestionPoint(doc.get('Point'));
//     //     setChoices(doc.get('Choices'));
//     //     setQuestionLevel(doc.get('QuestionLevel'));
//     //     setCorrectAnswer(doc.get('Answer'));
//     //   })
     
//    // const querySnapshot = await getDocs(q);
//     // querySnapshot.forEach((doc) => {
//     //   if (doc.data() != undefined) {
//     //     setQuestion(doc.data().Questionis);
//     //     setQuestionType(doc.data().Type);
//     //     setQuestionPoint(doc.data().Point);
//     //     setChoices(doc.data().Choices);
//     //     setQuestionLevel(doc.data().QuestionLevel);
//     //     setCorrectAnswer(doc.data().Answer);
//         // setQuestion('doc.data().Questionis');
//         // setQuestionType('إختيار من متعدد');
//         // setQuestionPoint(8);
//         // setChoices([{ label: 'pp' }, { label: 'df' }, { label: 'uo' }, { label: 'qwe' }]);
//         // setQuestionLevel('doc.data().QuestionLevel');
//         // setCorrectAnswer(0);
//     //   }
//     // })
//     let random = Math.floor(Math.random() * 1000)
//     let found = false;
//    while(!found){
//    const q = query(collection(db,'Level one'),orderBy('serialNumber'),startAt(random),limit(1));
//     const querySnapshot = await getDocs(q);
    
//     querySnapshot.forEach((doc) => {
//      if(doc.data()!=undefined)
//          setQuestion(doc.data().Questionis);
//          setQuestionType(doc.data().Type);
//          setQuestionPoint(doc.data().Point);
//          setChoices(doc.data().Choices);
//          setQuestionLevel(doc.data().QuestionLevel);
//          setCorrectAnswer(doc.data().Answer);
//     found=true;
//  });
//     }
//     console.log('l',l)
//     console.log('l333',random)
//  };

// console.log('ModalVisible',isModalVisible);
//   // useEffect(async() => {
//   //  const QuestionCol = collection(db, "Level one",);
//   //   const QuestionSnapshot = await getDocs(QuestionCol);
//   //   const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
//   // //random = Math.floor(Math.random() * QuestionList.length);
//   //   //  QuestionList[random]


//   //   for (let index = 0; index < QuestionList.length; index++) {
//   //   l.push(index)
      
//   //   }
//   // }, [])


//   console.log('modal', isModalVisible, question,'question type',questionType)

//   useEffect(() => {
//     getQuestion();
//     ModalC('Question');
//   }, [])

//   //------------------------------------------------------------------
//    function ModalC(Type) {
//     console.log('inn modal contetnt')
//     console.log('inn modal type',Type)
//     console.log('inn  type',questionType)
//     // if (Type == "Question") {

//       // let  QuestionCol = collection(db, "QuestionsInfo",);
//       // if (questionLevel1.includes(positionOfNextRoom)) {
//       //   QuestionCol = collection(db, "Level one",);
//       // }
//       // else if (questionLevel2.includes(positionOfNextRoom)) {
//       //   QuestionCol = collection(db, "Level two",);
//       // }
//       // else if (questionLevel3.includes(positionOfNextRoom)) {
//       //   QuestionCol = collection(db, "Level three",);
//       // }

//       // QuestionSnapshot = await getDocs(QuestionCol);
//       // QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());

//       // random = Math.floor(Math.random() * QuestionList.length);
//       //  QuestionList[random]
//       // await updateDoc(doc(db, "Game", IDToBeSent), {
//       //   CurrentQuestion: random,
//       // });

//       //   const docref = doc(db, "Game", IDToBeSent);
//       //   await getDoc(docref).then((doc) => {
//       //     randomQuestion = doc.get("CurrentQuestion");
//       //   });
//       //  // randomQuestion = QuestionList[random];

//       // onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
//       // randomQuestion=(snapshot.data().CurrentQuestion)
//       // )
//       if (questionType == 'إختيار من متعدد') {
//         setModalContent(
//           <View style={{ zIndex: 999 }} >
//             {/* <View style={styles.showQ}> */}
//             <Text style={styles.textShowQ}>{question}</Text>
//             <View style={styles.showQbox}>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb1}
//                   onPress={() => {
//                     // playSound('pop-hp-3')
//                     if (correctAnswer == 0) {
//                       setStyleb1(styles.buttonc);
//                     } else {
//                       setStyleb1(styles.buttonr);
//                     }
//                     ChoessAnswer(0);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[0].label}</Text>
//                 </Pressable>
//               </View>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb2}
//                   onPress={() => {
//                     // playSound('pop-hp-2')
//                     if (correctAnswer == 1) {
//                       setStyleb2(styles.buttonc);
//                     } else {
//                       setStyleb2(styles.buttonr);
//                     }
//                     ChoessAnswer(1);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[1].label}</Text>
//                 </Pressable>
//               </View>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb3}
//                   onPress={() => {
//                     // playSound('pop-hp-3')
//                     if (correctAnswer == 2) {
//                       setStyleb3(styles.buttonc);
//                     } else {
//                       setStyleb3(styles.buttonr);
//                     }
//                     ChoessAnswer(2);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[2].label}</Text>
//                 </Pressable>
//               </View>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb4}
//                   onPress={() => {
//                     // playSound('pop-hp-3')
//                     if (correctAnswer == 3) {
//                       setStyleb4(styles.buttonc);
//                     } else {
//                       setStyleb4(styles.buttonr);
//                     }
//                     ChoessAnswer(3);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[3].label}</Text>
//                 </Pressable>
//               </View>
//             </View>

//           </View>
//         );
//       }
//       else if (questionType == 'صح وخطأ') {
//         setModalContent(
//           <View style={{ zIndex: 999 }} >
//             {/* <View style={styles.showQ}> */}
//             <Text style={styles.textShowQ}>{question}</Text>
//             <View style={styles.showQbox}>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb1}
//                   onPress={() => {
//                     // playSound('pop-hp-3')
//                     if (correctAnswer == 0) {
//                       setStyleb1(styles.buttonc);
//                     } else {
//                       setStyleb1(styles.buttonr);
//                     }
//                     ChoessAnswer(0);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[0].label}</Text>
//                 </Pressable>
//               </View>
//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb2}
//                   onPress={() => {
//                     // playSound('pop-hp-2')
//                     if (correctAnswer == 1) {
//                       setStyleb2(styles.buttonc);
//                     } else {
//                       setStyleb2(styles.buttonr);
//                     }
//                     ChoessAnswer(1);
//                   }}
//                 >
//                   <Text style={styles.text}>{choices[1].label}</Text>
//                 </Pressable>
//               </View>
//             </View>

//           </View>
//         );
//       }
//     //}
//   }
//   //------------------------------------------------------------------

//   const endGame = (type) => {
//     //type{[1]LossPessimist or [2]LossTape or [3]Tape=0}

//     //navigation.navigate("LossPessimist");
//     if (type == 1) {
//       playSound('piss')
//       navigation.navigate("SinglePlayerLossPessimist", { PoinT: Point + questionPoint });
//       //setLossPessimist(!isLossPessimist);
//     } else if (type == 2) {
//       playSound('wrong')
//       navigation.navigate("SinglePlayerLossTape", { PoinT: Point + questionPoint });
//       //setLossTape(!isLossTape);
//     } else if (type == 3) {
//       playSound('win')
//       const docref = doc(db, "player", uid);
//       getDoc(docref).then((doc) => {
//         setpoint(doc.get("Point"));
//         setTotalGame(doc.get("TotalGame"));
//         setTotalWins(doc.get("TotalWins"));
//       });
//       navigation.navigate("SinglePlayreWin", { PoinT: Point + questionPoint });

//       //setWin(!isWin);
//     }
//   };
//   const showConfirmDialog = () => {
//     return Alert.alert("هل انت متأكد من انهاء اللعبة؟", [
//       {
//         text: "نعم",
//         onPress: () => {
//           navigation.navigate("StartUp");
//         },
//       },
//       {
//         text: "لا",
//       },
//     ]);
//   };
//   async function playSound(soundName) {
//     let audio;
//     switch (soundName) {
//       case 'open': audio = require('../../../../assets/open.mp3'); break;
//       case 'win': audio = require('../../../../assets/Win.mp3'); break;
//       case 'wrong': audio = require('../../../../assets/wrong.mp3'); break;
//       case 'piss': audio = require('../../../../assets/piss.mp3'); break;
//       case 'pres': audio = require('../../../../assets/Press.mp3'); break;

//     }
//     const { sound } = await Audio.Sound.createAsync(
//       audio
//     );
//     setSound(sound);

//     // console.log('Playing Sound');
//     await sound.playAsync();
//   }

//   React.useEffect(() => {
//     return sound
//       ? () => {
//         // console.log('hi Sound');
//         sound.unloadAsync();
//       }
//       : undefined;
//   }, [sound]);

//   function move() {

//     if (
//       tapeIndexs.includes(positionOfNextRoom) &&
//       numberOfTape != 3
//     ) {
//       setnumberOfTape(numberOfTape + 1);
//     } else if (tapeIndexs.includes(positionOfNextRoom) && numberOfTape == 3) {
//       setPoint(Point + 3);
//     }
//     showFogWarnaing(positionOfNextRoom);


//     board[positionOfNextRoom] = board1[positionOfNextRoom];
//     //-------------------------------------------------------------
//     setRoomNum(positionOfNextRoom);

//     if (pssIndexs.includes(positionOfNextRoom)) {
//       endGame(1);
//     }

//     //-------------------------------------------------------------highlight adj room 

//     let adjRoomNum = [];
//     if ((positionOfNextRoom - 5) % 6 != 0) {
//       adjRoomNum.push(positionOfNextRoom + 1);
//     }
//     if (positionOfNextRoom % 6 != 0) {
//       adjRoomNum.push(positionOfNextRoom - 1);
//     }
//     if (positionOfNextRoom > 5) {
//       adjRoomNum.push(positionOfNextRoom - 6);
//     }
//     if (positionOfNextRoom < 30) {
//       adjRoomNum.push(positionOfNextRoom + 6);
//     }
//     console.log('adj',adjRoomNum)
//     for (let i = 0; i < 36; i++) {

//       if (board[i] == Light && adjRoomNum.includes(i) != true && i != 0 && i != 35) {
//         board[i] = close;
//       }
//       else if (adjRoomNum.includes(i) && board[i] != Light && i != 0 && i != 35 && board[i] == close) {
//         board[i] = Light;
//       }
//     }

//     if (positionOfNextRoom === 35) {
//       endGame(3)
//     }

//   }

//   return (
//     <MenuProvider>
//       <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
//         <View style={{ backgroundColor: "#FFF7F0", top: 15, left: 18 }}>
//           <View style={styles.tapee}>{t}</View>
//           <View style={styles.tt} opacity={1}>
//             <Pressable
//               onPress={() => {
//                 if (numberOfTape != 3 && Point >= 3) {
//                   setnumberOfTape(numberOfTape + 1);
//                   setPoint(Point - 3);
//                 }
//               }}
//             >
//               <Image
//                 source={require("../../../../assets/Assetp.png")}
//                 style={{ width: 34, height: 33, resizeMode: "contain" }}
//               />
//             </Pressable>
//           </View>
//         </View>
//         <Menu style={{ flex: 1, position: "absolute", top: 15 }}>
//           <MenuTrigger>
//             <View style={styles.info}>
//               <Icon name="menu" size={25} color={"#FFF7F0"} />
//             </View>
//           </MenuTrigger>
//           <MenuOptions>
//             <MenuOption onSelect={() => alert(`info`)} text="Info" />
//             <MenuOption
//               onSelect={() => showConfirmDialog()}
//               text="انهاء اللعبه"
//             />
//           </MenuOptions>
//         </Menu>
//         {/* <Pressable
//           style={styles.info}
//           onPress={() => {
//             Alert.alert("مرحبا بك بجود 3>");
//           }}
//         >
//           <Image
//             source={require("../assets/Asset1.png")}
//             style={{ width: 48, height: 50, resizeMode: "contain" }}
//           />
//         </Pressable> */}

//         <View style={styles.pointt}>
//           <Text style={styles.text}>{Point} نقاط</Text>
//         </View>

//         {/* <View style={styles.buttonrestart}>
//           <Button onPress={reStart} title="ReStart" color="red" />
//         </View> */}

//         <View style={styles.box}>
//           <View style={styles.container}>
//             <Pressable
//               key={35}
//               onPress={() => {
//                 {
//                   ChoessNextRoom(35);
//                 }
//               }}
//             >
//               <ImageBackground
//                 source={require("../../../../assets/deanship.png")}
//                 resizeMode="stretch"
//                 style={{
//                   width: 63,
//                   height: 65,
//                   resizeMode: "contain",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <ImageBackground
//                   style={{ width: 63, height: 65, flexDirection: "row" }}
//                 >
//                   <View style={{ flex: "1.5", top: 5 }}>
//                     <Text>{joudChar[35]}</Text>
//                   </View>
//                   <Text>{board[35]}</Text>
//                 </ImageBackground>
//               </ImageBackground>
//             </Pressable>
//           </View>

//           <View style={styles.container}>
//             {[34, 29].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[33, 28, 23].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>
//           <View style={styles.container}>
//             {[32, 27, 22, 17].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[31, 26, 21, 16, 11].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[30, 25, 20, 15, 10, 5].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[24, 19, 14, 9, 4].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[18, 13, 8, 3].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[12, 7, 2].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             {[6, 1].map((i) => (
//               <Pressable
//                 key={i}
//                 onPress={() => {
//                   {
//                     ChoessNextRoom(i);
//                   }
//                 }}
//               >
//                 <ImageBackground
//                   source={require("../../../../assets/roomm.png")}
//                   resizeMode="stretch"
//                   style={{
//                     width: 63,
//                     height: 65,
//                     resizeMode: "contain",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <ImageBackground
//                     style={{ width: 63, height: 65, flexDirection: "row" }}
//                   >
//                     <View style={{ flex: "1.5", top: 5 }}>
//                       <Text>{joudChar[i]}</Text>
//                     </View>
//                     <Text>{board[i]}</Text>
//                   </ImageBackground>
//                 </ImageBackground>
//               </Pressable>
//             ))}
//           </View>

//           <View style={styles.container}>
//             <Pressable
//               key={0}
//               onPress={() => {
//                 {
//                   ChoessNextRoom(0);
//                 }
//               }}
//             >
//               <ImageBackground
//                 source={require("../../../../assets/roomm.png")}
//                 resizeMode="stretch"
//                 style={{
//                   width: 63,
//                   height: 65,
//                   resizeMode: "contain",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <ImageBackground
//                   style={{ width: 63, height: 65, flexDirection: "row" }}
//                 >
//                   <View style={{ flex: "1.5", top: 5 }}>
//                     <Text>{joudChar[0]}</Text>
//                   </View>
//                   <Text>{board[0]}</Text>
//                 </ImageBackground>
//               </ImageBackground>
//             </Pressable>
//           </View>
//         </View>

//         <View style={{ flex: 1 }}>

//           {isModalVisible ?
//             <View style={styles.showQ} >
//               <Text>{ModalContent}</Text>
//             </View>
//            :
//             null
//           } 

//           {/* <Modal
//             isVisible={isModalVisible}
//             animationInTiming={60}
//             animationOutTiming={900}
//           >
//             <View style={styles.showQ}>
//               <Text style={styles.textShowQ}>{question}</Text>
//               <View style={styles.showQbox}>
//                 <View style={styles.containerShowQ}>
//                   <Pressable
//                     style={styleb1}
//                     onPress={() => {
//                     // playSound('pop-hp-3')
//                       if (correctAnswer == 0) {
//                         setStyleb1(styles.buttonc);
//                       } else {
//                         setStyleb1(styles.buttonr);
//                       }
//                       displayQuestion(nexRoomNum, 0);
//                     }}
//                   >
//                     <Text style={styles.text}>{choices[0]}</Text>
//                   </Pressable>
//                 </View>
//                 <View style={styles.containerShowQ}>
//                   <Pressable
//                     style={styleb2}
//                     onPress={() => {
//                       // playSound('pop-hp-2')
//                       if (correctAnswer == 1) {
//                         setStyleb2(styles.buttonc);
//                       } else {
//                         setStyleb2(styles.buttonr);
//                       }
//                       displayQuestion(nexRoomNum, 1);
//                     }}
//                   >
//                     <Text style={styles.text}>{choices[1]}</Text>
//                   </Pressable>
//                 </View>
//                 <View style={styles.containerShowQ}>
//                   <Pressable
//                     style={styleb3}
//                     onPress={() => {
//                       // playSound('pop-hp-3')
//                       if (correctAnswer == 2) {
//                         setStyleb3(styles.buttonc);
//                       } else {
//                         setStyleb3(styles.buttonr);
//                       }
//                       displayQuestion(nexRoomNum, 2);
//                     }}
//                   >
//                     <Text style={styles.text}>{choices[2]}</Text>
//                   </Pressable>
//                 </View>
//                 <View style={styles.containerShowQ}>
//                   <Pressable
//                     style={styleb4}
//                     onPress={() => {
//                       // playSound('pop-hp-3')
//                       if (correctAnswer == 3) {
//                         setStyleb4(styles.buttonc);
//                       } else {
//                         setStyleb4(styles.buttonr);
//                       }
//                       displayQuestion(nexRoomNum, 3);
//                     }}
//                   >
//                     <Text style={styles.text}>{choices[3]}</Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </Modal> */}

//           {/* <Modal
//             isVisible={isModalVisible2}
//             animationInTiming={60}
//             animationOutTiming={900}
//           >
//             <View style={styles.showQ}>
//               <Text>{question}</Text>

//               <View style={styles.containerShowQ}>
//                 <Pressable
//                   style={styleb1}
//                   onPress={() => {
//                     setStyleb1(styles.buttonc);
//                     displayQuestion(nexRoomNum, 1);
//                     {
//                       /* {choices[0]}
                    
//                   }}
//                 >
//                   <Text style={styles.text}>صح</Text>
//                   {/* {choices[0]}
//                 </Pressable>
//                 <View style={styles.padd}></View>
//                 <Pressable
//                   style={styleb2}
//                   onPress={() => {
//                     setStyleb2(styles.buttonr);
//                     displayQuestion(nexRoomNum, 2);
//                     {
//                       /* {choices[1]}
//                     }
//                   }}
//                 >
//                   <Text style={styles.text}>خطأ</Text>
//                   {/* {choices[1]}}
//                 </Pressable>
//               </View>
//             </View>
//           </Modal>

//           <Modal isVisible={isLossPessimist}>
//             <LossTape />
//           </Modal>
//           <Modal isVisible={isLossTape}>
//             <LossPessimist />
//           </Modal>
//           <Modal isVisible={isWin}>
//             <Win />
//           </Modal> */}

//           {/* <View style={styles.board}>
//             <Text>{roomNum}</Text>
//           </View> */}
//         </View>
//         <FlashMessage />
//       </View>
//     </MenuProvider>
//   );
// }

