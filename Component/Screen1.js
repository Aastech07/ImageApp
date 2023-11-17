import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";


const Screen1 = () => {
  const navigation = useNavigation()
  
  const loginUser = async () => {
    const request = new XMLHttpRequest();
    const url = 'https://v.bluapps.in/api/apk_login.php';
    const data = `mobile=${mobile}`

    request.onreadystatechange = async e => {

      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        try {
          //  const response = JSON.parse(request.responseText);

        } catch (error) {
          console.log(error)
        }

      } else {
        console.log('Error');
      }
    };
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(data);
  };


  const setData = async () => {
    try {
      await AsyncStorage.setItem('key', mobile);
      if (mobile.length === 10) {
        console.log('Data stored successfully');
        navigation.navigate('Screen')
      } else {
        Alert.alert('Please Enter 10 number')
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }

  }

  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('');


  const handleInputChange = (text) => {
    setMobile(text);
    if (text.length < 10) {
      setError('Please enter at least 10 numbers.');
    } else {
      setError('');
    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <Image source={require("../Component/assets/hira.jpg")} style={{
        position: 'absolute', alignSelf: 'center', width: responsiveWidth(70), height: responsiveHeight(30), bottom: responsiveHeight(55),
      }} />


      <Text style={{
        fontWeight: 'bold', right: responsiveWidth(24), fontSize: 17, top: responsiveHeight(12), color: 'black',
      }}>Mobile Number :- </Text>


      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter your Number"
          placeholderTextColor="black"
          onChangeText={handleInputChange}
          keyboardType='numeric'
          value={mobile}
        />
      </View>
      {error !== '' && <Text style={{ color: 'red', top: responsiveHeight(15), right: responsiveWidth(12), fontWeight: '600' }}>{error}</Text>}
      <TouchableOpacity
        onPress={() => loginUser() + setData()}
        style={styles.loginBtn}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    top: responsiveHeight(15),
    



  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "90%",
    backgroundColor: "#984065",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    top: responsiveHeight(13),
    shadowColor: '#984065',
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    elevation: 10,
  },
});
export default Screen1;