import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    Image, Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import {
    responsiveHeight,
    responsiveWidth,

} from "react-native-responsive-dimensions";


const Screen5 = () => {
    const navigation = useNavigation()
    const [mobile, setMobile] = useState('')
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [api, setApi] = useState('')
    const [offid, setOffid] = useState('')
    const [selectedValue1, setSelectedValue1] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [shouldShow, setShouldShow] = useState('');
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('key');
            if (value !== null) {
                console.log('Data retrieved successfully:', value);
                setMobile(value)

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


    const getName = async () => {
        try {
            const value = await AsyncStorage.getItem('key1');
            if (value !== null) {
                console.log('Data retrieved successfully:', value);
                setName(value)

            }
            else {
                console.log('Data not found');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    useEffect(() => {
        getName(), getCompany(), getofid()
    }, [])


    const getCompany = async () => {
        try {
            const value = await AsyncStorage.getItem('key2');
            if (value !== null) {
                console.log('Data retrieved successfully:', value);
                setCompany(value)

            }
            else {
                console.log('Data not found');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const getofid = async () => {
        try {
            const value = await AsyncStorage.getItem('key3');
            if (value !== null) {
                console.log('Data retrieved successfully:', value);
                setOffid(value)

            }
            else {
                console.log('Data not found');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const Fetch = () => {
        const url = 'https://v.bluapps.in/api/apk_cp.php';
        const data = `ofid=${offid}`;
        console.log(data);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                if (responseData && responseData.detail && Array.isArray(responseData.detail)) {
                    setSelectedValue1(responseData.detail);
                    const newArray = responseData.detail.map(item => {
                        return { key: item.vcon_id, value: item.name };
                    });
                    setSelectedValue(newArray);
                    console.log(newArray);
                } else {
                    console.log('Data is not in the expected format or is undefined.');
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };


    //  return { key: item.vcon_id, value: item.name.toString() };


    const loginUser1 = () => {
        const request = new XMLHttpRequest();
        const url = 'https://v.bluapps.in/api/apk_ins.php';
        const data = `offid=${offid}&mobile=${mobile}&name=${name}&company=${company}&v_contact=${selected1}`;
        console.log(data);

        request.onreadystatechange = () => {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    try {

                        const response = JSON.parse(request.responseText);
                        (response.status)

                        if (response.status == 'success') {
                            try {
                                console.log('Data stored successfully');
                                console.log(response.status);

                            } catch (error) {
                                console.error('Error storing data:', error);
                            }

                            navigation.navigate('MyTab')
                            alert("Login Successfull ")
                        } else {
                            alert('Login failed');
                        }

                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log('Error:', request.status);
                }
            }
        };

        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(data);
    };

    const [selected1, setSelected1] = React.useState("");

    return (
        <><SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>

            <ScrollView contentContainerStyle={{ paddingBottom: 400 }}>

                <Image source={require("../Component/assets/hira.jpg")} style={{
                    alignSelf: 'center', width: responsiveWidth(40), height: responsiveHeight(20),
                }} />
                <Text style={{
                    fontWeight: 'bold', fontSize: 15, color: 'black', left: 25
                }}>Your Number :- {mobile}</Text>


                <Text style={{
                    fontWeight: 'bold', fontSize: 15, color: 'black', left: 25, top: 10
                }}>Your Name :- {name}</Text>
                <TouchableOpacity style={{
                }} onPress={() => navigation.navigate('Screen1')}>
                    <Text style={{
                        alignSelf: "center", color: '#984065', fontWeight: '700', left: 300, top: 27, fontSize: 15, position: 'absolute'
                    }}>Edit</Text>
                </TouchableOpacity>

                <Text style={{
                    fontWeight: 'bold', fontSize: 15, color: 'black', left: 25, top: 20,
                }}>Address :- {company}</Text>

                <TouchableOpacity style={{
                }} onPress={() => navigation.navigate('Screen1')}>
                    <Text style={{
                        alignSelf: "center", color: '#984065', fontWeight: '700', left: 300,bottom:9,  fontSize: 15, position: 'absolute'
                    }}>Edit</Text>
                </TouchableOpacity>

                <View style={{ left: 20, top: 300 }}>
                    <TouchableOpacity
                        onPress={() => setShouldShow(!shouldShow) + Fetch()}
                        style={styles.loginBtn1}
                    >

                        <Text style={{ color: 'white' }}>Show Contact</Text>
                    </TouchableOpacity>
                </View>

                {shouldShow ? (
                    <View style={{ left: 20, top: responsiveHeight(1) }}>
                        <SelectList
                            setSelected={setSelected1} data={selectedValue} onSelect={() => alert(selected1)}
                            save={'key'} boxStyles={{ maxWidth: 320, borderColor: "black", borderWidth: 1, backgroundColor: 'black' }}
                            search={false} dropdownStyles={{ maxWidth: 320, borderColor: 'black' }} dropdownTextStyles={{ color: 'black' }} />
                    </View>) : null
                }

                <View style={{ left: 20, top: 200 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Screen2') + loginUser1()}
                        style={styles.loginBtn}>
                        <Text style={{ color: 'white' }}>Submit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
        </>
    )
}

export default Screen5

const styles = StyleSheet.create({


    loginBtn: {
        width: "90%",
        backgroundColor: "#984065",
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,

        shadowColor: '#984065',
        shadowOffset: {
            width: 0,
            height: 50,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.00,
        elevation: 5,
    }, loginBtn1: {
        width: "90%",
        backgroundColor: "#984065",
        borderRadius: 5,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        bottom: 290,
        shadowColor: '#984065',
        shadowOffset: {
            width: 0,
            height: 50,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.00,
        elevation: 5,
    }

});

