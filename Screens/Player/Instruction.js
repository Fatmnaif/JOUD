
import { Alert,Button,Text,StyleSheet,View,StatusBar } from "react-native";
import { Image } from "react-native";
import React, {useState,useEffect,} from 'react';
import Board from '../Game/Board';

export default function Instruction({ navigation }) {
    //const [sound, setSound] = useState();

    const [board,setBoard]=useState([])
  const [pssIndexs,setPssIndexs]=useState([])
  const [tapeIndexs,setTapeIndexs]=useState([])
  const [fogIndexs,setFogIndexs]=useState([])
  let xx;
  useEffect(() => {
    xx = Board();
    setBoard(xx.Board);
    setPssIndexs(xx.PssIndexs);
    setFogIndexs(xx.FogIndexs);
    setTapeIndexs(xx.TapeIndexs);
    }, []);
 
let Board__=[];

let index=0;
while (index != 36) {
    if (pssIndexs.includes(index)) {
    Board__[index] = 'p'
    } else if (fogIndexs.includes(index)) {
    Board__[index] = 'f'
    } else if (tapeIndexs.includes(index)) {
    Board__[index] = 't'
    } else {
    Board__[index] = 's'
    }
    index++;
}
    var InstructionContent =[
        {img:require("../../../assets/instru3.png")},
        {img:require("../../../assets/instru4.png")},
    ];
    const [instructionsPage,setInstructionsPage]=useState(1);
    function Content(){
if(InstructionContent[instructionsPage-1].img!='null'){
        return(
            <View style={styles.insideContainer}>
                <Image style={{height:775,width:400,padding:50}} source={InstructionContent[instructionsPage-1].img}/>
            </View>
        )
    }
}
    function instructionsPageCtrl(goTo){
        if(goTo=="Previous"){
            let prevPage=instructionsPage-1;
            if(instructionsPage>1){setInstructionsPage(prevPage)}
        }
        else{
            let nextPage=instructionsPage+1;
            if(instructionsPage<InstructionContent.length){setInstructionsPage(nextPage)}
            else{navigation.navigate('SinglePlayerMode',{Boardf:Board__})}
            
        }
    }
      return (
        <View style={styles.container}>
            <View style={styles.InstructionContainer}>
                <View style={styles.insiderContainer}>
                    {Content()}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.PreButtonStyle}>   
                     <Button title='السابق' onPress={()=>{instructionsPageCtrl("Previous");}} color='white'></Button>
                     </View>
                        <Text style={{fontSize:13 , padding:3, color:'#979797', top:'158%' }}>{instructionsPage}/{InstructionContent.length}</Text>
                        <View style={styles.nextButtonStyle}> 
                        <Button title='التالي' onPress={()=>{instructionsPageCtrl("Next");}} color='white'></Button>
                        </View>
                        {/*ende of Button Container*/}
                        </View>
                        <View style={styles.skip}>
                        <Button title="تخطي" onPress={()=>{ navigation.navigate('SinglePlayerMode',{Boardf:Board__})} } color='#979797' style={{fontSize:4 }}></Button>
                        </View>
                        {/*ende of insideInstructionContainer*/}
                        </View>
                        {/*ende of instructionContainer*/}
                        </View>
                        <StatusBar style="auto" />
                        {/*ende of container*/}
                        </View>
                        );
                    }
                    const styles = StyleSheet.create({
                        container: {
                            flex: 1,
                            backgroundColor: 'rgba(1,1,1,0.7)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        InstructionContainer:{ //العنوان 
                          position:'absolute',
                            alignItems: 'center',
                            backgroundColor:'white',
                            fontWeight:'bold',
                            color:'#4C5784',
                            width:'100%',
                            height:'94.3%',
                            top:30
                        },
                        insiderContainer:{//حق البوتنز
                            alignItems: 'center',
                            backgroundColor:'white',
                            top:10,
                            width:'100%',
                            height:205
                          },
                          skip:{
                            top:'279.5%',
                          },
                            insideContainer:{
                                alignItems: 'center',
                                backgroundColor:'white',
                                height:'70%',
                                
                                width:'100%',
                                padding:1,
                            },
                          InstructionContentStyle:{
                            textAlign:'center',
                            color:'#4C5784',
                          padding:5,
                          top:39,
                          width:'100%',
                          height:'40%',

                          },
                          PreButtonStyle:{
                            borderColor:'#6F97B1',
                            borderRadius:50,
                            backgroundColor:'#6F97B1',
                            margin:3,
                            top:'154%',
                            width:90,
                            right:20,
                            
                          },
                          nextButtonStyle:{
                            borderColor:'#6F97B1',
                            borderRadius:50,
                            backgroundColor:'#6F97B1',
                            margin:3,
                            top:'154%',
                            width:90,
                            left:20,
                            
                          }
                        });



