

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db,authentication } from '../../config_firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddPlayers({ navigation }) {
  const collage_data = [
    { label: '  اللغات', value: 'اللغات' },
    { label: ' إدارة الاعمال ', value: 'إدارة الأعمال' },
    { label: 'الهندسة ', value: 'الهندسة' },
    { label: 'العلوم ', value: 'العلوم' },
    { label: 'التصاميم و الفنون', value: 'التصاميم والفنون' },
    { label: '  الآداب', value: 'الآداب' },
    { label: 'التربية', value: 'التربية' },
    { label: ' الطب البشري', value: 'الطب البشري' },
    { label: 'طب الأسنان', value: 'طب الأسنان' },
    { label: ' الصيدلة', value: 'الصيدلة' },
    { label: 'الصحة وعلوم التأهيل', value: 'الصحة وعلوم التأهيل' },
    { label: ' التمريض', value: 'التمريض' },
    { label: 'علوم الحاسب والمعلومات', value: 'علوم الحاسب والمعلومات' },
    { label: ' المجتمع', value: 'المجتمع' },
  ];

  const Academic_leveldata = [
    { label: '          ١', value: '1' },
    { label: '          ٢', value: '2' },
    { label: '          ٣', value: '3' },
    { label: '          ٤', value: '4' },
    { label: '          ٥', value: '5' },
    { label: '          ٦', value: '6' },
    { label: '          ٧', value: '7' },
    { label: '          ٨', value: '8' },
    { label: '          ٩', value: '9' },
    { label: '          ١٠', value: '10' },
    { label: '          ١١', value: '11' },
    { label: '          ١٢', value: '12' },
  ];

  const [Login, setLogin] = useState(false);
  const [secureEntry, setsecureEntry] = useState(true);

  //text input states

  const [Collage, setCollage] = useState('');
  const [Name, setName] = useState('');
  const [Phone_number, setPhone_number] = useState('');
  const [Academic_level, setAcademic_level] = useState('');
  const [Major, setMajor] = useState('');
  const [value, setValue] = useState('');
  const [ID, setID] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  //
  const CreatePlayer = () => {
    if (Email.length != 0) {
      if (ID.length == 9) {
        if (Password.length != 0) {
          if ( Password == confirmPassword) {
            if (Password.length >= 8) {
              if (Phone_number.length == 9) {
                createUserWithEmailAndPassword(authentication, Email, Password).then((re) => {
                  setLogin(true);
                  setDoc(doc(db, "player", re.user.uid), {
                    name: Name,
                    email: Email,
                    Academicـlevel: Academic_level,
                    phone: Phone_number,
                    collage: Collage,
                    student_id: ID,
                    TotalGame: 0,
                    TotalWins: 0,
                    TotalLosses: 0,
                    Point: 0,
                  });
                  Alert.alert(" تم اضافة لاعبة")
                  navigation.goBack()

                }).catch((error) => { alert(error.message); })
              }
              else { Alert.alert("رقم الجوال يجب ان يكون ٩ ارقام فقط  ") }
            }
            else {Alert.alert("الرقم السري يجيب ان يكون ٨ خانات  ") }
          }
          else {  Alert.alert("الرقم السري مختلف  ") }
        }
        else { Alert.alert(" خطا في ادخال الرقم الجامعي ") }
      }
    }

    else {
      if (ID.length == 0 || Password.length == 0 || Phone_number.length == 0)
        Alert.alert(" الرجاء ادخال كافة البيانات ")
      else
        Alert.alert(" الرجاء ادخال البريد الالكتروني ")
    }
  }



  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  const renderItem2 = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };
  return (

    <View style={styles.container}>

      <View style={styles.rectangle} />
      <View style={styles.rectangle2} />
      <View style={styles.rectangle4} />
      <View style={styles.rectangle3} />
      <View style={styles.baseTop} />


      <Text style={styles.Userst}> إضافة لاعبة   </Text>




      <View style={styles.add}>
        <TouchableOpacity onPress={CreatePlayer}>
          <Text style={styles.textstyle2}>إضافة </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.admin_info}>
        <ScrollView >
          <Text style={styles.text1}> الاسم  </Text>
          <TextInput style={styles.textInput1} autoCapitalize={true} placeholder={'    الاسم كامل '}onChangeText={text => setName(text)} />
          <View style={styles.line1}></View>

          <Text style={styles.text2}> الرقم الجامعي  </Text>
          <TextInput style={styles.textInput2} autoCapitalize={true} placeholder={'    الرقم الجامعي  '}  onChangeText={text => setID(text)} />
          <View style={styles.line2}></View>

          <Text style={styles.text3}> البريد الالكتروني  </Text>
          <TextInput style={styles.textInput3} autoCapitalize={true} placeholder={'    البريد الالكتروني  '}  onChangeText={text => setEmail(text)} />
          <View style={styles.line3}></View>

          <Text style={styles.text4}>رقم الجوال   </Text>
          <TextInput style={styles.textInput4} autoCapitalize={true} placeholder={'  5xxxxxxxx  '} onChangeText={text => setPhone_number(text)} />
          <View style={styles.line4}></View>

          <Text style={styles.text5}> الرقم السري </Text>
          <TextInput style={styles.textInput5} autoCapitalize={true} secureTextEntry={secureEntry}  placeholder={'  ********  '}  onChangeText={text => setPassword(text)} />
          <View style={styles.line5}></View>

          <TouchableOpacity onPress={() => { setsecureEntry((prev) => !prev); }}>
          {secureEntry ?
            <MaterialCommunityIcons style={styles.show} name="eye-outline" size={18} />
            :
            <MaterialCommunityIcons style={styles.show} name="eye-off-outline" size={18} />
          }</TouchableOpacity>
          
          <Text style={styles.text6}> تاكيد الرقم السري  </Text>
          <TextInput style={styles.textInput6} secureTextEntry={secureEntry} autoCapitalize={true} placeholder={'  ********  '} onChangeText={text => setconfirmPassword(text)} />
          <View style={styles.line6}></View>
   
          <TouchableOpacity onPress={() => { setsecureEntry((prev) => !prev); }}>
            {secureEntry ?
              <MaterialCommunityIcons style={styles.show1} name="eye-outline" size={18} />
              :
              <MaterialCommunityIcons style={styles.show1} name="eye-off-outline" size={18} />
            }

          </TouchableOpacity>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={collage_data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="الكلية"
            searchPlaceholder="بحث...."
            value={Collage}
            onChange={item => {
              setCollage(item.value);
            }}
            renderItem={renderItem}
          />
 

          <Dropdown
            style={styles.dropdown1}
            placeholderStyle={styles.placeholderStyle1}
            selectedTextStyle={styles.selectedTextStyle1}
            inputSearchStyle={styles.inputSearchStyle1}
            iconStyle={styles.iconStyle}
            data={Academic_leveldata}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="المستوى الاكاديمي "
            searchPlaceholder="بحث...."
            value={Academic_level}
            onChange={item => {
              setAcademic_level(item.value);
            }}
            renderItem={renderItem2}
          />


        </ScrollView>

      </View>

      <TouchableOpacity onPress={() =>navigation.goBack()} >
        <Image style={styles.Back_icon}
          source={require('/Users/shahadfehaidalqhatni/s/assets/Backicon.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ScrollView:{
  //   height:800
  // },
  Userst: {
    color: '#4C5785',
    height: 25,
    fontWeight: '700',
    fontSize: 20,
    alignContent: 'center',
    position: 'absolute',
    left: '18%',
    top: 109,
    left: 190
  },

  add: {
    backgroundColor: '#4C5785',
    width: 200,
    height: 58,
    borderRadius: 100,
    position: 'absolute',
    left: '26.8%',
    bottom: ' 3.03%',
  },

  textstyle2: {
    width: 224,
    height: 26,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    top: '40.57%',
    left: -15
  },
  Back_icon: {
    position: 'absolute',
    left: 30.47,
    width: 25,
    height: 20,
    top: -30.78,
  },
  rectangle: {
    color: '#BBCEDB',
    left: 40,
    top: 50,
    width: 10 * 2,
    height: 20,
  },
  rectangle2: {
    width: 30,
    height: 40,
    top: 80,
    left: 360,
    backgroundColor: "rgba(111, 151, 177, 1)",
  },
  rectangle4: {
    width: 30,
    height: 40,
    top: 40,
    left: 390,
    backgroundColor: "#BBCEDB",
  },
  admin_info: {
    position: 'absolute',
    width: 357,
    height: 620,
    left: 29.6,
    top: 170,
    backgroundColor: '#D9E8F1',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: '#D9E8F1'
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
    top: 113,
    position: "absolute",
  },

  line1: {
    width: 290,
    height: 0,
    top: 30,
    left: 33,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line2: {
    width: 290,
    height: 0,
    top: 60,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line3: {
    width: 290,
    height: 0,
    top: 90,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line4: {
    width: 290,
    height: 0,
    top: 120,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line5: {
    width: 290,
    height: 0,
    top: 150,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line6: {
    width: 290,
    height: 0,
    top: 170,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  line7: {
    width: 290,
    height: 0,
    top: 210,
    left: 33,
    borderRadius: 100,
    borderColor: '#4C5785',
    borderWidth: 1
  },

  text1: {
    color: '#4C5784',
    fontSize: 17,
    top: 40,
    left: 275
  },

  textInput1: {
    left: 140,
    top: 20,
    width: 120,
    height: 20,
    alignItems: 'center'
  },

  text2: {
    color: '#4C5784',
    fontSize: 17,
    top: 65,
    left: 227
  },

  textInput2: {
    left: 120,
    top: 45,
    width: 120,
    height: 20,
    alignItems: 'center'
  },

  text3: {
    color: '#4C5784',
    fontSize: 17,
    top: 90,
    left: 215
  },

  textInput3: {
    left: 100,
    top: 70,
    width: 120,
    height: 20,
    alignItems: 'center'
  },

  text4: {
    color: '#4C5784',
    fontSize: 17,
    top: 115,
    left: 245
  },

  textInput4: {
    left: 100,
    top: 95,
    width: 120,
    height: 20,
    alignItems: 'center'
  },

  text5: {
    color: '#4C5784',
    fontSize: 17,
    top: 145,
    left: 240
  },

  textInput5: {
    left: 100,
    top: 125.5,
    width: 120,
    height: 20,
    alignItems: 'center'
  },


  text6: {
    color: '#4C5784',
    fontSize: 17,
    top: 167,
    left: 200
  },

  textInput6: {
    left: 100,
    top: 150,
    width: 120,
    height: 20,
    alignItems: 'center'
  },


  text7: {
    color: '#4C5784',
    fontSize: 17,
    top: 200,
    left: 280
  },

  textInput7: {
    left: 100,
    top: 182,
    width: 130,
    height: 20,
    alignItems: 'center'
  },
  dropdown: {
    margin: 16,
    height: 0,
    width: 290,
    left: 17,
    top: 200,
    borderBottomColor: '#4C5784',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#4C5784'
  },
  placeholderStyle: {
    fontSize: 16,
    left: 250,
    top: -30,
    color: '#4C5784'
  },
  selectedTextStyle: {
    fontSize: 16,
    left: 80,
    top: -20,
    color: '#4C5784'
  },
  iconStyle: {
    width: 20,
    height: 20,
    left: -260,
    top: -20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown1: {
    margin: 16,
    height:0,
    width:290,
    left:17,
    top:240,
    borderBottomColor: '#4C5784',
    borderBottomWidth:1,
    borderWidth:1,
    borderColor:'#4C5784'},
    
  placeholderStyle1: {
    fontSize: 16,
    left:170,
    top:-30,
    color:'#4C5784'
  },
  selectedTextStyle1: {
    fontSize: 16,
    left:80,
    top:-20,
    color:'#4C5784'
    
  },
  iconStyle1: {
    width: 20,
    height: 20,
    left:-270,
    top:-20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16, 
    alignContent:'center',
    alignItems:'center'},
    show: {
      top: 104,
      color: '#4C5784',
      left: 50.50,
      height: 20,
      width: 20,
    },
    show1: {
      top: 130,
      color: '#4C5784',
      left: 50.50,
      height: 20,
      width: 20,
    },
});
