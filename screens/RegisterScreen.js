import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile, } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function RegisterScreen({ navigation,}) {

  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [mostrarConfirmar, setMostrarConfirmar] =
    useState(false);

  const [nome, setNome] = useState('');

  const [email, setEmail] = useState('');

  const [senha, setSenha] = useState('');

  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function cadastrar() {

    if ( !nome || !email || !senha || !confirmarSenha ) {

      Alert.alert(
        'Erro',
        'Preencha todos os campos'
      );

      return;
    }

    if (senha !== confirmarSenha) {

      Alert.alert(
        'Erro',
        'As senhas não coincidem'
      );

      return;
    }

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          senha
        );

      const user = userCredential.user;

      await updateProfile(user, { displayName: nome });

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );

      navigation.navigate('Login');

    } catch (error) {

      Alert.alert(
        'Erro ao cadastrar',
        error.message
      );
    }
  }

  return (

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >

        <Ionicons
          name="arrow-back"
          size={26}
          color="#000"
        />

      </TouchableOpacity>

      <Text style={styles.title}>
        CRIAR CONTA
      </Text>

      <Text style={styles.subtitle}>
        PREENCHA OS CAMPOS PARA SE CADASTRAR
      </Text>

      <View style={styles.inputContainer}>

        <Ionicons
          name="person-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="NOME COMPLETO"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

      </View>

      <View style={styles.inputContainer}>

        <Ionicons
          name="mail-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="E-MAIL"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

      </View>

      <View style={styles.inputContainer}>

        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="SENHA"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha) }
        >

          <Ionicons
            name={ mostrarSenha  ? 'eye-outline' : 'eye-off-outline' }
            size={20}
            color="#777"
          />

        </TouchableOpacity>

      </View>

      <View style={styles.inputContainer}>

        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="CONFIRMAR SENHA"
          secureTextEntry={!mostrarConfirmar}
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity
          onPress={() =>
            setMostrarConfirmar(
              !mostrarConfirmar
            )
          }
        >

          <Ionicons
            name={
              mostrarConfirmar
                ? 'eye-outline'
                : 'eye-off-outline'
            }
            size={20}
            color="#777"
          />

        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >

        <Text style={styles.buttonText}>
          CADASTRAR
        </Text>

      </TouchableOpacity>

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          JÁ TEM  UMA CONTA?
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Login')
          }
        >

          <Text style={styles.link}>
            {' '}FAÇA LOGIN
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },

  subtitle: {
    color: '#777',
    marginBottom: 35,
  },

  inputContainer: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  button: {
    backgroundColor: '#0057FF',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    color: '#555',
  },

  link: {
    color: '#0057FF',
    fontWeight: 'bold',
  },

});