// export default function Instruction({ navigation }) {

//     //const [sound, setSound] = useState();
//     var InstructionContent =[
//         {Title:"مرحبًا!",img:require("../../../assets/ii.png"), discrebtion:"أنا جود, سأقوم بشرح اللعبة لكِ بشكل مختصر"},
//         {Title:"الهدف من اللعبة",img:require("../../../assets/iip.png"), discrebtion:" لديكِ استبيان عليك إيصاله لعمادة ضمان الجودة, بمساعدة صديقاتكِ "},
//         {Title:"طريقة سير اللعبة",img:require("../../../assets/deanship.png"), discrebtion:"للوصول إلى العمادة عليكِ العمل مع فريقك لتخطي الصعوبات والانتقال من غرفة إلى غرفة إلى أن تصلن للعمادة"},
//         {Title:"التصويت للغرفة التالية",img:require("../../../assets/roomm.png"), discrebtion:" سيتاح لكم التصويت لإحدى الغرف المجاورة (الغرفتين العلوية والسفلية) والتي ستكون بلون مغاير"},
//         {Title:"التصويت للغرفة التالية",img:require("../../../assets/ii.png"), discrebtion:"يمكنك التصويت للغرفة التي ترغبين أن ينتقل إليها فريقكِ بالنقر عليها"},
//         {Title:"الغرفة التالية",img:require("../../../assets/ii.png"), discrebtion:"بعد أن يقوم الفريق بأكمله بالتصويت للغرفة التالية سيتم اعتماد الغرفة الأعلى تصويتًا"},
//         {Title:"ماقبل الانتقال",img:require("../../../assets/uu.png"), discrebtion:"من أجل أن تنتقلن للغرفة التالية عليكنّ الإجابة عن السؤال الذي سيظهر لكن تلقائيًا"},
//         {Title:"التصويت للإجابة",img:require("../../../assets/happyJoud.png"), discrebtion:" صوّتي للإجابة التي تعتقدين أنها صحيحة بعد التشاور مع صديقاتكِ بالمحادثة"},
//         {Title:"التصويت للإجابة",img:require("../../../assets/happyJoud.png"), discrebtion:"بعد أن يصوت الفريق بأكمله سيتم اعتماد الإجابة الأعلى تصويتًا"},
//         {Title:"الإجابة بشكل صحيح",img:require("../../../assets/happyJoud.png"), discrebtion:"إذا كانت إجابة الفريق صحيحة سيتم إضافة نقاط للفريق وسيتم نقل الفريق تلقائيًا للغرفة التالية"},
//         {Title:"إجابة خاطئة",img:require("../../../assets/happyJoud.png"), discrebtion:"إذا صوت أغلبية الفريق لإجابة خاطئة فإن الاستبيان سيتعرض للتمزق"},
//         {Title:"إصلاح الاستبيان",img:require("../../../assets/happyJoud.png"), discrebtion:"في حال امتلاك الفريق لشريط لاصق واحد على الأقل, سيتم استخدامه تلقائيًا لإصلاح الضرر"},
//         {Title:"إصلاح الاستبيان",img:require("../../../assets/happyJoud.png"), discrebtion:" يمكن للفريق استبدال نقاطهم بشريط لاصق إضافي, كما أن بعض الغرف تحتوي على أشرطة لاصقة مجانية!"},
//         {Title:"أنواع الغرف",img:require("../../../assets/happyJoud.png"), discrebtion:" في أثناء تنقلكِ ستجدين ثلاثة أنواع من الغرف:الغرف الخالية, الغرف المنذرة بالخطر, غرف المتشائمين"},
//         {Title:"الغرف الخالية",img:require("../../../assets/happyJoud.png"), discrebtion:"تكون الغرف الخالية آمنة تمامًا ويمكنكم بعد الانتقال إليها استكمال اللعب عن طريق التصويت للغرفة التي تليها"},
//         {Title:"الغرف المنذرة بالخطر",img:require("../../../assets/happyJoud.png"), discrebtion:"وهي الغرف التي تكون إحدى جوانبها محاطة بغرفة ممتلئة بالمتشائمين الذين عليكن الابتعاد عنهم"},
//         {Title:"في حال الوصول لغرفة منذرة بالخطر",img:require("../../../assets/happyJoud.png"), discrebtion:"عليكن التصويت للغرفة التالية ثم الاجابة على السؤال المعروض بشكل صحيح, بعد ذلك سيتوجب عليكن التصويت لإحدى أعضاء الفريق لتستكشف الغرفة التالية"},
//         {Title:"دور المستكشفة",img:require("../../../assets/happyJoud.png"), discrebtion:"بعد أن يقوم الجميع بالتصويت سيتم اختيار اللاعبة الأعلى تصويتًا ونقلها تلقائيًا إلى الغرفة التالية"},
//         {Title:"الغرفة آمنة",img:require("../../../assets/happyJoud.png"), discrebtion:"إذا لم تحتوي الغرفة على متشائمين سيتم نقل باقي أعضاء الفريق لها تلقائيًا"},
//         {Title:"مصير المستكشفة",img:require("../../../assets/happyJoud.png"), discrebtion:"أما في حال احتوت الغرفة على المتشائمين فسيثبطون عزيمتها للإكمال وستحتجز معهم في الغرفة"},
//         {Title:"ماذا عن باقي الفريق؟",img:require("../../../assets/happyJoud.png"), discrebtion:"سيكمل باقي أعضاء الفريق رحلتهم للسعي نحو التطوير ويمكن لزميلتكم المستكشفة المشاركة في المحادثة الجماعية ومساعدة الفريق عن بعد"},
//         {Title:"نهاية اللعبة بالفوز",img:require("../../../assets/happyJoud.png"), discrebtion:"يفوز الفريق كاملًا في حال وصول لاعبة واحدة على الأقل إلى العمادة لتسليم الاستبيان"},
//         {Title:"نهاية اللعبة بالخسارة",img:require("../../../assets/happyJoud.png"), discrebtion:"تنتهي اللعبة في حال احتجز جميع أعضاء الفريق مع المتشائمين أو عندما يتلف الاستبيان ولم يكن لديكم أي شريط لاصق نتيجة الإجابة بشكل خاطئ "},
      
