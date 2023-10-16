import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import SignIn from '../pages/SignIn';
//import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Details from '../pages/Details';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
        {/* <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false,
                }}
            /> */}

        <AuthStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{
                    headerShown: false,
                }}
            />
            <AuthStack.Screen
                name="Details"
                component={Details}
                options={{
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>


    )
}

export default AuthRoutes;