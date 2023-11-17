import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Screen4 = () => {
    const navigation = useNavigation()
    return (
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ top: 200, textAlign: 'center', fontSize: 50, fontWeight: '600', color: '#984065' }}>
                Thank you
            </Text>
            <Text style={{ top: 220, textAlign: 'center', fontSize: 40, fontWeight: '600', color: '#984065' }}>
                For
            </Text>
            <Text style={{ top: 240, textAlign: 'center', fontSize: 45, fontWeight: '600', color: '#984065' }}>
                Visiting Here
            </Text>

            <TouchableOpacity
                onPress={() => { navigation.navigate('Home') }}
                style={{
                    width: "50%",
                    backgroundColor: "#984065",
                    borderRadius: 5,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 40,
                    marginBottom: 10,
                    top: 300, alignSelf: 'center',
                    shadowColor: '#984065',
                    shadowOffset: {
                        width: 0,
                        height: 50,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 16.00,
                    elevation: 24,
                }}>
                <Text style={{ color: 'white' }}>Go Back</Text>
            </TouchableOpacity>



        </View>
    )
}

export default Screen4
