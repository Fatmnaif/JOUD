import React ,{useState}from 'react';
import { StyleSheet,Alert,TextInput,TouchableOpacity,Text,Button, View,Image,ScrollView} from 'react-native';
import {authentication,db} from '../../config_firebase/firebase';
import {setDoc ,doc,collection,updateDoc,getDoc} from 'firebase/firestore';
import { updatePassword,updateEmail,signOut} from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';

export default function UpdateAdmin({ navigation }) {

  const user = authentication.currentUser; 

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
  const [value, setValue] = useState('');
  const [Newname, setNewname] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [Newposition, setNewposition] = useState('');
  const [NewPhone, setNewPhone] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [NewEmail, setNewEmail] = useState('');
  const [secureEntry, setsecureEntry] = useState(true);
  const [Academic_level, setAcademic_level] = useState('');
  const [Collage, setCollage] = useState('');
  const [newAcademic_level, setnewAcademic_level] = useState('');
  const [newCollage, setnewCollage] = useState('');
  const [Name, setName] = useState('')
  const [Id, setId] = useState('')
  const [newId, setnewId] = useState('')
  const [phone, setphone] = useState()
  const [email, setemail] = useState('')
  Data();

  function Data() {
    const admin_update = doc(db, "player", user.uid);
    getDoc(admin_update).then((doc) => {
      setName(doc.get('name'))
      setId(doc.get('student_id'))
      setCollage(doc.get('collage'))
      setAcademic_level(doc.get('Academicـlevel'))
      setphone(doc.get('phone'))
      setemail(doc.get('email'))
    })
  }
  const update = () => {
    const admin_update = doc(db, "player", user.uid);

  if(Newname != ""||NewPhone != ""|| newAcademic_level != ""|| newCollage != ""){
    if (Newname != "") {
      updateDoc(doc(db, "player", user.uid), {
        name: Newname,
      })
    }
    if (NewPhone != "") {
      updateDoc(doc(db, "player", user.uid), {
        phone: NewPhone,
      })
    }

    if (newAcademic_level != "") {
      updateDoc(doc(db, "player", user.uid), {
        Academicـlevel: newAcademic_level,
      })
    }

    if (newCollage != "") {
      updateDoc(doc(db, "player", user.uid), {
        collage: newCollage,
      })
    }
    Alert.alert(" تم تعديل بنجاح  ")

    Newname = ""
    NewPhone = ""
    newAcademic_level = "" 
    newCollage = ""
  }

    if (NewPassword != '') {
      if (NewPassword == confirmPassword) {
        if (NewPassword.length >= 8){
          updatePassword(user, NewPassword).then(() => {
            Alert.alert(" تم تعديل الرقم السري  ")
          }).catch((error) => {
            Alert.alert(" لم يتم تعديل الرقم السري")
          });
        }        
        else { Alert.alert("يجب أن يكون الرقم السري من ثمانية خانات أو اكثر ") }
      }
      else { Alert.alert("الرقم السري مختلف عن التأكيد ") }
      NewPassword=''
    }

    if (NewEmail != '') {
      updateEmail(user, NewEmail).then(() => {
        updateDoc(doc(db, "player", user.uid), {
          email: NewEmail,
        })
        Alert.alert(" تم تعديل البريد الالكتروني بنجاح  ")
      }).catch((error) => {
        alert(error)
      });
      NewEmail=''
    }
  }
  const signout = () => {
    signOut(authentication).then(() => {
      navigation.navigate('start')
    }).catch((error) => {
      console.log(error);
    })
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
  console.log(Academic_level);
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.name}>
          <Text style={styles.Fullname}>الاسم كامل </Text>

          <TextInput style={styles.textInput1} onChangeText={text => setNewname(text)}>{Name}</TextInput>
        </View>

        <View style={styles.job}>
          <Text style={styles.Jobnumber}>الرقم الجامعي  </Text>

          <TextInput style={styles.textInput3} value={Id} editable={false}></TextInput>
        </View>

        <View style={styles.password}>
          <Text style={styles.pass}>الرقم السري  </Text>
          <TextInput style={styles.textInput3} secureTextEntry={secureEntry} placeholder={'*******'} value={NewPassword} onChangeText={text => setNewPassword(text)} />
        </View>

        <View style={styles.jobname}>
          <Text style={styles.jobn}>تاكيد الرقم السري  </Text>
          <TextInput style={styles.textInput3} secureTextEntry={secureEntry} placeholder={'*******'} value={confirmPassword} onChangeText={text => setconfirmPassword(text)} />
        </View>

        <View style={styles.Email}>
          <Text style={styles.Emailn}>البريد الالكتروني   </Text>
          <TextInput style={styles.textInput4} onChangeText={text => setNewEmail(text)} placeholder={email}>{email}</TextInput>
        </View>

        <View style={styles.Phonenumber}>
          <Text style={styles.Phonen}>رقم الجوال   </Text>
          <TextInput style={styles.textInput5} onChangeText={text => setNewPhone(text)} placeholder={phone}>{phone} </TextInput>
        </View>
        <TouchableOpacity onPress={() => { setsecureEntry((prev) => !prev); }}>
          {secureEntry ?
            <MaterialCommunityIcons style={styles.show} name="eye-outline" size={18} />
            :
            <MaterialCommunityIcons style={styles.show} name="eye-off-outline" size={18} />
          }</TouchableOpacity>

        <TouchableOpacity onPress={() => { setsecureEntry((prev) => !prev); }}>
          {secureEntry ?
            <MaterialCommunityIcons style={styles.show1} name="eye-outline" size={18} />
            :
            <MaterialCommunityIcons style={styles.show1} name="eye-off-outline" size={18} />
          }
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={signout}>
            <Text style={styles.Exit} >تسجيل خروج </Text>
            <Image style={styles.Exiticon} source={require('../../../assets/Exiticon.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.collage}>
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
            placeholder={Collage}
            searchPlaceholder="بحث...."
            value={newCollage}
            onChange={item => {
              setnewCollage(item.value);
            }}
            renderItem={renderItem}
          />
        </View>

        <Dropdown
          style={styles.dropdown1}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={Academic_leveldata}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={Academic_level}
          searchPlaceholder="بحث...."
          value={newAcademic_level}
          onChange={item => {
            setnewAcademic_level(item.value);
          }}
          renderItem={renderItem2}
        />

        <View style={styles.buttonborder}>
          <Button title='حفظ التغييرات' style={styles.button} onPress={update} color="#FFFFFF"></Button>

        </View>

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

  buttonborder: {
    borderColor: '#6F97B1',
    borderWidth: 3,
    width: 190,
    borderRadius: 70,
    top: 570,
    bottom: 90,
    padding: 1,
    margin: 1,
    backgroundColor: '#6F97B1',
    color: '#FFFFFF',
    marginLeft: 60,
    marginRight: 90,
    left: 50,
  },

  name: {

    width: 330,
    height: 0,
    top: 170,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1

  },

  Fullname: {
    position: 'absolute',
    left: 246.27,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput1: {
    position: 'absolute',
    left: 80.27,
    top: -25.85,
    fontSize: 15
    , color: 'grey'
  },


  job: {
    width: 330,
    height: 0,
    top: 240,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  Jobnumber: {
    position: 'absolute',
    left: 235.27,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput2: {
    position: 'absolute',
    left: 80.27,
    top: -25.85,
    fontSize: 15, color: 'grey'
  },

  password: {
    width: 330,
    height: 0,
    top: 300,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  pass: {
    position: 'absolute',
    left: 236,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput3: {
    position: 'absolute',
    left: 100.27,
    top: -25.85,
    width: 100,
    fontSize: 15,
    color: 'grey'
  },

  jobname: {
    width: 330,
    height: 0,
    top: 365,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  jobn: {
    position: 'absolute',
    left: 200.27,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput3: {
    position: 'absolute',
    left: 100.27,
    top: -25.85,
    fontSize: 15,
    color: 'grey'
  },


  Email: {
    width: 330,
    height: 0,
    top: 420,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  Emailn: {
    position: 'absolute',
    left: 210.27,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput4: {
    position: 'absolute',
    left: 20.27,
    top: -25.85,
    fontSize: 15, color: 'grey'
  },

  Phonenumber: {
    width: 330,
    height: 0,
    top: 480,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  Phonen: {
    position: 'absolute',
    left: 240.27,
    top: -27.85,
    color: '#4C5784',
    fontSize: 17
  },
  textInput5: {
    position: 'absolute',
    left: 80.27,
    top: -25.85,
    fontSize: 15, color: 'grey'
  },

  Exit: {
    color: '#E55C72',
    position: 'absolute',
    top: 670,
    left: 175,
    fontSize: 20
  },

  Exit1: {
    color: '#E55C72',
    position: 'absolute',
    top: 630,
    left: 175,
    fontSize: 20
  },

  Exiticon: {
    position: 'absolute',
    top: 665,
    left: 120,
    width: 24,
    height: 24

  },


  collage: {
    position: 'absolute',
    left: 0.27,
    top: -25.85,
    color: '#4C5784',
    fontSize: 17
  },
  Edititicon: {
    top: -27,
    width: 20,
    height: 20,
    left: -15
  },

  Exit: {
    color: '#E55C72',
    position: 'absolute',
    top: 670,
    left: 175,
    fontSize: 20
  },

  Exiticon: {
    position: 'absolute',
    top: 675,
    left: 120,
    width: 24,
    height: 24
  },
  show: {
    top: 340,
    color: '#4C5784',
    left: 60.50,
    height: 20,
    width: 20,
  },
  show1: {
    top: 240,
    color: '#4C5784',
    left: 60.50,
    height: 20,
    width: 20,
  },
  dropdown: {
    margin: 16,
    height: 0,
    width: 320,
    left: 40,
    top: 576,
    borderBottomColor: '#B7DFD7',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#B7DFD7'
  },

  placeholderStyle: {
    fontSize: 16,
    left: 80,
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
    left: -290,
    top: -20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  dropdown1: {
    margin: 16,
    height: 0,
    width: 320,
    left: 40,
    top: 580,
    borderBottomColor: '#B7DFD7',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: '#B7DFD7'
  },

  placeholderStyle1: {
    fontSize: 16,
    left: 80,
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
    left: -290,
    top: -20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
    alignContent: 'center',
    alignItems: 'center'
  },

});
 // ../../../../assets/Exiticon.png