//     ];
//     const [instructionsPage,setInstructionsPage]=useState(1);
//     function Content(){
// if(InstructionContent[instructionsPage-1].img!='null'){
//         return(
//             <View style={styles.insideContainer}>
//                 <Image style={{height:61,width:50,}} source={InstructionContent[instructionsPage-1].img}/>
//                 <Text style={styles.InstructionContentStyle}  >{InstructionContent[instructionsPage-1].Title}</Text>
//                 <Text style={styles.InstructionContentStyle} >{InstructionContent[instructionsPage-1].discrebtion}</Text>
//             </View>
//         )
//     }
//     else {
//         return(
//             <View style={styles.insideContainer}>
//                 <Text >{InstructionContent[instructionsPage-1].Title}</Text>
//                 <Text>{InstructionContent[instructionsPage-1].discrebtion}</Text>
//             </View>
//         )
//     }
// }
//     function instructionsPageCtrl(goTo){
//         if(goTo=="Previous"){
//             let prevPage=instructionsPage-1;
//             if(instructionsPage>1){setInstructionsPage(prevPage)}
//         }
//         else{
//             let nextPage=instructionsPage+1;
//             if(instructionsPage<InstructionContent.length){setInstructionsPage(nextPage)}
//         }
//     }
//       return (
//         <View style={styles.container}>
//             <View style={styles.InstructionContainer}>
//                 <Text style={{   fontWeight:'bold', color:'#4C5784', margin:5, fontSize:17, }} >التعليمات</Text>
//                 <View style={styles.insiderContainer}>
//                     {Content()}
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                   <View style={styles.PreButtonStyle}>   
//                      <Button title='السابق' onPress={()=>{instructionsPageCtrl("Previous");}} color='white'></Button>
//                      </View>
//                         <Text style={{fontSize:13 , padding:3, color:'#979797' }}>{instructionsPage}/{InstructionContent.length}</Text>
//                         <View style={styles.nextButtonStyle}> 
//                         <Button title='التالي' onPress={()=>{instructionsPageCtrl("Next");}} color='white'></Button>
//                         </View>
//                         {/*ende of Button Container*/}
//                         </View>
//                         <Button title="تخطي" onPress={()=>{ navigation.navigate('SinglePlayerMode',{Boardf:Board__})} } color='#979797' style={{fontSize:4 }}></Button>
//                         {/* onPress={() => {    navigation.navigate('SinglePlayerMode',{Boardf:Board__}) */}
//                         {/*ende of insideInstructionContainer*/}
//                         </View>
//                         {/*ende of instructionContainer*/}
//                         </View>
//                         <StatusBar style="auto" />
//                         {/*ende of container*/}
//                         </View>
//                         );
//                     }
