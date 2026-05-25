
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import DetalheScreen from './screens/DetalheScreen';
import FavoritoScreen from './screens/FavoritoScreen';
import PerfilScreen from './screens/PerfilScreen';
import AlterarFotoScreen from './screens/AlterarFotoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Cadastro"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Detalhe"
          component={DetalheScreen}
        />

        <Stack.Screen
          name="Favoritos"
          component={FavoritoScreen}
        />

        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
        />

        <Stack.Screen
          name="AlterarFoto"
          component={AlterarFotoScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}