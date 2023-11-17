import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert, Pressable, FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";

const Screen2 = () => {
    const navigation = useNavigation()
    const [data, setData] = useState('')
    const [selectedValue, setSelectedValue] = useState('');
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    
    const setMultipleKeys = async () => {
        try {

            if (name !== undefined && company !== undefined && name !== null && company !== null) {
              const pairs = [
                ['key4', name],
                ['key5', company],
              ];
              await AsyncStorage.multiSet(pairs);
              console.log('Saved multiple keys');
            } else {
              // Handle null or undefined values before saving, this is just an example
             // console.error('Error: Null or undefined values detected');
            }
          } catch (error) {
            console.error('Error saving data:', error);
          }
    };
useEffect(()=>{
    setName()
    setCompany()
},[])

    const loginUser = async () => {
        const request = new XMLHttpRequest();
        const url = 'https://v.bluapps.in/api/apk_otp.php';
        const data1 = `mobile=${data}&otp=${otp}`
        console.log(name)
        console.log(company)
        request.onreadystatechange = async e => {

            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                try {
                    const response = JSON.parse(request.responseText);
                    if (response.status == "success") {

                        if (response && response.data && Array.isArray(response.data)) {

                            const newArray = response.data.map(item => {

                                return { company: item.company, name: item.name };
                            });
                            setSelectedValue(newArray);
                        }
                        navigation.navigate('Screen1')
                    } else {
                        Alert.alert('Enter Valid Otp')
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('Error');
            }
        };
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(data1);
    };

   



    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('key');
            if (value !== null) {
                console.log('Data retrieved successfully:', value);
                setData(value)
            }
            else {
                console.log('Data not found');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        getData()
    }, [])


    const [otp, setOtp] = useState('')
    return (
        <View style={styles.container}>

            <Image source={require("../Component/assets/hira.jpg")} style={{
                position: 'absolute', alignSelf: 'center', width: responsiveWidth(70), height: responsiveHeight(30), bottom: responsiveHeight(55),
            }} />


            <Text style={{
                fontWeight: 'bold', right: responsiveWidth(10), fontSize: 18, top: responsiveHeight(10), color: 'black'
            }}>Your Number :- {data}</Text>


            <TouchableOpacity style={{
            }} onPress={() => navigation.navigate('Home')}>
                <Text style={{
                    alignSelf: "center", color: '#984065', fontWeight: '700', left: responsiveWidth(31), top: responsiveHeight(7),fontSize:16
                }}>Edit</Text>
            </TouchableOpacity>


            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter Otp"
                    placeholderTextColor="black"
                    onChangeText={text => setOtp(text)}
                    keyboardType='numeric'
                />
            </View>

            <TouchableOpacity
                onPress={() => loginUser() + setMultipleKeys()}
                style={styles.loginBtn}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>

            <View style={{ position: 'absolute', bottom: 1000 }}>
                <FlatList
                    style={{}}
                    data={selectedValue}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <Pressable style={styles.container}>
                            <View style={styles.innerContainer}>
                                <Text style={{ fontWeight: 'bold' }}>{item.text}</Text>
                                <Text style={{ fontWeight: 'bold', left: 250, color: '#3E54AC' }}>Present</Text>
                                <Text style={{ fontWeight: '500', bottom: 10, color: 'red' }}> {setCompany(item.company)}</Text>
                                <Text style={{ fontWeight: '500', bottom: 2 }}>{setName(item.name)}</Text>
                                 
                            </View>
                        </Pressable>)} 
                        
                        />
            </View>
 
        </View>

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
        top: responsiveHeight(14),




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
        top: responsiveHeight(12),
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
export default Screen2;