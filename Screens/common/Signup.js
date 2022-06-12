import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import {authentication , db} from '../../config_firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from 'react-native-element-dropdown';
import { doc, setDoc } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Signup({ navigation }) {

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
  function Signupp() {
    if (Email.length != 0) {
      if (ID.length == 9) {
        if (Password.length != 0) {
          if (Password.length >= 8) {
            if (Password == confirmPassword) {
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
              
                  Alert.alert("تم انشاء حساب جديد بنجاح")
                  navigation.navigate('login')
                }).catch((error) => { alert(error.message); })
              }
              else { Alert.alert("رقم الجوال يجب ان يكون ٩ ارقام فقط  ") }
            }
            else { Alert.alert("الرقم السري مختلف  ") }
          }
          else { Alert.alert("الرقم السري يجيب ان يكون ٨ خانات  ") }
        }
        else { Alert.alert("الرجاء إدخال كلمة السر ") }
      }
      else { Alert.alert(" خطا في ادخال الرقم الجامعي ") }
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
    <ScrollView>
      <View style={styles.container}>

        <Image style={styles.line}
          source={require('../../../assets/line.png')} />

        <Image style={styles.joud}
          source={require('../../../assets/Joud2.png')} />
        <View style={styles.emailicon}>

          <MaterialCommunityIcons style={styles.emailicon} name="email-outline" size={18} />

        </View>
        <Text style={styles.text1} >جود</Text>
        <Text style={styles.text}>إنشاء حساب جديد </Text>
        <Text style={styles.text2}>يرجى إدخال بياناتك </Text>

        <Text style={styles.text3}> الاسم كامل </Text>
        <TextInput style={styles.textInput1} placeholder={'    الاسم كامل '} onChangeText={text => setName(text)} />
        <View style={styles.line1}></View>

        <Text style={styles.text4}> الرقم الجامعي </Text>
        <TextInput style={styles.textInput2} placeholder={'      رقم جامعي '} onChangeText={text => setID(text)} />
        <View style={styles.line2}></View>

        <Text style={styles.text5}> كلمة المرور </Text>
        <TextInput secureTextEntry={secureEntry} style={styles.textInput3} placeholder={'        *********'} onChangeText={text => setPassword(text)} />
        <View style={styles.line3}></View>
        <TouchableOpacity onPress={() => { setsecureEntry((prev) => !prev); }}>
          {secureEntry ?
            <MaterialCommunityIcons style={styles.show} name="eye-outline" size={18} />
            :
            <MaterialCommunityIcons style={styles.show} name="eye-off-outline" size={18} />

          }
        </TouchableOpacity>

        <Text style={styles.text6}> تاكيد كلمة المرور </Text>
        <TextInput secureTextEntry={secureEntry} style={styles.textInput4} placeholder={'        *********'} onChangeText={text => setconfirmPassword(text)} />
        <View style={styles.line4}></View>

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

        <Text style={styles.text7}> البريد الألكتروني</Text>
        <TextInput style={styles.textInput5} placeholder={'example@example.com'} value={Email} onChangeText={text => setEmail(text)} />
        <View style={styles.line6}></View>


        <Text style={styles.text8} >+996</Text>
        <View style={styles.line8}></View>

        <Text style={styles.text9}>رقم الجوال  </Text>

        <TextInput style={styles.textInput6} placeholder={'  5xxxxxxxx'} value={Phone_number} onChangeText={text => setPhone_number(text)} />
        <View style={styles.line9}></View>

        <TouchableOpacity style={styles.nextlogin} onPress={Signupp}>
          <Text style={styles.login}>إنشاء حساب  </Text>
        </TouchableOpacity>


        <Text style={styles.text10}>سبق التسجيل ؟  </Text>

        <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('player_navigator')}>
          <Text style={styles.text11}> تسجيل الدخول  </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    width: 500,
    height: 1500
  },

  line: {
    position: 'absolute',
    width: 370,
    height: 105,
    left: 0,
    top: 170
  },

  joud: {
    width: 150.46,
    height: 260.51,
    top: 60
  },

  text: {
    color: '#6F96B3',
    fontSize: 24,
    left: 220,
    top: -55,
  },

  text2: {
    color: '#4E5684',
    fontSize: 17,
    left: 257,
    top: -45,
  },

  text1: {
    color: '#AAC3E3',
    fontSize: 80,
    fontWeight: 'bold',
    top: -90,
    left: 170,
  },

  text3: {
    color: '#4C5784',
    fontSize: 17,
    top: -10,
    left: 295
  },

  text4: {
    color: '#4C5784',
    fontSize: 17,
    top: 40,
    left: 270
  },

  text5: {
    color: '#4C5784',
    fontSize: 17,
    top: 80,
    left: 290,
  },

  text6: {
    color: '#4C5784',
    fontSize: 17,
    top: 110,
    left: 250,
  },

  text7: {
    color: '#4C5784',
    fontSize: 17,
    top: 80,
    left: 255
  },

  text8: {
    color: '#4C5784',
    fontSize: 17,
    top: 380,
    left: 80
  },
  text9: {
    color: '#4C5784',
    fontSize: 17,
    top: 320,
    left: 290
  },

  text10: {
    color: '#636363',
    fontSize: 15,
    top: 530,
    left: 210
  },
  text11: {
    color: '#4C5784',
    fontSize: 15,
    top: 494,
    left: 55
  },
  line1: {
    width: 290,
    height: 0,
    top: 15,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  line2: {
    width: 290,
    height: 0,
    top: 60,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  line3: {
    width: 290,
    height: 0,
    top: 105,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  line4: {
    width: 290,
    height: 0,
    top: 140,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  line5: {
    width: 290,
    height: 0,
    top: 195,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },
  line6: {
    width: 290,
    height: 0,
    top: 110,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  line7: {
    width: 90,
    height: 0,
    top: 380,
    left: 270,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },
  line8: {
    width: 60,
    height: 0,
    top: 395,
    left: 70,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },
  line9: {
    width: 212,
    height: 0,
    top: 350,
    left: 150,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },


  textInput1: {
    left: 160,
    top: 5,
    width: 190,
    height: 20,
    alignItems: 'center'
  },

  textInput2: {
    left: 160,
    top: 50,
    width: 190,
    height: 20,
    alignItems: 'center'
  },

  textInput3: {
    left: 120,
    top: 95,
    width: 190,
    height: 20,
    alignItems: 'center'
  },

  textInput4: {
    left: 140,
    top: 135,
    width: 190,
    height: 20,
    alignItems: 'center'
  },

  textInput5: {
    left: 140,
    top: 100,
    width: 190,
    height: 20,
    alignItems: 'center'
  },
  textInput6: {
    left: 180,
    top: 340,
    width: 190,
    height: 20,
    alignItems: 'center'
  },
  nextlogin: {
    backgroundColor: '#AFD1CB',
    position: 'absolute',
    width: 224,
    height: 58,
    left: 100,
    top: 1230,
    borderRadius: 33,
  },

  login: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 60,
    top: 17,
    color: 'white'
  },

  next: {
    position: 'absolute',
    width: 224,
    height: 58,
    left: 145,
    top: 720,
  },
  Color: {
    color: '#7195B7'
  },

  iderror: {
    color: 'red',
    fontSize: 20,
    top: -50,
    left: 10
  },

  show: {
    top: 65,
    left: 85,
    height: 20,
    width: 20,
    color: '#4C5784',
  },
  show1: {
    left: 85,
    top: 105,
    height: 20,
    width: 20,
    color: '#4C5784',
  },
  dropdown: {
    margin: 16,
    height: 0,
    width: 290,
    left: 55,
    top: 290,
    borderBottomColor: '#B7DFD7',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#B7DFD7'
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
    height: 0,
    width: 290,
    left: 55,
    top: 360,
    borderBottomColor: '#B7DFD7',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#B7DFD7'
  },

  placeholderStyle1: {
    fontSize: 16,
    left: 170,
    top: -30,
    color: '#4C5784'
  },
  selectedTextStyle1: {
    fontSize: 16,
    left: 80,
    top: -20,
    color: '#4C5784'

  },
  iconStyle1: {
    width: 20,
    height: 20,
    left: -270,
    top: -20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
    alignContent: 'center',
    alignItems: 'center'
  },

  emailicon: {
    color: '#4C5784',
    top: 285,
    left: 41.5
  },

  textItem: {
    flex: 1,
    fontSize: 15,
    height: 30
  },

})
