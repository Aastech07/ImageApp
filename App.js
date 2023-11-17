import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './Component/Screen1';
import Screen2 from './Component/Screen2';
import Screen3 from './Component/Screen3';
import Screen4 from './Component/Screen4';
import Screen5 from './Component/Screen5';
import CameraScreen from './Component/CameraScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Screen1} />
        <Stack.Screen name="Screen1" options={{ headerShown: false }} component={Screen3} />
        <Stack.Screen name="Screen" options={{ headerShown: false }} component={Screen2} />
        <Stack.Screen name="Screen5" options={{ headerShown: false }} component={Screen5} />
        <Stack.Screen name="Screen2" options={{ headerShown: false }} component={Screen4} />
        <Stack.Screen name="CameraScreen" options={{ headerShown: false }} component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
