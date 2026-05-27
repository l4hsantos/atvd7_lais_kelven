import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null); 

  async function login() {
    setErro(null);

    if (!email || !senha) {
      setErro({ tipo: 'aviso', mensagem: 'Preencha todos os campos.' });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.navigate('Home');
    } catch (error) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-login-credentials' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErro({ tipo: 'erro', mensagem: 'E-mail ou senha incorretos.' });
      } else if (error.code === 'auth/invalid-email') {
        setErro({ tipo: 'aviso', mensagem: 'Digite um e-mail válido.' });
      } else {
        setErro({ tipo: 'erro', mensagem: 'Não foi possível fazer login.' });
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/avião.png')} style={styles.image} />

      <Text style={styles.title}>CONHEÇA{'\n'}O MUNDO</Text>
      <Text style={styles.subtitle}>Explore. Descubra. Viaje.</Text>

      {erro && (
        <View style={[
          styles.erroBanner,
          erro.tipo === 'erro' ? styles.erroBannerVermelho : styles.erroBannerAmarelo
        ]}>
          <Ionicons
            name={erro.tipo === 'erro' ? 'close-circle-outline' : 'warning-outline'}
            size={22}
            color={erro.tipo === 'erro' ? '#B91C1C' : '#92400E'}
          />
          <Text style={[
            styles.erroTexto,
            erro.tipo === 'erro' ? styles.erroTextoVermelho : styles.erroTextoAmarelo
          ]}>
            {erro.mensagem}
          </Text>
          <TouchableOpacity onPress={() => setErro(null)}>
            <Ionicons name="close-outline" size={20}
              color={erro.tipo === 'erro' ? '#B91C1C' : '#92400E'}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#777" />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={(v) => { setEmail(v); setErro(null); }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#777" />
        <TextInput
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={(v) => { setSenha(v); setErro(null); }}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
            size={20} color="#777"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}> Cadastre-se</Text>
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
  image: { width: 180, height: 180, marginBottom: 10 },
  title: {
    fontSize: 34, fontWeight: 'bold',
    color: '#003CB3', textAlign: 'center', lineHeight: 38,
  },
  subtitle: { color: '#666', marginTop: 8, marginBottom: 35, fontSize: 14 },
  erroBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  erroBannerVermelho: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  erroBannerAmarelo: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  erroTexto: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  erroTextoVermelho: { color: '#B91C1C' },
  erroTextoAmarelo: { color: '#92400E' },

  inputContainer: {
    width: '100%', backgroundColor: '#FFF',
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, paddingHorizontal: 15,
    marginBottom: 15, height: 55,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 15 },
  button: {
    width: '100%', backgroundColor: '#0057FF',
    height: 55, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', marginTop: 20 },
  footerText: { color: '#555' },
  link: { color: '#0057FF', fontWeight: 'bold' },
});