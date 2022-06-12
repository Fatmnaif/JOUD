import { StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,Dimensions,Alert } from 'react-native';
import React, { useState ,useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { db,authentication} from '../../config_firebase/firebase';
import { BarChart } from "react-native-chart-kit";
import { collection, query, onSnapshot ,limit, orderBy,getDoc,doc} from "firebase/firestore";
import img4 from '../../../assets/joud1st.png';
import img5 from '../../../assets/joud2nd.png';
import img6 from '../../../assets/joud3rd.png';
import img1 from '../../../assets/dd.png';

  export default function Dashboard({navigation}) {

    const [Name,setName]=useState('')
    const [Points,setPoints]=useState('')
    const [value, setValue] = useState(null);
    const [Player, setPlayer] = useState(['']);
    const [Top_10Players, setTop_10Players] = useState(['']);
  
    const [Total_games,setTotal_games]=useState(['']);
    const [Total_wins,setTotal_wins]=useState(['']);
    const [Total_losses,setTotal_losses]=useState(['']);
  
  
      useEffect(() => {
        const q = query(collection(db, 'player'),orderBy('Point',"desc"),limit(10))
        const finish=  onSnapshot(q, (querySnapshot) => {
          setTop_10Players(querySnapshot.docs.map(doc =>({ ...doc.data(), id: doc.id })))
          })
   return finish;
        },[])
  
    
        
      const user = authentication.currentUser;
  
      if (user !== null) {
       var uid = user.uid;
  
      const docref=doc(db,'player', uid)
      getDoc(docref).then((doc)=>{
      setName(doc.get('name'))
      setPoints(doc.get('Point'))
      setTotal_games(doc.get('TotalGame'))
      setTotal_wins(doc.get('TotalWins'))
      setTotal_losses(doc.get('TotalLosses'))
       }
       )
    
  //database Top_10Players
  
       
    
      function performace(props) {
        
        return(
          <View style={styles.performaceStyle}>
          
          <BarChart  
          data={{
            labels: [' الفوز', ' الخساره', 'الإجمالي'],
            datasets: [{ data: [Total_wins,Total_losses,Total_games]}],
          }}
          width={Dimensions.get('window').width - 120}
          height={250}
          yAxisLabel={''}
          xAxisLabel={''}
          
          fromZero={'true'}
          withInnerLines={0}
          showValuesOnTopOfBars={'true'}
        
          showBarTops={'false'}
          chartConfig={{
            backgroundColor: '#4C5784',
            backgroundGradientFrom: '#ffff',
            backgroundGradientTo: '#ffff',
            fillShadowGradient:'skyblue',
            fillShadowGradientOpacity:1,
            decimalPlaces: 2,
            labelColor: (opacity = 1) => '#4C5784',
            color: (opacity = 255) => '#4C5784',
            style: {
              borderRadius: 50, padding: 2 ,borderWidth:3,
            },
          }}
        />
       
          </View>
          
        );
      }
  
      
  
  function topten(props) {
    return (
     <View style={styles.ToptenStyle}>
     <View style={styles.Players}> 
     <ScrollView>
         {Top_10Players.map((item)=> {
       //    Alert.alert(item.name)
            return(
        
               <View style={styles.Playercontainer} key={item.id}>
                <Text style={styles.Player_name}>{item.name}</Text>
              </View>
         )})}
         </ScrollView>
      </View>
      </View>
   
    );
  }
  
  function topthree (props){
    return(
  <View>
    
        <Image
          style={styles.joudlevel1}
          source={img4}
        />
   <View style={styles.joudlevelinfo1}>
    <Text style={{fontSize:17 ,color:'#4C5785',}}>{Top_10Players[0].name}</Text>
    <Text style={{fontSize:15 ,color:'#4C5785',}}> النقاط : {Top_10Players[0].Point}</Text>
    
        </View>
  
        {/* /the first place end here  */}
       
  <Image
          style={styles.joudlevel2}
          source={img5}
        />
        <View style={styles.joudlevelinfo2}>
       
        <Text style={{fontSize:17 ,color:'#4C5785',}} >{Top_10Players[1].name}</Text>
        <Text style={{fontSize:15 ,color:'#4C5785',}} >النقاط : {Top_10Players[1].Point}</Text>
        </View>
      
          <Image
          style={styles.joudlevel3}
          source={img6}
        />
        <View style={styles.joudlevelinfo3}>
      
        <Text style={{fontSize:17 ,color:'#4C5785',}} >{Top_10Players[2].name}</Text>
        <Text style={{fontSize:15 ,color:'#4C5785',}} > النقاط : {Top_10Players[2].Point}</Text>
        </View>
       
  
  </View>
    );
  }
  
  function determineOption(va){
    if(va==1){
     return topthree();
    }
    else if(va==2){
      return topten();
    }
    else{
      return performace();
    }
  }
   
      return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
  
  
      
          <View style={styles.box1}>
  
  
   
        <View style={styles.circle}>
  
        <Image style={styles.img} source={img1}/>
        </View>  
        
        <Text style={styles.mytext1}>{Name}</Text>
        <Text style={styles.mytext22}>النقاط: {Points} </Text>
        <Text style={styles.mytext}>
     
        {Player.map((data) => (
              <View key={data.id} >
                <Text style={styles.mytext}> {data.Name} </Text>
              </View>
            ))} 
           
          </Text>
          <View style={styles.line}/>
       {Player.map((data) => (
        <View  key={data.id}>
        <Text style={styles.mytext2}> {data.Scores}</Text>
        </View>
         ))}
        </View>
       
       <View style={styles.menue}> 
       <Dropdown
          style={[styles.dropdown]}
          placeholder={'أدائي'}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.containerStyle}
          iconStyle={styles.iconStyle}
          data={[
            { label: "أفضل ثلاث لاعبات", value: 1},
            { label: "أفضل عشر لاعبات", value:2},
            { label: "أدائي", value: 3},
          
        ]}
        
          maxHeight={170}
          labelField="label"
          valueField="value"
          activeColor={'#D9E8F1'}
          autoScroll={0}
          value={value}
        
          onChange={item => {
            setValue(item.value);
            determineOption(item.value);
            
          }}
          
        />
       </View>
  
       <View  style={styles.box2}>
       
       {determineOption(value)
       
       /* {value == 2? topten():performace()} */}
      
       </View>
     
  
         </View>
       
      );
    }}
    const styles = StyleSheet.create({
      C12:{
  top:60,
  
  
      },
      C1:{
        flex:1,
        height:9990,
        color:'#000'
      },
      box1: {
        flex:1,
        position: 'absolute',
      left:50,
      right:50,
      top:90,
      height:260,
      borderWidth:2,
      borderRadius:30,
      padding:10,
      borderColor:'#B7DFD7',
    
      },
      menue:{
        top:370,
        left:210,
        backgroundColor:'#D9E8F1',
        width:90,
        height:25,
        borderRadius:30,
      },
      circle:{
       marginLeft:'auto',
       marginRight:'auto',
       marginTop:30,
             height: 100,
          width: 100,
          top:-20,
          borderRadius:90,
        backgroundColor:'#B7DFD7',
        borderColor:'#B7DFD7',
      },
      img:{
        width: 70,
        height: 70,
        left: 10,
        bottom: -10,
       justifyContent:'center',
      },
      mytext:{
        justifyContent:'center',
        left:20,
        right:60,
        textAlign:'center',
        padding:9,
       fontSize:25,
         top:50,
      color:'#5C7E95',
      },
      mytext1:{
        justifyContent:'center',
        left:2,
        right:60,
        top:-10,
        textAlign:'center',
        padding:9,
       fontSize:25,
         color:'#5C7E95',
      },
      mytext22:{
        justifyContent:'center',
        left:2,
        right:60,
        top:-4,
        textAlign:'center',
        padding:9,
        fontSize:20,
        color:'#5C7E95',
      },
      line:{
    bottom:120,
    borderWidth:1,
     borderColor:'#B7DFD7',
    marginLeft:50,
    marginRight:50,
    },
    mytext2:{
      textAlign:'center',
      padding:6,
      fontSize:18,
       color:'#000',
    },
    selectedTextStyle: {
      borderRadius: 30,
      fontSize: 16,
      marginLeft: 20,
      color:'#4C5785',
      width:50
  
    },
    iconStyle: {
      width: 20,
      height: 20,
      backgroundColor:'#D9E8F1',
    },
    box2:{
      
      position: 'absolute',
      left:50,
      right:50,
      top:400,
      height:300,
      borderWidth:2,
      borderRadius:30,
      padding:80,
      marginTop:50,
      borderColor:'#B7DFD7',
    
    },
    level1:{
      left:30,
      right:90,
    top:15,
    },
    level2:{
      left:127,
    bottom:6,
    },
    level3:{
      right:50,
      bottom:125,
      left:-40,
    },
    joudlevel1:{
      bottom:'20%',
      width:'95%',
      height:'35%',
      justifyContent:'center',
      margin:1,
    },
    joudlevel2:{
      bottom:'35%',
      width:'95%',
      height:'35%',
      left:'64%',
    },
    joudlevel3:{
      bottom:'79%',
      right:'45%',
      width:'95%',
      height:'35%',
      
    },
    joudlevelinfo1:{
    justifyContent:'center',
    alignItems:'center',
    bottom:'20%',
    },
    joudlevelinfo2:{
    bottom:80,
    left:'65%',
    bottom:'36%',
    alignItems: 'center',
    },
    joudlevelinfo3:{
      bottom:80,
      right:'50%',
      bottom:'79%',
      alignItems: 'center',
      },
      textstyle2:{
        position: 'absolute',
        left:10,
        right: 100.2,
        top: 55.42,
        bottom: 40.89,
        backgroundColor:'#AFD1CB',
        top: 2.17,
        bottom: 40.64,
        
        borderRadius:10},
        textstyle2:{
          position: 'absolute',
          left:10,
          right: 100.2,
          top: 55.42,
          bottom: 40.89,
          backgroundColor:'#AFD1CB',
          top: 2.17,
          bottom: 40.64,
         
          borderRadius:10},
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    left:70,
    right:'auto',
    color:'#4C5784',
    borderRadius:4,
    borderEndWidth:2,
    borderColor:'#B7DFD7',
  },
      Playercontainer:{
        justifyContent:'center',
        borderColor:'#6F96B3',
        borderRadius: 24,
        borderWidth:1,
        width:265,
        height:41,
        top: 7.17,
        marginVertical:3,
      },
   
      backgrounicon:{
        position: 'absolute',
        width:39,
        height:35,
        left: 175,
        right: 0.67,
        top: 2.17,
        bottom: 40.64,
        backgroundColor:'#B7DFD7',
      },
    Player_name:{
      paddingRight:150,
      alignItems:'center',
      paddingHorizontal:40,
      paddingRight:40,
      marginLeft:50,
      fontSize:18,
      top: 5.17,
      color:'#4C5785',
    },
  
        Joudicon:{
         position: 'absolute',
          width:30,
          height:30,
          left: 10,
          right: 0.67,
          top: 4.17,
          paddingLeft:20,
          bottom: 40.64,
       },
       dropdown: {
         color:'#AFD1CB',
        height: 45,
        width:170,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingHorizontal: 8,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#D9E8F1',
        borderColor:'#D9E8F1',
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor:'#D9E8F1',
        left: 80,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        borderColor:'#D9E8F1',
        borderWidth:1
      },
      
      selectedTextStyle: {
        fontSize: 16,
        color:'#4C5785',
       backgroundColor:'#D9E8F1',
        textAlign:'right',
    
      },
      containerStyle:{
        backgroundColor:'#D9E8F1',
        height:120,
      
        borderRadius:20,
      },  
    ToptenStyle:{
        bottom:80,
        width:590,
        left:-60,
        right:90,
        height:290,
      },
   performaceStyle:{
    bottom:60,
        right:75,
        margin:3,
        height:290,
       
       
   },
    });
    
  

