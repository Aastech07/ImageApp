
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';

const Stack = createNativeStackNavigator();

const Screen1=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screen1;
