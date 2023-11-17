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
  Image, Modal, Pressable, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
  responsiveHeight,
  responsiveWidth,

} from "react-native-responsive-dimensions";
import { SelectList } from 'react-native-dropdown-select-list'
import { Camera } from 'expo-camera';


const Screen3 = () => {
  const navigation = useNavigation()
  const [mobile, setMobile] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('');
  const [names, setNames] = useState('');
  const [company, setCompany] = useState('');
  const [shouldShow, setShouldShow] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);


  const datas = () => {
    fetch('https://v.bluapps.in/api/apk_company.php')
      .then((response) => response.json())
      .then((responseData) => {
        let newArray = responseData.data.map((item) => {
          return { key: item.offid, value: item.option.toString() };
        });
        setSelectedValue(newArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    datas();
  }, []);


  const sheetRef = useRef(null);

  const onPress1 = () => {
    sheetRef.current?.open();
  };

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

  const getData1 = async () => {
    try {
      const Names = await AsyncStorage.getItem('key4');
      if (Names !== null) {
        setNames(Names);
        console.log('Data retrieved successfully:', Names);
      } else {
        console.log('Data not found');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const getData2 = async () => {
    try {
      const value = await AsyncStorage.getItem('key5');
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        setCompany(value);
      } else {
        console.log('Data not found');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    getData()
    getData1();
    getData2();
  }, []);

  /*const loginUser = () => {
    const request = new XMLHttpRequest();
    const url = 'https://v.bluapps.in/api/apk_cp.php';
    const data = `ofid=${selected1}`;
    console.log(data);

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          try {
            const response = JSON.parse(request.responseText);

            setSelectedValue1(response);

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


  setTimeout(() => {
    console.log(selectedValue1);
  }, 1000);*/
  const Fetch = () => {
    const url = 'https://v.bluapps.in/api/apk_cp.php';
    const data = `ofid=${selected1}`;
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
          const newArray = responseData.detail.map(item => {
            return { key: item.vcon_id, value: item.name };
          });
          setSelectedValue1(newArray);
          console.log(selectedValue1);
        } else {
          console.log('Data is not in the expected format or is undefined.');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };





  const [selected1, setSelected1] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setName(names);
    }, 1000);
  }, [names])

  useEffect(() => {
    setTimeout(() => {
      setAddress(company);
    }, 1000)
  }, [company])


  const handleInputChange = (text) => {
    setName(text)
    if (text.length < 5) {

      setError('Please Enter Your Name.');
    } else {
      setError('');
    }
  };

  const handleInputChange1 = (text) => {
    setAddress(text);
    if (text.length < 5) {
      setError1('Please Enter Your Address.');
    } else {
      setError1('');
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync({ quality: 1, base64: true });
      setPhoto(`data:image/jpg;base64,${photoData.base64}`);
      setModalVisible(!modalVisible)

    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const loginUser1 = () => {
    const request = new XMLHttpRequest();
    const url = 'https://v.bluapps.in/api/apk_ins.php';
    const data = `offid=${selected1}&mobile=${mobile}&name=${name}&company=${company}&v_contact=${selected}`;
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













  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          <Image source={require("../Component/assets/hira.jpg")} style={{
            alignSelf: 'center', width: responsiveWidth(40), height: responsiveHeight(20), borderRadius: 100
          }} />

          <View style={{ top: 25 }}>
            <View style={{ bottom: 20 }}>
              <Text style={{
                fontWeight: 'bold', fontSize: 15, color: '#984065', position: 'absolute', left: 25
              }}>Your Number :- {mobile}</Text>

              <View style={styles.inputView}>

                <Text style={{
                  color: 'black', fontWeight: 'bold', position: 'absolute', left: 6, fontSize: 15, bottom: 50
                }}>Name:-</Text>

                <TextInput
                  style={styles.inputText}
                  placeholder="Enter name"
                  placeholderTextColor="black"
                  onChangeText={handleInputChange}
                  value={name}

                />
              </View>
              {error !== '' && <Text style={{ color: 'red', fontWeight: '600', top: 45, left: 23, }}>{error}</Text>}

              <View style={styles.inputView1}>
                <Text style={{
                  color: 'black', fontWeight: 'bold', position: 'absolute', left: 6, fontSize: 15, bottom: 50
                }}>Address:-</Text>

                <TextInput
                  style={styles.inputText}
                  placeholder="Enter address "
                  placeholderTextColor="black"
                  onChangeText={handleInputChange1}
                  value={address}
                />
              </View>
              {error1 !== '' && <Text style={{ color: 'red', fontWeight: '600', top: 80, left: 23, }}>{error1}</Text>}
              <View style={{ top: 90, left: 25 }}>
                <Text style={{
                  color: 'black', fontWeight: 'bold', fontSize: 15, top: 20
                }}>Add Picture:-</Text>
                <TouchableOpacity style={{
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 2,
                  top: 15, left: 120,
                  paddingLeft: 40,
                  paddingRight: 40,
                  borderColor: '#984065',
                  shadowOffset: {
                    width: 0,
                    height: 50,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 10.00,
                  elevation: 10,
                  backgroundColor: '#984065',
                  position: 'absolute'

                }} onPress={() => setModalVisible(true)}>
                  <Text style={{
                    color: 'white', fontWeight: '500'
                  }}>access camera</Text>
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={{ flex: 1, }}>

                    <View style={styles.container}>
                      <Camera
                        ref={(ref) => setCameraRef(ref)}
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                      />
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                          <Text style={styles.buttonText}>Take Photo</Text>
                        </TouchableOpacity>
                      </View>
                    </View>


                  </View>

                </Modal>

              </View>
              <View style={{top:120}}>
                {photo && <Image source={{ uri: photo }} style={styles.previewImage} />}
              </View>

              <View style={{ bottom: 130 }}>
                <View style={{ top: responsiveHeight(4) }}>
                  <Text style={{
                    color: 'black', fontWeight: 'bold', fontSize: 15, top: 250, left: 25
                  }}>Office :-</Text>
                </View>
                <View style={{ top: 290, left: 20 }}>
                  <SelectList
                    setSelected={setSelected1} data={selectedValue}
                    save={'key'} boxStyles={{ maxWidth: 320, borderColor: "black", borderWidth: 1, }}
                    search={false} dropdownStyles={{ maxWidth: 320, borderColor: 'black' }} dropdownTextStyles={{ color: 'black' }}
                  />
                </View>
              </View>
            </View>

            <View style={{ top: 400, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setShouldShow(!shouldShow) + Fetch()}
                style={styles.loginBtn1}
              >

                <Text style={{ color: 'white' }}>Show Contact</Text>
              </TouchableOpacity>
            </View>

            {shouldShow ? (
              <View style={{ left: 20, top: responsiveHeight(15) }}>
                <SelectList
                  setSelected={setSelected} data={selectedValue1}
                  save={'key'} boxStyles={{ maxWidth: 320, borderColor: "black", borderWidth: 1, }}
                  search={false} dropdownStyles={{ maxWidth: 320, borderColor: 'black' }} dropdownTextStyles={{ color: 'black' }} />
              </View>) : null
            }

            <View style={{ left: 20, top: 10 }}>
              <TouchableOpacity
                       onPress={()=>loginUser1()+Alert.alert('Done!')}
                style={styles.loginBtn}>
                <Text style={{ color: 'white' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({

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
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    bottom: responsiveHeight(3),
    top: 60,
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    left: 19,


  }, inputView1: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    bottom: responsiveHeight(3),
    top: 90,
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    left: 19,


  },
  inputText: {
    height: 50,
    color: "black",
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
    top: 140,
    shadowColor: '#984065',
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    elevation: 5,
  }, sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
  },
   camera: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#984065',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#984065',
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
  },
  previewImage: {
    width: responsiveWidth(90),
    height: 250,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius:5
  }, container: {
    flex: 1, backgroundColor: 'black',
  },
 

});
export default Screen3;




