import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {

    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@authToken');
      const storedUserString = await AsyncStorage.getItem('@user');
      //console.log(storageUser);
      //console.log(storedUserString);
      if (storageUser) {
       //console.log(storedUserString)
        setUser(JSON.parse(storedUserString));
        //navigation.navigate('Home');
        setLoading(false);

        //navigation.navigate('SignIn');

      }
      setLoading(false);
    }
    setLoading(true);
    loadStorage();
  }, [])

  async function signIn(email, password) {
    setLoadingAuth(true);

    //console.log(email, password)

    try {

      const response = await api.post('auth/login', {
        email: email,
        password: password
      })
      //console.log(response.data)
      const { token } = response.data;
      const user = { email: email };


      await AsyncStorage.setItem('@authToken', token);
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUser(user);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setLoadingAuth(false);
      //navigation.navigate('Home');

    } catch (err) {
      console.log("ERRO AO LOGAR ", err);
      Alert.alert('E-mail ou senha incorretos!');
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loadingAuth, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

