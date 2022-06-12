import { StyleSheet, Text, View,Image,ScrollView ,TouchableOpacity,Dimensions,Alert } from 'react-native';
import React, { useState ,useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { db,authentication } from '../../config_firebase/firebase';
import { BarChart } from "react-native-chart-kit";
import { collection, query, onSnapshot ,limit, orderBy,getDoc,doc} from "firebase/firestore";
import img4 from '../../../assets/joud1st.png';
import img5 from '../../../assets/joud2nd.png';
import img6 from '../../../assets/joud3rd.png';
import img1 from '../../../assets/dd.png';

export default function Dashboard({ navigation }) {

  const [Name, setName] = useState('')
  const [Points, setPoints] = useState('')
  const [value, setValue] = useState(null);
  const [Player, setPlayer] = useState(['']);
  const [Top_10Players, setTop_10Players] = useState(['']);

  const [Total_games, setTotal_games] = useState(['']);
  const [Total_wins, setTotal_wins] = useState(['']);
  const [Total_losses, setTotal_losses] = useState(['']);
  const [id1, setid1] = useState('');

  useEffect(
    () =>
      onSnapshot(collection(db, "player"), (snapshot) =>
        setPlayer(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ), []);

  useEffect(() => {
    const q = query(collection(db, 'player'), orderBy('Point', "desc"), limit(10))
    const finish = onSnapshot(q, (querySnapshot) => {
      setTop_10Players(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return finish;
  }, [])


  const user = authentication.currentUser;

  if (user !== null) {
    var uid = user.uid;

    const docref = doc(db, 'Admin', uid)
    getDoc(docref).then((doc) => {
      setName(doc.get('name'))
    })

    const docrf=doc(db,'Game', 'zVI1SSB')

    getDoc(docrf).then((doc)=>{
    
    setTotal_games(doc.get('TotalGames'))
    
    setTotal_wins(doc.get('TotalWins'))
    
    setTotal_losses(doc.get('TotalLosses'))
    
    setid1(doc.id)
    })



    return (
    
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

        <Text style={styles.Pagtitle}> إحصائيات اللعبه </Text>


        <View style={styles.box1}>

          <BarChart key={id1.id}
            data={{
              labels: [' الفوز', ' الخساره', 'الإجمالي'],
              datasets: [{ data: [Total_wins, Total_losses, Total_games] }],
            }}
            width={Dimensions.get('window').width - 120}
            height={220}
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
              fillShadowGradient: 'skyblue',
              fillShadowGradientOpacity: 1,
              decimalPlaces: 2,
              labelColor: (opacity = 1) => '#4C5784',
              color: (opacity = 255) => '#4C5784',
              style: {
                borderRadius: 50, padding: 2, borderWidth: 3,
                justifyContent: 'center',
                alignContent: 'center'
              },
            }}
          />

        </View>

<View style={styles.TopTenStyle}>
<Text style={{textAlign:'center' , fontSize:20, color:'#7E87AF'}}>أفضل عشرة لاعبات </Text>
</View>

        <View style={styles.box2}>

          <View style={styles.Players}>
            <ScrollView>
              {Top_10Players.map((item) => {
                return (
                  <View style={styles.Playercontainer} key={item.id}>
                    <Text style={styles.Player_name}>{item.name}</Text>
                    <Image style={styles.Joudicon}
               source= {img1}/>
                  </View>
                )
              })}
            </ScrollView>
          </View>

        </View>


      </View>

    );
  }
}
const styles = StyleSheet.create({
  C12: {
    top: 60,


  },
  C1: {
    flex: 1,
    height: 9990,
    color: '#000'
  },
  box1: {
    flex: 1,
    position: 'absolute',
    marginLeft: 50,
    marginRight: 50,
    top: '15%',
    width: '75%',
    height: 260,
    borderWidth: 2,
    borderRadius: 30,
    padding: 5,
    borderColor: '#B7DFD7',
    justifyContent: 'center',
    alignContent: 'center'
  },
  Pagtitle: {
    color: '#4C5785',
    height: 25,
    fontWeight: '700',
    fontSize: 20,
    alignContent: 'center',
    position: 'absolute',
    left: '59%',
    top: '10%',
  },
  TopTenStyle:{
borderColor:'#BBCEDB',
borderRadius:30,
borderWidth:2,
marginRight:'50%',
marginLeft:'50%',
backgroundColor:'#BBCEDB',
top: 405,
width:'44%',
height:'5%',
alignSelf:'auto',
  },
  box2: {
    position: 'absolute',
    marginLeft: 50,
    marginRight: 50,
    top: 420,
    padding:5,
    height: 300,
    width: '75%',
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    marginTop: 50,
    borderColor: '#B7DFD7',
  },
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
        marginVertical:8,
        left:9,
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

  Joudicon: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 10,
    right: 0.67,
    top: 4.17,
    paddingLeft: 20,
    bottom: 40.64,
  },
  dropdown: {
    color: '#AFD1CB',
    height: 45,
    width: 170,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#D9E8F1',
    borderColor: '#D9E8F1',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#D9E8F1',
    left: 80,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderColor: '#D9E8F1',
    borderWidth: 1
  },

  selectedTextStyle: {
    fontSize: 16,
    color: '#4C5785',
    backgroundColor: '#D9E8F1',
    textAlign: 'right',

  },
  containerStyle: {
    backgroundColor: '#D9E8F1',
    height: 120,

    borderRadius: 20,
  },
  ToptenStyle: {
    bottom: 80,
    width: 590,
    left: -60,
    right: 90,
    height: 290,
  },
  performaceStyle: {
    bottom: 60,
    right: 75,
    margin: 3,
    height: 290,


  },
});

