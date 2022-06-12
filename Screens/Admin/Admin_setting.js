import React ,{useState}from 'react';
import { StyleSheet,Alert,TextInput,TouchableOpacity,Text,Button, View,Image} from 'react-native';
import {setDoc ,doc,collection,updateDoc,getDoc} from 'firebase/firestore';
import { updatePassword,updateEmail,signOut} from 'firebase/auth';
import {db,authentication} from '../../config_firebase/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UpdateAdmin({ navigation }) {

  const user = authentication.currentUser;

  const [Newname, setNewname] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [Newposition, setNewposition] = useState('');
  const [NewPhone, setNewPhone] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [NewEmail, setNewEmail] = useState('');
  const [secureEntry, setsecureEntry] = useState(true);
  const [Name, setName] = useState('')
  const [Id, setId] = useState('')
  const [position, setposition] = useState('')
  const [phone, setphone] = useState()
  const [email, setemail] = useState('')
  Data();

  function Data() {
    const admin_update = doc(db, "Admin", user.uid);
    getDoc(admin_update).then((doc) => {
      setName(doc.get('name'))
      setId(doc.get('work_id'))
      setposition(doc.get('position'))
      setphone(doc.get('phone'))
      setemail(doc.get('email'))
    })
  }
  
  const update = () => {
    const admin_update = doc(db, "Admin", user.uid);

if(Newname != "" || NewPhone != "" || Newposition != '' ){
    if (Newname != "") {
      updateDoc(doc(db, "Admin", user.uid), {
        name: Newname,
      })
      setNewname("");
    }
    if (NewPhone != "") {
      updateDoc(doc(db, "Admin", user.uid), {
        phone: NewPhone,
      })
      setNewPhone("");
    }
    if(Newposition != ''){
      updateDoc(doc(db, "Admin", user.uid), {
        position : Newposition,
      })
      setNewposition('');
    }
  
    Alert.alert(" تم تعديل بنجاح  ")
  
  }

    if (NewPassword != '') {
      if (NewPassword == confirmPassword) {
        if (NewPassword.length >= 8){
          updatePassword(user, NewPassword).then(() => {
            Alert.alert(" تم تعديل الرقم السري  ")
            setNewPassword('');
          }).catch((error) => {
            Alert.alert(" لم يتم تعديل الرقم السري")
          });
        }
        else { Alert.alert("يجب أن يكون الرقم السري من ثمانية خانات أو اكثر ") }
      }
      else { Alert.alert("الرقم السري مختلف عن التأكيد ") }
    }
    if (NewEmail != '') {
      updateEmail(user, NewEmail).then(() => {
        updateDoc(doc(db, "Admin", user.uid), {
          email: NewEmail,
        })
        Alert.alert(" تم تعديل البريد الالكتروني بنجاح  ")
        setNewEmail('');
      }).catch((error) => {
        alert(error)
      });
    }
 
  }
  const signout = () => {
    signOut(authentication).then(() => {
      navigation.navigate('start')
      //Alert.alert('log out success')
    }).catch((error) => {
      console.log(error);
    })
    
  }

  return (
    <View style={styles.container}>

      <View style={styles.name}>
        <Text style={styles.Fullname}>الاسم كامل </Text>

        <TextInput style={styles.textInput1} placeholder={Newname} onChangeText={text => setNewname(text)}>{Name}</TextInput>
      </View>

      <View style={styles.job}>
        <Text style={styles.Jobnumber}>المسمى الوظيفي  </Text>

        <TextInput style={styles.textInput3} placeholder={position} onChangeText={text => setNewposition(text)}>{position}</TextInput>
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


      <View style={styles.buttonborder}>
        <Button title='حفظ التغييرات' style={styles.button} onPress={update} color="#FFFFFF"></Button>

      </View>

    </View>
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
    top: 200,
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
    top: 270,
    left: 50,
    borderRadius: 100,
    borderColor: '#B7DFD7',
    borderWidth: 1
  },

  Jobnumber: {
    position: 'absolute',
    left: 205.27,
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
    top: 340,
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
    top: 410,
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
    top: 480,
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
    top: 550,
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
    top: 660,
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
    top: 380,
    color: '#4C5784',
    left: 50.50,
    height: 20,
    width: 20,
  },
  show1: {
    top: 280,
    color: '#4C5784',
    left: 50.50,
    height: 20,
    width: 20,
  },

});
