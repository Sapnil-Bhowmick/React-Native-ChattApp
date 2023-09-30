
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcomescreen from '../pages/Welcomescreen';
import Homescreen from '../pages/Homescreen';
import Features from '../layout/Features';





const Stack = createStackNavigator();
const Navigation = () => {

    return (
        <NavigationContainer initialRouteName="welcome">
            <Stack.Navigator>
                <Stack.Screen name="welcome" component={Welcomescreen} options={{ title: 'welcome', headerShown: false }} />
                <Stack.Screen name="home" component={Homescreen} options={{ title: 'home', headerShown: false }} />
                <Stack.Screen name="feature" component={Features} options={{ title: 'home', headerShown: false }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;