import React, { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Mapa from "./pages/mapa";
import Grafico from "./pages/grafico";
import Sensores from "./pages/sensores";
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import CreateSensor from './pages/createSensores';


const Pilha = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#D0D1FF',
                    paddingTop: 1,
                    borderTopColor: 'transparent'
                },
                tabBarActiveTintColor: '#8B8DFE',
                tabBarInactiveTintColor: '#FFFFFF'
            }}
        >
            <Tab.Screen
                name="Mapa"
                component={Mapa}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="map" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Sensores"
                component={Sensores}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="view-list" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Grafico"
                component={Grafico}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="chart-bar" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="account" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="CreateSensor"
                component={CreateSensor}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default function Routers() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <NavigationContainer>
            <Pilha.Navigator initialRouteName="SignIn">
                {isSignedIn ? (
                    <Pilha.Screen
                        name="MyTabs"
                        component={MyTabs}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Pilha.Screen
                            name="SignIn"
                            options={{ headerShown: false }}
                        >
                            {(props) => <SignIn {...props} setIsSignedIn={setIsSignedIn} />}
                        </Pilha.Screen>
                    </>
                )}
                
            </Pilha.Navigator>
        </NavigationContainer>
    );
}
