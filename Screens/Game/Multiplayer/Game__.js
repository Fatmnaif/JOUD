
import React, { useState, useEffect, useLayoutEffect } from "react";
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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Audio } from 'expo-av';

// import Board from "./board.js";
// import LossPessimist from "./piss.js";
// import LossTape from "/Users/shahadfehaidalqhatni/s/src/Screens/Game/Single_player/LossTape.js";
import Modal from "react-native-modal";
import { db, authentication } from "../../../config_firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
  querySnapshot,
  where,
  arrayUnion,
  arrayRemove,
  getDoc,
  addDoc,
} from "firebase/firestore";


//----------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  ChatDesign: {
    width: 50,
    height: 50,
    padding: 1,
    margin: '30%',
    left: '35%',
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5c879c",
  },
  chat: {
    left: '13%',
    bottom: '40%'
  },

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
    backgroundColor: "#5c879c",
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
  showQbox1: {
    flex: 1,
    flexDirection: 'row',
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
    left: 273,
    top: 68,
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

//----------------------------------------------------------------------------------------------------------------
export default function Game({ navigation, route }) {

  const { IDToBeSent } = route.params;
 // const IDToBeSent='0HxZp9Uwo'
  const [isModalVisible, setModalVisible] = useState(false); //
  const [isExplorerModalVisible, setExplorerModalVisible] = useState(false); //
  const [isModalVisible2, setModalVisible2] = useState(false); //
  const [isLossPessimist, setLossPessimist] = useState(false);
  const [isLossTape, setLossTape] = useState(false);
  const [isWin, setWin] = useState(false);
  const [PlayerExplorer, setPlayerExplorer] = useState("");
  let finalAnswer;
  let finalExplorer;
  let host;
  let randomQuestion;
  let random
  //, setRandom] = useState(
  // {
  //   Answer: 1,
  //   Choices:  [{abel: "",},{label: "",},{ label: "",},{label: "6",},],Point: 0,QuestionLevel: -1,Questionis: "",Type: "",serialNumber:0,}
  //   );
  const [ModalContent, setModalContent] = useState("");
  const [questionLevel, setQuestionLevel] = useState("");
  const [positionOfNextRoom, setPositionOfNextRoom] = useState();
  const [numberOfTape, setnumberOfTape] = useState();
  const [Point, setPoint] = useState(0);
  const [roomNum, setRoomNum] = useState();
  const [nexRoomNum, setNexRoomNum] = useState();
  const [sound, setSound] = useState();
  //Point Type QuestionLevel

  //let question; //let correctAnswer = 1;
  // let correctAnswer;
  // let questionType; //let correctAnswer = 1;QuestionLevel
  // let questionPoint;
  //const [point, setpoint] = useState(0);
  let Player = [];
  // let choices = ["", "", "", ""];
const [currentq,setcurrentq]=useState([-1,{Choices:['','','','']},
0,0,"","",-1]);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [questionType, setQuestionType] = useState(); //let correctAnswer = 1;QuestionLevel
  const [questionPoint, setQuestionPoint] = useState();
  const [point, setpoint] = useState(0);
  const [choices, setChoices] = useState([
    { label: "" },
    { label: "" },
    { label: "" },
    { label: "" },
  ]);
  // let questionLevel;
  let arrLight = [];
  let aa = [1, -1, 6, -6];

  const [myPath, setMyPath] = useState([]); //let myPath = [0]; ||setTheArray([...myPath, ]);//const [myPath, setMyPath] = useState([0]);
  const [board1, setBoard1] = useState([]);

  const [pssIndexs, setPssIndexs] = useState([]);
  const [fogIndexs, setFogIndexs] = useState([]);
  const [tapeIndexs, setTapeIndexs] = useState([]);
  const [question, setQuestion] = useState('');
  const [styleb1, setStyleb1] = useState(styles.button);
  const [styleb2, setStyleb2] = useState(styles.button);
  const [styleb3, setStyleb3] = useState(styles.button);
  const [styleb4, setStyleb4] = useState(styles.button);

  let Player_room1 = [];
  let Player_room2 = [];
  let Player_room3 = [];
  let Player_room4 = [];

  let Player_Answer1 = [];
  let Player_Answer2 = [];
  let Player_Answer3 = [];
  let Player_Answer4 = [];

  let Player_Explorer1 = [];
  let Player_Explorer2 = [];
  let Player_Explorer3 = [];
  let Player_Explorer4 = [];
  let Player_Explorer5 = [];

  const questionLevel1 = [0, 1, 2, 3, 6, 7, 8, 12, 13, 18];
  const questionLevel2 = [
    4, 5, 9, 10, 11, 14, 15, 16, 19, 20, 21, 24, 25, 26, 30, 31,
  ];
  const questionLevel3 = [17, 22, 23, 27, 28, 29, 32, 33, 34, 35];

  //const IDToBeSent = "E13PhcpHR";
  const [QuestionModal, setQuestionModal] = useState();
  const [ExplorerModal, setExplorerModal] = useState();

  const [vote, setVote] = useState([]);
  const [vote2, setVote2] = useState([]);
  const [vote3, setVote3] = useState([]);
  const [vote4, setVote4] = useState([]);

  const [Player1Position, setPlayer1Position] = useState();
  const [Player2Position, setPlayer2Position] = useState();

  const [Player1ActiveState, setPlayer1ActiveState] = useState(true);
  const [Player2ActiveState, setPlayer2ActiveState] = useState(false);

  const [board, setBoard] = useState([]);
  const [Board__, setBoardــ] = useState([]);
  let xx;

  const user = authentication.currentUser;

  const [Players, setPlayers] = useState([{}, {}, {}]);

  let ActivePlayer = [];
  let ActivePlayerName = [];
  let nextromm;
  const [board_db, setboard_db] = useState([]);
  const [gameStatus, setGameStatus] = useState();

  const randoma=[0,1,2,3,4,5,6,7] ;

  // const questionLevelone=[{Answer:3,
  //   Choices:[{label:"الطالبات"},{label:"أعضاء هيئة التدريس "},{label: "أعضاء الهيئة الإدارية "},{label:"جميع ما سبق "}]
  //   ,Point:1,QuestionLevel:1,Questionis:"ما دلالة مصطلح منسوبي الجامعة؟ ",Type:"إختيار من متعدد",serialNumber:468},
   
  //   {Answer:0,
  //     Choices:[{label:"متطلب للتميز والتنافس "},{label:"رفاهية وثانوية "},{label: "أحد المتطلبات الغير مهمه "},{label:"تحقيقها قد يُمثل إنجاز "}]
  //     ,Point:1,QuestionLevel:1,Questionis:"تُعتبر الجودة الاكاديمية ……….",Type:"إختيار من متعدد",serialNumber:387},
      
  //     {Answer:3,
  //       Choices:[{label:"أعضاء هيئة التدريس "},{label:"إدارة الجامعة "},{label: "طالبات الجامعة "},{label:"جميع منسوبات الجامعة "}]
  //       ,Point:1,QuestionLevel:1,Questionis:"الجودة هي من مسؤولية ……….",Type:"إختيار من متعدد",serialNumber:386},
       
  //       {Answer:0,
  //         Choices:[{label:"صح"},{label:"خطأ"}]
  //         ,Point:1,QuestionLevel:1,Questionis:"الطالبة هي المستهدف الأول من ضمان الجودة ",Type:"صح وخطأ",serialNumber:654},
       
  //         {Answer:0,
  //           Choices:[{label:"صح"},{label:"خطأ"}]
  //           ,Point:1,QuestionLevel:1,Questionis:"توفير فرص عمل أفضل بعد التخرج هي فائدة من ضمن فوائد الاعتماد الاكاديمي ",Type:"صح وخطأ",serialNumber:598},
         
  //           {Answer:0,
  //             Choices:[{label:"صح"},{label:"خطأ"}]
  //             ,Point:1,QuestionLevel:1,Questionis:"تحقق الجودة عندما تلبي المؤسسة التعليمية المعايير المطلوبة ",Type:"صح وخطأ",serialNumber:538},
         
  //             {Answer:1,
  //               Choices:[{label:"تنوع البرامج الدراسية "},{label:"رفع تصنيف الجامعة عالمياً"},{label: "سهولة القبول الجامعي "},{label:"لا يساهم بشيء "}]
  //               ,Point:1,QuestionLevel:1,Questionis:"يُساهم الحصول على عدد من الاعتمادات الاكاديمية في ……….",Type:"إختيار من متعدد",serialNumber:438},
               
  //               {Answer:2,
  //                 Choices:[{label:"حبي وقربي من أستاذة المقرر"},{label:"درجاتي التي حصلت عليها بالمقرر"},{label: "الشفافية والحيادية والمصداقية"},{label:"لا شيء مما سبق"}]
  //                 ,Point:1,QuestionLevel:1,Questionis:"تعبئة الاستبانات الخاصة بتقويم المقرر لابد ان تكون معتمدة على ………. ",Type:"إختيار من متعدد",serialNumber:386},]
 
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
                                                              
                                                                   
 let qac; 

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setBoardــ(snapshot.data().Board)
      ), 
    []
  );
  // console.log('id room :', IDToBeSent);
  for (let index = 0; index < 36; index++) {
    if (Board__[index] == "p") {
      board1[index] = pessimist;
      pssIndexs.push(index);
    } else if (Board__[index] == "f") {
      board1[index] = fog;
      fogIndexs.push(index);
    } else if (Board__[index] == "t") {
      board1[index] = tape;
      tapeIndexs.push(index);
    }
  }

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setQuestionModal(snapshot.data().QuestionModal)
      ),
    []
  );
  // setMyPath;
  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setMyPath(snapshot.data().MyPath)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setboard_db(snapshot.data().CurrentBoard)
      ),
    []
  );
  
  for (let index = 0; index < board_db.length; index++) {
    if (board_db[index] == "piss") {
      // playSound('piss')
      board[index] = pessimist;
    } else if (board_db[index] == "fog") {
      board[index] = fog;
    } else if (board_db[index] == "tape") {
      board[index] = tape;
    } else if (board_db[index] == "close") {
      board[index] = close;
    } else if (board_db[index] == "light") {
      board[index] = Light;
    } else if (board_db[index] == "den") {
      // playSound('win')
      board[index] = den;
    } else {
      board[index] = "";
    }
  }

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setExplorerModal(snapshot.data().ExplorerModal)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setPoint(snapshot.data().Points)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setnumberOfTape(snapshot.data().NumberOftape)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setRoomNum(snapshot.data().currentPosition)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setPlayers(snapshot.data().Players)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setGameStatus(snapshot.data().GameStatus)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        setPositionOfNextRoom(snapshot.data().NextPosition)
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
        finalExplorer = (snapshot.data().FinalExplorer)
      ),
    []
  );
  
  // setQuestion(qac[4]);
  // setQuestionType(qac[5]);
  // setQuestionPoint(qac[2]);
  // setChoices(qac[1]);
  // setQuestionLevel(qac[3]);
  // setCorrectAnswer(qac[0]);

  useEffect(
    async () =>
      onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
      setcurrentq(snapshot.data().CurrentQuestion)
      ),
    []
  );  

  // useEffect(
  //   async () =>{
  //     // onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>{
  //     //   qac=(snapshot.data().CurrentQuestion)
  //     //   setQuestion(qac[4]);
  //     //   setQuestionType(qac[5]);
  //     //   setQuestionPoint(qac[2]);
  //     //   setChoices(qac[1]);
  //     //   setQuestionLevel(qac[3]);
  //     //   setCorrectAnswer(qac[0]);
  //     // } ),
  //     const currentq = doc(db, "Game", IDToBeSent);
  //     getDoc(currentq).then((doc) => {
  //       qac=doc.get('CurrentQuestion')
  //       setQuestion(qac.Questionis)
  //       setQuestionType(qac.Type)
  //       setQuestionPoint(qac.Point)
  //       setChoices(qac.Choices)
  //       setCorrectAnswer(qac.Answer)
  //       setQuestionLevel(qac.QuestionLevel)
  //     })},
  //   []
  // );

  
  // useEffect(() => {

  // if(questionLevel1.includes(roomNum)){
  //   qac = questionLevelone[ran];

  //  }
  //  else if(questionLevel2.includes(roomNum)){
  //   qac = questionLeveltwo[ran];
  //  }
  //  else if(questionLevel3.includes(roomNum)){
  //   qac = questionLevelthree[ran];
  //  }
  
  //  setQuestion(qac[4]);
  //  setQuestionType(qac[5]);
  //  setQuestionPoint(qac[2]);
  //  setChoices(qac[1]);
  //  setQuestionLevel(qac[3]);
  //  setCorrectAnswer(qac[0]);
  //  }, [ran])

  // useEffect(
  //   async () =>

  //   []
  // )
  // console.log(random);
  // useEffect(() => {

  // }, [])
  //console.log('final ',finalExplorer)
  // 'LossTape''Win' 'LossPessimist'
  // navigation.navigate("MultiplayerWin", { PoinT: Point + questionPoint, IDToBeSent });  navigation.navigate("MultiplayerLossTape", { PoinT: Point + questionPoint, IDToBeSent });c


  if (gameStatus == 'LossTape') {
    navigation.navigate("MultiplayerLossTape", { PoinT: Point, IDToBeSent });
  } else if (gameStatus == 'Win') {
    playSound('win')
    navigation.navigate("MultiplayerWin", { PoinT: Point, IDToBeSent });
  } else if (gameStatus == 'LossPessimist') {
    navigation.navigate("MultiplayerLossPessimis", { PoinT: Point, IDToBeSent });
  }

  if (Players != null) {
    Players.map((item) => {
      if (item.ActiveState == true) {
        ActivePlayer.push(item.Email); //{ Email: item.Email, Name: item.Name }
        ActivePlayerName.push({ Email: item.Email, Name: item.Name });
      }
    });
  }

  useEffect(() => {
    if (QuestionModal == true && ExplorerModal == false) {

      //console.log("i'm here shosho ");
      // getQuestion();
      ModalC("Question");
      //setQuestion('j');
      setTimeout(()=>setModalVisible(true),2000)
    } else if (ExplorerModal == true && QuestionModal == false) {
      ModalC("Explorer");
      setTimeout(()=>setModalVisible(true),2000)
    } else if (QuestionModal == false && ExplorerModal == false) {
      setTimeout(()=>setModalVisible(false),2000)
    }else if(ExplorerModal == true && QuestionModal == true){
      updateDoc(doc(db, "Game", IDToBeSent), {
        QuestionModal: false,
        ExplorerModal: false,
      });
    }
  }, [ExplorerModal, QuestionModal]);
  //---------------------------------------------------------------------joud Char
  let joudCharPlayer1 = [
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
  let joudCharPlayer2 = [
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
  let joudCharPlayer3 = [
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

  if (Players != undefined) {

    if (Players.length == 2) {
      joudCharPlayer1[Players[0].Position] = (
        <Image
          source={require("../../../../assets/joud5.png")}
          style={{ width: 45, height: 45, resizeMode: "contain", left: 10, top: 70 }}
        />
      );

      joudCharPlayer2[Players[1].Position] = (
        <Image
          source={require("../../../../assets/joud5.png")}
          style={{ width: 45, height: 45, resizeMode: "contain" }}
        />
      );
    }

    if (Players.length == 3) {
      joudCharPlayer1[Players[0].Position] = (
        <Image
          source={require("../../../../assets/joud5.png")}
          style={{ width: 45, height: 45, resizeMode: "contain", left: 10, top: 70 }}
        />
      );

      joudCharPlayer2[Players[1].Position] = (
        <Image
          source={require("../../../../assets/joud5.png")}
          style={{ width: 45, height: 45, resizeMode: "contain" }}
        />
      );

      joudCharPlayer3[Players[2].Position] = (
        <Image
          source={require("../../../../assets/Joudc.png")}
          style={{ width: 45, height: 45, resizeMode: "contain" }}
        />
      );
    }
  }
  //---------------------------------------------------------------------numberOfTape
  let t; //chan
  if (numberOfTape == 3) t = Tape3;
  else if (numberOfTape == 2) t = Tape2;
  else if (numberOfTape == 1) t = Tape1;
  //---------------------------------------------------------------------Get Question
//   const getQuestion = async () => {//Host
//     // let QuestionCol;
//     // if (questionLevel1.includes(positionOfNextRoom)) {
//     //   QuestionCol = collection(db, "Level one",);
//     // }
//     // else if (questionLevel2.includes(positionOfNextRoom)) {
//     //   QuestionCol = collection(db, "Level two",);
//     // }
//     // else if (questionLevel3.includes(positionOfNextRoom)) {
//     //   QuestionCol = collection(db, "Level three",);
//     // }
//     //QuestionCol = collection(db, "Level three",);
//     // QuestionSnapshot = await getDocs(QuestionCol);
//     // QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());

//     // random = Math.floor(Math.random() * QuestionList.length);
//     // //  QuestionList[random]
//     // await updateDoc(doc(db, "Game", IDToBeSent), {
//     //   CurrentQuestion: random,
//     // });
//     // const docref = doc(db, "Game", IDToBeSent);
//     // await getDoc(docref).then((doc) => {
//     //   host = doc.get("Host");
//     // });
//     // const QuestionCol = collection(db, "Level one",);
//     // const QuestionSnapshot = await getDocs(QuestionCol);
//     // const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());

//     //   if(user.email===ActivePlayer[0]){
//     //   await updateDoc(doc(db, "Game", IDToBeSent), {
//     //     CurrentQuestion:Math.floor(Math.random() * QuestionList.length),
//     //   });
//     // // }

//     // let qac=(QuestionList[random]);

//     //   console.log('random',random);
//     //   console.log('qac',qac);

//     //   setQuestion(qac.Questionis);
//     //   setQuestionType(qac.Type); 
//     //   setQuestionPoint(qac.Point);
//     //   setChoices(qac.Choices);
//     //   setQuestionLevel(qac.QuestionLevel);
//     //   setCorrectAnswer(qac.Answer);
//     // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
//     //     getQuestion();

//  //----------   
//     setQuestion("hhhhhhhhhhhhh");
//     setQuestionType("إختيار من متعدد");
//     setQuestionPoint(5);
//     setChoices([
//       {label:"gg"},
//      {label:"hh"},
//       {label:"kk"},
//       {label:"A"},
//     ]);
//     setQuestionLevel(1);
//     setCorrectAnswer(3);

//   };
  // console.log('question', question);
  // console.log('correct answre', correctAnswer);
  // console.log('choices', choices);
  //---------------------------------------------------------------------Update


  const getQuestion = async () => {
    let qac ;
    let QuestionCol;

    //setrandom(Math.floor(Math.random() * qlevelone.length))

    // const QuestionCol = doc(db, "Level one", 'uxZhGMPvG7yxZt91sw36');
    // getDoc(QuestionCol).then((doc) => {
    //   setQuestion(doc.get('Questionis'));
    //   setQuestionType(doc.get('Type'));
    //   setQuestionPoint(doc.get('Point'));
    //   setChoices(doc.get('Choices'));
    //   setQuestionLevel(doc.get('QuestionLevel'));
    //   setCorrectAnswer(doc.get('Answer'));
    // })
    //const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
    // let qac = QuestionList[Math.floor(Math.random() * QuestionList.length)];
    // if (questionLevel1.includes(positionOfNextRoom) && questionLevel != 1)
    //     getQuestion();


    // while(!found){
    // let random = Math.floor(Math.random() * 1000)
    // const q = query(collection(db,'Level one'),orderBy('serialNumber'),startAt(random),limit(1));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   if(doc.data()!=undefined){
    //     setQuestion(doc.data().Questionis);
    //     setQuestionType(doc.data().Type);
    //     setQuestionPoint(doc.data().Point);
    //     setChoices(doc.data().Choices);
    //     setQuestionLevel(doc.data().QuestionLevel);
    //     setCorrectAnswer(doc.data().Answer);
    //   found=true;
    //  } });
    // // console.log('while',question)
    //    }

    //  if(!found){
    //   const q = query(collection(db,'QuestionsInfo'),orderBy('serialNumber'),endAt(27),limit(1));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //   console.log(doc.data().question);
    //   setQuestion(doc.data().Questionis);
    //   setQuestionType(doc.data().Type);
    //   setQuestionPoint(doc.data().Point);
    //   setChoices(doc.data().Choices);
    //   setQuestionLevel(doc.data().QuestionLevel);
    //   setCorrectAnswer(doc.data().Answer);
    //   })


    // }
    // let found = false;
    // random =Math.floor(Math.random() * 1000)

    // const q = query(collection(db, 'Level one'),where('serialNumber','==',6));

    // getDoc(q).then((doc) => {
    //     setQuestion(doc.get('Questionis'));
    //     setQuestionType(doc.get('Type'));
    //     setQuestionPoint(doc.get('Point'));
    //     setChoices(doc.get('Choices'));
    //     setQuestionLevel(doc.get('QuestionLevel'));
    //     setCorrectAnswer(doc.get('Answer'));
    //   })

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   if (doc.data() != undefined) {
    //     setQuestion(doc.data().Questionis);
    //     setQuestionType(doc.data().Type);
    //     setQuestionPoint(doc.data().Point);
    //     setChoices(doc.data().Choices);
    //     setQuestionLevel(doc.data().QuestionLevel);
    //     setCorrectAnswer(doc.data().Answer);
    // let r=randoma[Math.floor(Math.random() * randoma.length)];
    // Alert.alert('hi get question ')

    // const docref = doc(db, "Game", IDToBeSent);
    // await getDoc(docref).then((doc) => {
    //   nextromm = doc.get("NextPosition");
    // });

    // await updateDoc(doc(db, "Game", IDToBeSent), {
    //   CurrentQuestion:questionLevelone[Math.floor(Math.random() * randoma.length)],
    // });

  //   if(questionLevel1.includes(nextromm)){
  //  //  qac = questionLevelone[Math.floor(Math.random() * randoma.length)];
  //    await updateDoc(doc(db, "Game", IDToBeSent), {
  //     CurrentQuestion:questionLevelone[Math.floor(Math.random() * randoma.length)],
  //   });
  //   Alert.alert('hi level one')
  //   }
  //   else if(questionLevel2.includes(nextromm)){
  //   // qac = questionLeveltwo[Math.floor(Math.random() * randoma.length)];
  //    await updateDoc(doc(db, "Game", IDToBeSent), {
  //     CurrentQuestion:questionLeveltwo[Math.floor(Math.random() * randoma.length)],
  //   });
  //   }
  //   else if(questionLevel3.includes(nextromm)){
     //qac = questionLevelthree[Math.floor(Math.random() * randoma.length)];


    // }


    // setQuestion('doc.data().Questionis');
    // setQuestionType('إختيار من متعدد');
    // setQuestionPoint(8);
    // setChoices([{ label: 'pp' }, { label: 'df' }, { label: 'uo' }, { label: 'qwe' }]);
    // setQuestionLevel('doc.data().QuestionLevel');
    // setCorrectAnswer(0);

    //   }
    // })
    // let random = Math.floor(Math.random() *qlevelone.length )
    // let qac=(QuestionList[random]);

    // let found = false;
    // while(!found){
    // const q = query(collection(db,'Level one'),orderBy('serialNumber'),startAt(random),limit(1));
    //  const querySnapshot = await getDocs(q);
    //  querySnapshot.forEach((doc) => {
    //   if(doc.data()!=undefined)

    //  setQuestion(qac.Questionis);
    //  setQuestionType(qac.Type);
    //  setQuestionPoint(qac.Point);
    //  setChoices([{ label: 'pp' }, { label: 'df' }, { label: 'uo' }, { label: 'qwe' }]);
    //  //  setQuestionLevel(doc.data().QuestionLevel);
    //  setCorrectAnswer(qac.Answer);

    //    found=true;
    // });
    // //    }
    // console.log('question list 0 : ',QuestionList[0])

    // setrandom(Math.floor(Math.random() * QuestionList.length ))

    // let qac=(QuestionList[random]);

    // setQuestion(qac.Questionis);
    // setQuestionType(qac.Type);
    // setQuestionPoint(qac.Point);
    // setChoices(qac.Choices);
    // //  setQuestionLevel(doc.data().QuestionLevel);
    // setCorrectAnswer(qac.Answer);

    // console.log('random : ', random)

    // console.log('l', l)
    // console.log('l333', random)
    // if(ActivePlayer[0]==user.email){

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
     await updateDoc(doc(db, "Game", IDToBeSent), {
      CurrentQuestion:qac,
    });
    //  setQuestion(qac[4]);
    //  setQuestionType(qac[5]);
    //  setQuestionPoint(qac[2]);
    //  setChoices(qac[1].Choices);
    //  setQuestionLevel(qac[3]);
    //  setCorrectAnswer(qac[0]);
    
      
     
    
    
  
    // const QuestionCol = collection(db, "question1");
      //  const QuestionSnapshot = await getDocs(QuestionCol);
      //  const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data().q);
      //  qac= QuestionList[Math.floor(Math.random() * QuestionList.length)];

    

  // for (let index = 0; index < questionLeveltwo.length; index++) {
  //   addDoc( collection(db,'question2'),{
  //     q: questionLeveltwo[index]
  //   })
  // }

  // for (let index = 0; index < questionLevelthree.length; index++) {
  //   addDoc( collection(db,'question3'),{
  //     q: questionLevelthree[index]
  //   })
  // }

       // }
      //  setQuestion(qac.Questionis);
      //  setQuestionType(qac.Type);
      //  setQuestionPoint(qac.Point);
      //  setChoices(qac.Choices);
      // setQuestionLevel(qac.QuestionLevel);
      // setCorrectAnswer(qac.Answer);
    
  //  let id=500;
 
  // for (let index = 0; index < questionLevelone.length; index++) {
  //   addDoc( collection(db,'question'),{
  //     q: questionLevelone[index]
  //   })
  // }
  //   // else {
    //   const docref = doc(db, "Game", IDToBeSent)
    //   getDoc(docref).then((doc) => {
    //     qac = doc.get('CurrentQuestion')
    //     setQuestion(qac.Questionis);
    //     setQuestionType(qac.Type);
    //     setQuestionPoint(qac.Point);
    //     setChoices(qac.Choices);
    //    setQuestionLevel(qac.QuestionLevel);
    //    setCorrectAnswer(qac.Answer);
    // })
  
  };

  function Update(value, merge, DocToBeUpdated) {
    const Ref = doc(db, "Game", IDToBeSent);

    if (DocToBeUpdated == "None") {
      setDoc(Ref, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (DocToBeUpdated == "Room") {
      const myDoc = doc(Ref, "Votes", "Rooms");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated == "Explorer") {
      const myDoc = doc(Ref, "Votes", "Explorer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          //alert("Document Updated")
        })
        .catch((error) => {
          // alert(error.message)
        });
    } else if (DocToBeUpdated == "Answer") {
      const myDoc = doc(Ref, "Votes", "Answer");
      setDoc(myDoc, value, { merge: merge })
        .then(() => {
          // alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  //---------------------------------------------------------------------validate (RoomVote-AnswerVote-ExplorerVote)
  function validateRoomVote(value) {
    Update({ Room1: arrayRemove(user.email) }, true, "Room");
    Update({ Room2: arrayRemove(user.email) }, true, "Room");
    Update({ Room3: arrayRemove(user.email) }, true, "Room");
    Update({ Room4: arrayRemove(user.email) }, true, "Room");

    if (value == "Room1") {
      Update(
        {
          Room1: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room2") {
      Update(
        {
          Room2: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room3") {
      Update(
        {
          Room3: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    } else if (value == "Room4") {
      Update(
        {
          Room4: arrayUnion(user.email),
        },
        true,
        "Room"
      );
    }
  }

  async function validateAnswerVote(value) {
    Update({ Choice1: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice2: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice3: arrayRemove(user.email) }, true, "Answer");
    Update({ Choice4: arrayRemove(user.email) }, true, "Answer");

    if (value == "Choice1") {
      Update(
        {
          Choice1: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice2") {
      Update(
        {
          Choice2: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice3") {
      Update(
        {
          Choice3: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    } else if (value == "Choice4") {
      Update(
        {
          Choice4: arrayUnion(user.email),
        },
        true,
        "Answer"
      );
    }
  }

useEffect(() => {
   getQuestion();
    ModalC('Question');
    Alert.alert('room num',(roomNum));
  }, [])

  function validateExplorerVote(value) {
    Update({ Player1: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player2: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player3: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player4: arrayRemove(user.email) }, true, "Explorer");
    Update({ Player5: arrayRemove(user.email) }, true, "Explorer");

    if (value == "Player1") {
      Update(
        {
          Player1: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player2") {
      Update(
        {
          Player2: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player3") {
      Update(
        {
          Player3: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player4") {
      Update(
        {
          Player4: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    } else if (value == "Player5") {
      Update(
        {
          Player5: arrayUnion(user.email),
        },
        true,
        "Explorer"
      );
    }
  }
  //---------------------------------------------------------------------Choess Next Room
  async function ChoessNextRoom(Next_Room) {

    if (
      roomNum - 1 == Next_Room ||
      roomNum + 1 == Next_Room ||
      roomNum - 6 == Next_Room ||
      roomNum + 6 == Next_Room
    ) {

      playSound('pres');
      if (Next_Room != 0) {
        if (Next_Room == roomNum + 1) {
          //-----------------------------------------moveR
          if ((roomNum - 5) % 6 != 0) {
            validateRoomVote("Room2");
          }
        } else if (Next_Room == roomNum - 1) {
          //-----------------------------------------moveL
          if (roomNum % 6 != 0) {
            validateRoomVote("Room4");
          }
        } else if (Next_Room == roomNum - 6) {
          //-------------------------------------------moveUp
          if (roomNum > 5) {
            validateRoomVote("Room1");
          }
        } else if (Next_Room == roomNum + 6) {
          //-----------------------------------------------moveD
          if (roomNum < 30) {
            validateRoomVote("Room3");
          }
        }

        const Ref = doc(db, "Game", IDToBeSent, "Votes", "Rooms");
        await getDoc(Ref)
          .then((doc) => {
            Player_room1 = doc.get("Room1");
            Player_room2 = doc.get("Room2");
            Player_room3 = doc.get("Room3");
            Player_room4 = doc.get("Room4");
          })
          .catch((error) => {
            alert(error.message);
          });

        if (
          Player_room1.length +
          Player_room2.length +
          Player_room3.length +
          Player_room4.length ==
          ActivePlayer.length
        ) {

          // });
//------------------------------------------------------------------------------------
          // console.log(QuestionCol);


          // if (questionLevel1.includes(Next_Room)) {
          //   QuestionCol = collection(db, "Level one",);
          // }
          // else if (questionLevel2.includes(Next_Room)) {
          //   QuestionCol = collection(db, "Level two",);
          // }
          // else if (questionLevel3.includes(Next_Room)) {
          //   QuestionCol = collection(db, "Level three",);
          // }
   
          // const  QuestionCol = collection(db, "QuestionsInfo",)
          // const QuestionSnapshot = await getDocs(QuestionCol);
          // const QuestionList = QuestionSnapshot.docs.map((doc) => doc.data());
      
          // random = Math.floor(Math.random() * QuestionList.length);
          // //  QuestionList[random]
          // await updateDoc(doc(db, "Game", IDToBeSent), {
          //   CurrentQuestion:QuestionList[random],
          // });
//------------------------------------------------------------------------------------
          
         getQuestion();
         ModalC('Question')
         MaxVotesOfNextRoom();


          for (let index = 0; index < Players.length; index++) {
            Update({ Room1: arrayRemove(Players[index].Email) }, true, "Room");
            Update({ Room2: arrayRemove(Players[index].Email) }, true, "Room");
            Update({ Room3: arrayRemove(Players[index].Email) }, true, "Room");
            Update({ Room4: arrayRemove(Players[index].Email) }, true, "Room");
            // console.log('in')
          }
          // console.log('out')
          // ModalC('Question');
          //  // setTimeout(()=> setModalVisible(true),20);
          //  if(user.email==host){

          await updateDoc(doc(db, "Game", IDToBeSent), {
            QuestionModal: true,
          });
          //  console.log("i'm  host -->", QuestionModal);
          // else{
          //  updateDoc(doc(db, "Game", IDToBeSent), {
          //   QuestionModal: true,
          // })}

          // moveRDLU();
        }
      }
    }
  }

  //---------------------------------------------------------------------Choess Answer
  async function ChoessAnswer(FinalAnswer) {
    playSound('pres');
    // onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
    //  currentq=snapshot.data().CurrentQuestion
    //   )
    if (FinalAnswer == 0) {
      validateAnswerVote("Choice1");
    } else if (FinalAnswer == 1) {
      validateAnswerVote("Choice2");
    } else if (FinalAnswer == 2) {
      validateAnswerVote("Choice3");
    } else if (FinalAnswer == 3) {
      validateAnswerVote("Choice4");
    }

    const Reff = doc(db, "Game", IDToBeSent, "Votes", "Answer");
    await getDoc(Reff)
      .then((doc) => {
        Player_Answer1 = doc.get("Choice1");
        Player_Answer2 = doc.get("Choice2");
        Player_Answer3 = doc.get("Choice3");
        Player_Answer4 = doc.get("Choice4");
      })
      .catch((error) => {
        alert(error.message);
      });

    // console.log(ActivePlayer.length);

    // setQuestionType(random.Type),

    //setQuestionLevel(random.QuestionLevel),

    // const docref = doc(db, "Game", IDToBeSent);
    // await getDoc(docref).then((doc) => {
    //   randomQuestion = doc.get("CurrentQuestion");
    // });
   // randomQuestion = QuestionList[random];
    if (
      Player_Answer1.length +
      Player_Answer2.length +
      Player_Answer3.length +
      Player_Answer4.length ==
      ActivePlayer.length
    ) {


      MaxVotesOfFinalAnswer(); //we need write then to preforn the methods in seq

      for (let index = 0; index < Players.length; index++) {
        Update({ Choice1: arrayRemove(Players[index].Email) }, true, "Answer");
        Update({ Choice2: arrayRemove(Players[index].Email) }, true, "Answer");
        Update({ Choice3: arrayRemove(Players[index].Email) }, true, "Answer");
        Update({ Choice4: arrayRemove(Players[index].Email) }, true, "Answer");
      }

      const docref = doc(db, "Game", IDToBeSent);
      await getDoc(docref).then((doc) => {
        finalAnswer = doc.get("FinalAnswer");
      });

      //  setFinalAnswer(2);
      //  console.log(finalAnswer, "----", correctAnswer);
      if (finalAnswer == currentq[0]) {
        //  setPoint(point+questionPoint);
        //  setTimeout(()=>  setModalVisible(false))
        // if (user.email == host) {
        // playSound('win')
        if (Point != null) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            QuestionModal: false,
            Points: Point + currentq[2],
          });
        }
        // let cc = board_db;
        // for (let index = 0; index < board1.length; index++) {
        //   if (myPath.includes(index)) {
        //     cc[index] = board1[index];
        //   }
        // }
        // updateDoc(doc(db, "Game", IDToBeSent), {
        //   CurrentBoard: cc,
        // });

        showPessimistOrFoggyWarnaing(positionOfNextRoom);
        if (fogIndexs.includes(roomNum) && ActivePlayer.length > 1) {
          //   console.log(" go to move");
          // Move("Explorer", -1);
          ModalC("Explorer");
          await updateDoc(doc(db, "Game", IDToBeSent), {
            ExplorerModal: true,
          });
        } else {
          Move("Players");
        }
      } else if (finalAnswer != currentq[0]) {
        playSound('wrong');
        if (currentq[0] == 0) setStyleb1(styles.buttonc);
        if (currentq[0] == 1) setStyleb2(styles.buttonc);
        if (currentq[0] == 2) setStyleb3(styles.buttonc);
        if (currentq[0] == 3) setStyleb4(styles.buttonc);

        await updateDoc(doc(db, "Game", IDToBeSent), {
          QuestionModal: false,
        });

        if (numberOfTape == 1) {
          endGame('LossTape');
        } else {
          if (numberOfTape != null) {
            await updateDoc(doc(db, "Game", IDToBeSent), {
              NumberOftape: numberOfTape - 1,
            });
          }
        }
      }
    }
  }
  //---------------------------------------------------------------------Choess Explorer
  async function ChoessExplorer(FinalExplorer) {

    if (FinalExplorer == Players[0].Email) {
      validateExplorerVote("Player1");
    } else if (FinalExplorer == Players[1].Email) {
      validateExplorerVote("Player2");
    } else if (FinalExplorer == Players[2].Email) {
      validateExplorerVote("Player3");
    }

    const Ref = doc(db, "Game", IDToBeSent, "Votes", "Explorer");
    await getDoc(Ref)
      .then((doc) => {
        Player_Explorer1 = doc.get("Player1");
        Player_Explorer2 = doc.get("Player2");
        Player_Explorer3 = doc.get("Player3");
      })
      .catch((error) => {
        alert(error.message);
      });

    if (
      Player_Explorer1.length +
      Player_Explorer2.length +
      Player_Explorer3.length ===
      ActivePlayer.length
    ) {
      await updateDoc(doc(db, "Game", IDToBeSent), {
        ExplorerModal: false,
      });

      MaxVotesOfFinalExplorer();

      for (let index = 0; index < Players.length; index++) {
        Update({ Player1: arrayRemove(Players[index].Email) }, true, "Explorer");
        Update({ Player2: arrayRemove(Players[index].Email) }, true, "Explorer");
        Update({ Player3: arrayRemove(Players[index].Email) }, true, "Explorer");
      }

      // const docref = doc(db, "Game", IDToBeSent);
      // await getDoc(docref).then((doc) => {
      //   setFinalExplorer(doc.get("FinalExplorer"))
      // });

      const docref = doc(db, "Game", IDToBeSent);
      await getDoc(docref).then((doc) => {
        finalExplorer = doc.get("FinalExplorer");
      });

      Move('Explorer');


    }
  }

  //---------------------------------------------------------------------ModalC
  async function ModalC(Type) {

    
    if (Type == "Explorer") {
      setModalContent(
        <View>
          <Text style={styles.textShowQ}>صوت للمستكشفة</Text>
          <View style={styles.showQbox}>
            {ActivePlayerName.map((item) => (
              <View style={styles.containerShowQ} key={item.Id}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      ChoessExplorer(item.Email);
                    }
                  }}
                >
                  <Text style={styles.text}>{item.Name}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      );
    } else if (Type == "Question") {

      // const docref = doc(db, "Game", IDToBeSent);
      // await getDoc(docref).then((doc) => {
      //   setcurrentq(doc.get("CurrentQuestion"))
      // });

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

      // const docref = doc(db, "Game", IDToBeSent);
      // await getDoc(docref).then((doc) => {
      //   randomQuestion = doc.get("CurrentQuestion");
      // });
     // randomQuestion = QuestionList[random];
      
      // onSnapshot(doc(db, "Game", IDToBeSent), (snapshot) =>
      // randomQuestion=(snapshot.data().CurrentQuestion)
      // )
      if (currentq[5] == 'إختيار من متعدد') {
        setModalContent(
          <View style={{ zIndex: 999 }} >
            <Text style={styles.textShowQ}>{currentq[4]}</Text>
            <View style={styles.showQbox}>
              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb1}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0] == 0) {
                        setStyleb1(styles.buttonc);
                      } else {
                        setStyleb1(styles.buttonr);
                      }
                      ChoessAnswer(0);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[0]}</Text>
                </Pressable>
              </View>
              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb2}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0] == 1) {
                        setStyleb2(styles.buttonc);
                      } else {
                        setStyleb2(styles.buttonr);
                      }
                      ChoessAnswer(1);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[1]}</Text>
                </Pressable>
              </View>
              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb3}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0] == 2) {
                        setStyleb3(styles.buttonc);
                      } else {
                        setStyleb3(styles.buttonr);
                      }
                      ChoessAnswer(2);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[2]}</Text>
                </Pressable>
              </View>
              <View style={styles.containerShowQ}>
                <Pressable
                  style={styleb4}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0] == 3) {
                        setStyleb4(styles.buttonc);
                      } else {
                        setStyleb4(styles.buttonr);
                      }
                      ChoessAnswer(3);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[3]}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      }
      else if (currentq[5] == 'صح وخطأ') {
        setModalContent(
          <View style={{ zIndex: 999 }} >
            <Text style={styles.textShowQ}>{currentq[4]}</Text>
            <View style={styles.showQbox1}>
              <View style={styles.containerShowQ}>

                <Pressable
                  style={styleb1}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0]== 0) {
                        setStyleb1(styles.buttonc);
                      } else {
                        setStyleb1(styles.buttonr);
                      }
                      ChoessAnswer(0);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[0]}</Text>
                </Pressable>

              </View>
              <View style={styles.containerShowQ}>

                <Pressable
                  style={styleb2}
                  onPress={() => {
                    if (ActivePlayer.includes(user.email)) {
                      if (currentq[0] == 1) {
                        setStyleb2(styles.buttonc);
                      } else {
                        setStyleb2(styles.buttonr);
                      }
                      ChoessAnswer(1);
                    }
                  }}
                >
                  <Text style={styles.text}>{currentq[1].Choices[1]}</Text>
                </Pressable>

              </View>
            </View>
          </View>
        );
      }
    }
  }
  // console.log('question is ',question)

  // console.log('correctAnswer is ',correctAnswer)
  //-----------------------------------------------------بلوك خاص بالاتنبيهات
  const showFogWarnaing = (inc) => {
    if (fogIndexs.includes(inc)) {
      playSound('piss');
      showMessage({
        message: "إنتبهي أمامك المحبطين ",
        type: "warning",
      });
    }
  };
  // const showPessimistWarnaing = (inc) => {
  //   if (pssIndexs.includes(inc)) {
  //     // showMessage({
  //     //   message: "warning!!",
  //     //   type: "danger",
  //     // });
  //     endGame(1);
  //     // console.log("pissims room ", inc);
  //   }
  // };
  const showPessimistOrFoggyWarnaing = (inc) => {
    //  showPessimistWarnaing(inc);
    showFogWarnaing(inc);
  };
  //---------------------------------------------------------------------Max Votes Of (NextRoom-FinalAnswer-FinalExplorer)
  async function MaxVotesOfNextRoom() {
    let Max = Math.max(
      Player_room2.length,
      Player_room3.length,
      Player_room1.length,
      Player_room4.length
    );
    //  playSound('pres')
    if (Max == Player_room1.length) {
      // console.log("room ---- ", roomNum, " ----");
      await updateDoc(doc(db, "Game", IDToBeSent), {
        NextPosition: roomNum - 6,
      })
      // setPositionOfNextRoom(roomNum - 6);
    } else if (Max == Player_room2.length) {
      // console.log("room ---- ", roomNum, " ----");
      await updateDoc(doc(db, "Game", IDToBeSent), {
        NextPosition: roomNum + 1,
      })
      // setPositionOfNextRoom(roomNum + 1);
    } else if (Max == Player_room3.length) {
      //   console.log("room ---- ", roomNum, " ----");
      await updateDoc(doc(db, "Game", IDToBeSent), {
        NextPosition: roomNum + 6,
      })
      //  setPositionOfNextRoom(roomNum + 6);
    } else if (Max == Player_room4.length) {
      //  console.log("room ---- ", roomNum, " ----");
      await updateDoc(doc(db, "Game", IDToBeSent), {
        NextPosition: roomNum - 1,
      })
      // setPositionOfNextRoom(roomNum - 1);
    }
    console.log('max ', positionOfNextRoom)
    // playSound('open');
  }

  async function MaxVotesOfFinalAnswer() {
    let Max = Math.max(
      Player_Answer1.length,
      Player_Answer2.length,
      Player_Answer3.length,
      Player_Answer4.length
    );
    if (Max == Player_Answer1.length) {
      // setFinalAnswer(0)

      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalAnswer: 0,
      });
    } else if (Max == Player_Answer2.length) {
      //setFinalAnswer(1)

      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalAnswer: 1,
      });
    } else if (Max == Player_Answer3.length) {
      //  setFinalAnswer(2)
      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalAnswer: 2,
      });
    } else if (Max == Player_Answer4.length) {
      //  setFinalAnswer(3)
      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalAnswer: 3,
      });
    }
  }

  async function MaxVotesOfFinalExplorer() {
    let Max = Math.max(
      Player_Explorer1.length,
      Player_Explorer2.length,
      Player_Explorer3.length
    );
    if (Max == Player_Explorer1.length) {
      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalExplorer: Players[0].Email,
      });
      // setFinalExplorer(Players.player1.Email)
    } else if (Max == Player_Explorer2.length) {
      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalExplorer: Players[1].Email,
      });
      // setFinalExplorer(Players.player2.Email)
    } else if (Max == Player_Explorer3.length) {
      await updateDoc(doc(db, "Game", IDToBeSent), {
        FinalExplorer: Players[2].Email,
      });
      // setFinalExplorer(Players.player2.Email)
    }

  }
  //---------------------------------------------------------------------sound

  // async function playSound(soundName) {
  //   let audio;  
  //   switch(soundName){
  //       case 'open': audio = require('../../../../assets/open.mp3');break;
  //       case 'win': audio = require('../../../../assets/Win.mp3');break;
  //       case 'wrong': audio = require('../../../../assets/wrong.mp3');break;
  //       case 'piss': audio = require('../../../../assets/piss.mp3');break;
  //       case 'pres': audio = require('../../../../assets/Press.mp3');break;

  //   }
  //   const { sound } = await Audio.Sound.createAsync(
  //      audio
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync(); }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('hi Sound');
  //         sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);

  //---------------------------------------------------------------------Move
  
  
  // playSound('open');
  
  async function Move(type) {
    console.log('move', positionOfNextRoom)
    const docref = doc(db, "Game", IDToBeSent);
    await getDoc(docref).then((doc) => {
      finalExplorer = doc.get("FinalExplorer");
    });

    if(tapeIndexs.includes(positionOfNextRoom)){
      let xx=Board__;
      xx[positionOfNextRoom]='';

      updateDoc(doc(db, "Game", IDToBeSent), {
        Board: xx,
      });
      // board1[positionOfNextRoom]='';
      // fogIndexs=fogIndexs.filter((value)=> value==positionOfNextRoom )
      if (
        numberOfTape != 3
      ) {
        await updateDoc(doc(db, "Game", IDToBeSent), {
              NumberOftape: numberOfTape + 1,
            });
      } else if ( numberOfTape == 3) {
        await updateDoc(doc(db, "Game", IDToBeSent), {
        Points: Point + 3,
       });
      }}

    // if (
    //   tapeIndexs.includes(positionOfNextRoom) &&
    //   numberOfTape != 3
    // ) {
    //   await updateDoc(doc(db, "Game", IDToBeSent), {
    //     NumberOftape: numberOfTape + 1,
    //   });
    // } else if (tapeIndexs.includes(positionOfNextRoom) && numberOfTape === 3) {
    //   await updateDoc(doc(db, "Game", IDToBeSent), {
    //     Points: Point + 3,
    //   });
    // }
    // && myPath.includes(positionOfNextRoom) == false
    //---------------------------------------------------------------------open next room

    const Ref = doc(db, "Game", IDToBeSent);
    let cc = board_db;
    // playSound('open')
    if (Board__[positionOfNextRoom] == "p") {
      // playSound('piss');
      cc[positionOfNextRoom] = "piss";
    } else if (Board__[positionOfNextRoom] == "t") {
      cc[positionOfNextRoom] = "tape";
    } else if (Board__[positionOfNextRoom] == "f") {
      cc[positionOfNextRoom] = "fog";
    } else {
      cc[positionOfNextRoom] = "";

    }
  
    updateDoc(doc(db, "Game", IDToBeSent), {
      CurrentBoard: cc,
    });
    playSound('open');
    //--------------------------------------------------------------------------------------

    if (type == "Players") {
      // Alert.alert(positionOfNextRoom)
      if (pssIndexs.includes(positionOfNextRoom)) {
     
        endGame('LossPessimist');
      }

      //---------------------------------------------------------------------Move players
      if (ActivePlayer.length == 3) {
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[1].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      } else if (ActivePlayer.length == 2 && Players.length == 3) {
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[1].Email)
        ) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (
          ActivePlayer.includes(Players[1].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[2].Email)
        ) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      } else if (ActivePlayer.length == 1 && Players.length == 3) {
        if (ActivePlayer.includes(Players[0].Email)) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (ActivePlayer.includes(Players[1].Email)) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (ActivePlayer.includes(Players[2].Email)) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      } else if (ActivePlayer.length == 2 && Players.length == 2) {
        if (
          ActivePlayer.includes(Players[0].Email) &&
          ActivePlayer.includes(Players[1].Email)
        ) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
      } else if (ActivePlayer.length == 1 && Players.length == 2) {
        if (ActivePlayer.includes(Players[0].Email)) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ActiveState: Players[1].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
        if (ActivePlayer.includes(Players[1].Email)) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        }
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
      cc = board_db;
      for (let i = 0; i < 36; i++) {
        if (cc[i] == 'light' && adjRoomNum.includes(i) != true && i != 0 && i != 35) {
          cc[i] = "close";
        }
        else if (adjRoomNum.includes(i) && cc[i] != "light" && i != 0 && i != 35 && cc[i] == 'close') {
          cc[i] = "light";
        }
      }

      updateDoc(doc(db, "Game", IDToBeSent), {
        CurrentBoard: cc,
      });
      //--------------------------------------------------------------------------------------
    } else if (type == "Explorer") {
      //-----------------------------------------------Update explorer position
      if (Players.length == 3) {
        if (finalExplorer === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[2].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        }
      }
      if (Players.length == 2) {
        if (finalExplorer === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
          });
        }
      }
      if (pssIndexs.includes(positionOfNextRoom)) {
        //-----------------------------------------------Update explorer state
        freeze();
      } else {
        //-----------------------------------------------Update activie players position
        if (ActivePlayer.length == 3) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ActiveState: Players[2].ActiveState,
              },
            ],
            currentPosition: positionOfNextRoom,
          });
        } else if (ActivePlayer.length == 2 && Players.length == 3) {
          if (
            ActivePlayer.includes(Players[0].Email) &&
            ActivePlayer.includes(Players[1].Email) &&
            ActivePlayer.includes(Players[2].Email) == false
          ) {
            await updateDoc(doc(db, "Game", IDToBeSent), {
              Players: [
                {
                  Email: Players[0].Email,
                  Position: positionOfNextRoom,
                  Name: Players[0].Name,
                  ActiveState: Players[0].ActiveState,
                },
                {
                  Email: Players[1].Email,
                  Position: positionOfNextRoom,
                  Name: Players[1].Name,
                  ActiveState: Players[1].ActiveState,
                },
                {
                  Email: Players[2].Email,
                  Position: Players[2].Position,
                  Name: Players[2].Name,
                  ActiveState: Players[2].ActiveState,
                },
              ],
              currentPosition: positionOfNextRoom,
            });
          }
          if (
            ActivePlayer.includes(Players[1].Email) &&
            ActivePlayer.includes(Players[2].Email) &&
            ActivePlayer.includes(Players[0].Email) == false
          ) {
            await updateDoc(doc(db, "Game", IDToBeSent), {
              Players: [
                {
                  Email: Players[0].Email,
                  Position: Players[0].Position,
                  Name: Players[0].Name,
                  ActiveState: Players[0].ActiveState,
                },
                {
                  Email: Players[1].Email,
                  Position: positionOfNextRoom,
                  Name: Players[1].Name,
                  ActiveState: Players[1].ActiveState,
                },
                {
                  Email: Players[2].Email,
                  Position: positionOfNextRoom,
                  Name: Players[2].Name,
                  ActiveState: Players[2].ActiveState,
                },
              ],
              currentPosition: positionOfNextRoom,
            });
          }
          if (
            ActivePlayer.includes(Players[0].Email) &&
            ActivePlayer.includes(Players[2].Email) &&
            ActivePlayer.includes(Players[1].Email) == false
          ) {
            await updateDoc(doc(db, "Game", IDToBeSent), {
              Players: [
                {
                  Email: Players[0].Email,
                  Position: positionOfNextRoom,
                  Name: Players[0].Name,
                  ActiveState: Players[0].ActiveState,
                },
                {
                  Email: Players[1].Email,
                  Position: Players[1].Position,
                  Name: Players[1].Name,
                  ActiveState: Players[1].ActiveState,
                },
                {
                  Email: Players[2].Email,
                  Position: positionOfNextRoom,
                  Name: Players[2].Name,
                  ActiveState: Players[2].ActiveState,
                },
              ],
              currentPosition: positionOfNextRoom,
            });
          }
        } else if (ActivePlayer.length == 2 && Players.length == 2) {
          if (
            ActivePlayer.includes(Players[0].Email) &&
            ActivePlayer.includes(Players[1].Email)
          ) {
            await updateDoc(doc(db, "Game", IDToBeSent), {
              Players: [
                {
                  Email: Players[0].Email,
                  Position: positionOfNextRoom,
                  Name: Players[0].Name,
                  ActiveState: Players[0].ActiveState,
                },
                {
                  Email: Players[1].Email,
                  Position: positionOfNextRoom,
                  Name: Players[1].Name,
                  ActiveState: Players[1].ActiveState,
                },
              ],
              currentPosition: positionOfNextRoom,
            });
          }

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
        cc = board_db;
        for (let i = 0; i < 36; i++) {
          if (cc[i] == 'light' && adjRoomNum.includes(i) != true && i != 0 && i != 35) {
            cc[i] = "close";
          }
          else if (adjRoomNum.includes(i) && cc[i] != "light" && i != 0 && i != 35 && cc[i] == 'close') {
            cc[i] = "light";
          }
        }

        updateDoc(doc(db, "Game", IDToBeSent), {
          CurrentBoard: cc,
        });
      }


    }
    if (positionOfNextRoom === 35) {
      endGame('Win');
    }
  }
  //---------------------------------------------------------------------End Game
  const endGame = (type) => {
    //type{[1]LossPessimist or [2]LossTape or [3]Tape=0}

    // if (type == 'LossPessimist') {

    updateDoc(doc(db, "Game", IDToBeSent), {
      GameStatus: type,
    });

    //navigation.navigate("MultiplayerLossPessimis", { PoinT: Point + questionPoint, IDToBeSent });
    // } else if (type ==  'LossTape') {

    // navigation.navigate("MultiplayerLossTape", { PoinT: Point + questionPoint, IDToBeSent });
    // } else if (type ==  'Win') {

    // navigation.navigate("MultiplayerWin", { PoinT: Point + questionPoint, IDToBeSent });  navigation.navigate("MultiplayerLossTape", { PoinT: Point + questionPoint, IDToBeSent });navigation.navigate("MultiplayerLossPessimis", { PoinT: Point + questionPoint, IDToBeSent });


    // }
  };
  //---------------------------------------------------------------------Freeze
  const freeze = async () => {
    // console.log('explorer from freeze -->',PlayerExplorer)
    // console.log('player1 -->',Players.player1.Email)
    // console.log('player2 -->',Players.player2.Email)

  const docref = doc(db, "Game", IDToBeSent);
    await getDoc(docref).then((doc) => {
      finalExplorer = doc.get("FinalExplorer");
    });

    for (let index = 0; index < ActivePlayer.length; index++) {

      if (Players.length == 3) {
        if (finalExplorer === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: false,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: false,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[2].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: positionOfNextRoom,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: false,
              },
            ],
          });
        }
      }

      if (Players.length == 2) {
        if (finalExplorer === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: positionOfNextRoom,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: false,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
          });
        } else if (finalExplorer === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: positionOfNextRoom,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: false,
              },
            ],
          });
        }
      }
    }
  };
 
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


  const Exit = async () => {
    // console.log('explorer from freeze -->',PlayerExplorer)
    // console.log('player1 -->',Players.player1.Email)
    // console.log('player2 -->',Players.player2.Email)

    for (let index = 0; index < ActivePlayer.length; index++) {

      if (Players.length == 3) {
        if (user.email === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: -1,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: false,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (user.email === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: -1,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: false,
              },
              {
                Email: Players[2].Email,
                Position: Players[2].Position,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: Players[2].ActiveState,
              },
            ],
          });
        } else if (user.email === Players[2].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
              {
                Email: Players[2].Email,
                Position: -1,
                Name: Players[2].Name,
                ID: Players[2].ID,
                ActiveState: false,
              },
            ],
          });
        }
      }

      if (Players.length == 2) {
        if (user.email === Players[0].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: -1,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: false,
              },
              {
                Email: Players[1].Email,
                Position: Players[1].Position,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: Players[1].ActiveState,
              },
            ],
          });
        } else if (user.email === Players[1].Email) {
          await updateDoc(doc(db, "Game", IDToBeSent), {
            Players: [
              {
                Email: Players[0].Email,
                Position: Players[0].Position,
                Name: Players[0].Name,
                ID: Players[0].ID,
                ActiveState: Players[0].ActiveState,
              },
              {
                Email: Players[1].Email,
                Position: -1,
                Name: Players[1].Name,
                ID: Players[1].ID,
                ActiveState: false,
              },
            ],
          });
        }
      }
    }

   navigation.navigate('Player_startgame');
  };
  
  //---------------------------------------------------------------------Return
  return (
    <MenuProvider>
      <View style={{ flex: 1, backgroundColor: "#FFF7F0" }}>
        <View>
          <View style={styles.tapee}>{t}</View>
          <View style={styles.tt} opacity={0.6}>
            <Pressable
              onPress={() => {
                if (ActivePlayer.includes(user.email)) {
                  if (numberOfTape != 3 && Point >= 3 && isModalVisible==false) {
                    if (numberOfTape != null && Point != null) {
                      updateDoc(doc(db, "Game", IDToBeSent), {
                        NumberOftape: numberOfTape + 1,
                        Points: Point - 3,
                      });
                      playSound('pres');
                    }
                  }
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



        <Menu style={{ flex: 1, position: "absolute", top: 2 }}>
          <MenuTrigger>
            <View style={styles.info}>
              <Icon name="menu" size={25} color={"#FFF7F0"} />
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() =>{ playSound('pres'); alert(`info`)} }text="Info" />
            <MenuOption
              onSelect={()=>{  playSound('pres'); Alert.alert(
                "",
                "هل انت متأكد من انهاء اللعبة؟",
          [{
                text: "لا",
                style: "cancel"},
              { text: "نعم", onPress: () => {Exit();} }]
          );}}
              text="انهاء اللعبه"
            />
          </MenuOptions>
        </Menu>

        <View style={styles.pointt}>
          <Text style={styles.text}>{Point} نقاط</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.container}>
            <Pressable
              key={35}
              onPress={() => {
                if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                  <Text>{board[35]}</Text>
                  <View style={{ flex: "1.5", top: 5, flexDirection: 'row', margin: 2 }}>
                    <Text style={{ flexDirection: 'row', margin: -4, left: -10 }}>{joudCharPlayer1[35]}</Text>
                    <Text style={{ flexDirection: 'row', margin: -4, left: -5 }}>{joudCharPlayer2[35]}</Text>
                    <Text style={{ flex: "1.5", top: 5, flexDirection: 'row', margin: 2, left: -68 }}>{joudCharPlayer3[35]}</Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>

          <View style={styles.container}>
            {[34, 29].map((i) => (
              <Pressable
                key={i}
                onPress={() => {
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
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
                  if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
                    console.log("inside press");
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
                    style={{
                      width: 63, resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                    }}
                  >
                    <View style={{
                      flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                      justifyContent: "center", top: 1
                    }}>

                      <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                          <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[i]}</Text>
                          <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[i]}</Text>
                        </View>
                        <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[i]}</Text>
                      </View>
                      <Text>{board[i]}</Text>
                    </View>
                  </ImageBackground>
                </ImageBackground>
              </Pressable>
            ))}
          </View>

          <View style={styles.container}>
            <Pressable
              key={0}
              onPress={() => {
                if (ActivePlayer.includes(user.email)&&isModalVisible==false) {
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
                  style={{
                    width: 63, resizeMode: "contain", alignItems: "center",
                    justifyContent: "center", flexDirection: 'row', height: 65, flexDirection: "row"
                  }}
                >
                  <View style={{
                    flexDirection: 'column', flex: "1", resizeMode: "contain", alignItems: "center",
                    justifyContent: "center", top: 1
                  }}>

                    <View style={{ flex: 1, flexDirection: 'column', margin: -17 }}>
                      <View style={{ flexDirection: 'row', flex: 1, margin: 26, right: 21 }} >
                        <Text style={{ flex: 1, margin: -5, marginRight: 30 }}>{joudCharPlayer1[0]}</Text>
                        <Text style={{ flex: 1, margin: -5, marginLeft: 9 }}>{joudCharPlayer2[0]}</Text>
                      </View>
                      <Text style={{ flex: 1, marginTop: -40, marginLeft: 18 }}>{joudCharPlayer3[0]}</Text>
                    </View>
                    <Text>{board[0]}</Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </Pressable>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {/* <Modal
            isVisible={isModalVisible}
            animationInTiming={60}
            animationOutTiming={6000}
          > */}
          {/* <View style={styles.showQ}>
              <Text>{ModalContent}</Text>
            </View> */}
          {/* </Modal> */}

          {isModalVisible ?
            <View style={styles.showQ}>
              <Text>{ModalContent}</Text>
            </View>
            :
            null
          }
          <View style={styles.chat}>
          <Pressable style={styles.ChatDesign} onPress={() => { navigation.navigate('chat', { R_ID: IDToBeSent }) }} >
          <Icon name="chat" size={30} color={"#FFF7F0"} />
            {/* <Image style={styles.ChatDesign} source={require("../../../../assets/chat.png")} />  */}
          </Pressable>
        </View>


          {/*chatbubble-ellipses-outline
          {/* 
 <Modal
 isVisible={isModalVisible==2}
 animationInTiming={60}
 animationOutTiming={900}
 >
 <View style={styles.showQ}>
 <Text style={styles.textShowQ}>صوت للمستكشفة</Text>
 <View style={styles.showQbox}>
 <View style={styles.containerShowQ}>
 <Pressable
 style={styleb1}
 onPress={() => {
 Move("Vote Explorer",0)
 }}
 >
 <Text style={styles.text}>{Player[0]}</Text>
 </Pressable>
 </View>
 <View style={styles.containerShowQ}>
 <Pressable
 style={styleb2}
 onPress={() => {
 Move("Vote Explorer",1)
 }}
 >
 <Text style={styles.text}>{Player[1]}</Text>
 </Pressable>
 </View>
 </View>
 </View>
 </Modal>
 */}
        </View>
        <FlashMessage />
      </View>
    </MenuProvider>
  );
  //---------------------------------------------------------------------
}

