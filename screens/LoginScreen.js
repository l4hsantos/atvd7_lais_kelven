import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function LoginScreen({ navigation }) {

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function login() {

    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          senha
        );

      const user = userCredential.user;

      Alert.alert(
        'Sucesso',
        'Login realizado com sucesso!'
      );

      console.log(user);

    } catch (error) {

      Alert.alert(
        'Erro no login',
        error.message
      );
    }
  }

  async function esquecerSenha() {

    if (!email) {
      Alert.alert(
        'Atenção',
        'Digite seu e-mail para recuperar a senha'
      );
      return;
    }

    try {

      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        'Sucesso',
        'Enviamos um link de recuperação para seu e-mail'
      );

    } catch (error) {

      Alert.alert(
        'Erro',
        error.message
      );
    }
  }

  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
        }}
        style={styles.image}
      />

      <Text style={styles.title}>
        CONHEÇA{'\n'}O MUNDO
      </Text>

      <Text style={styles.subtitle}>
        Explore. Descubra. Viaje.
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="E-mail"
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
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          onPress={() =>
            setMostrarSenha(!mostrarSenha)
          }
        >
          <Ionicons
            name={
              mostrarSenha
                ? 'eye-outline'
                : 'eye-off-outline'
            }
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={esquecerSenha}
      >
        <Text style={styles.forgotPasswordText}>
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ainda não tem conta?
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Cadastro')
          }
        >
          <Text style={styles.link}>
            {' '}Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#003CB3',
    textAlign: 'center',
    lineHeight: 38,
  },

  subtitle: {
    color: '#666',
    marginTop: 8,
    marginBottom: 35,
    fontSize: 14,
  },

  inputContainer: {
    width: '100%',
    backgroundColor: '#FFF',
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

  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },

  forgotPasswordText: {
    color: '#0057FF',
    fontWeight: '600',
  },

  button: {
    width: '100%',
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