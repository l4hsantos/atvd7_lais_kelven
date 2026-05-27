import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut, updateProfile, updatePassword, } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function PerfilScreen({ navigation }) {

  const auth = getAuth();
  const user = auth.currentUser;

  const [nome, setNome] = useState('');
  const [editando, setEditando] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [editandoSenha, setEditandoSenha] = useState(false);
  const [foto, setFoto] = useState(user?.photoURL || null);
  const [totalFavoritos, setTotalFavoritos] = useState(0);

  useEffect(() => {
    if (user?.displayName) { setNome(user.displayName); }
    carregarFavoritos();
  }, []);


  async function carregarFavoritos() {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const querySnapshot = await getDocs(
        collection(db, 'usuarios', user.uid, 'favoritos')
      );
      setTotalFavoritos(querySnapshot.size);
    } catch (error) {
      console.log(error);
      setTotalFavoritos(0);
    }
  }

  async function sair() {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível sair da conta.');
    }
  }

  async function salvarNome() {
    try {
      await updateProfile(user, { displayName: nome });
      Alert.alert('Sucesso', 'Perfil atualizado!');
      setEditando(false);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar.');
    }
  }

  async function alterarSenha() {
    try {
      if (!novaSenha) {
        Alert.alert('Erro', 'Digite uma nova senha');
        return;
      }
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado');
      await updatePassword(user, novaSenha);
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      setNovaSenha('');
      setEditandoSenha(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
  }

  async function escolherImagem() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria.');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!resultado.canceled) {
      const imagem = resultado.assets[0].uri;
      setFoto(imagem);
      try {
        await updateProfile(user, { photoURL: imagem });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.wrapper}>

      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="#FFF" />
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <Ionicons name="person-circle-outline" size={24} color="#FFF" />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.profileCard}>

          {foto ? (
            <Image source={{ uri: foto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={60} color="#FFF" />
            </View>
          )}

          <TouchableOpacity style={styles.cameraButton} onPress={escolherImagem}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>

          {editando ? (
            <TextInput
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholder="Digite seu nome"
            />
          ) : (
            <Text style={styles.name}>{nome || 'Usuário'}</Text>
          )}

          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalFavoritos}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalFavoritos}</Text>
              <Text style={styles.statLabel}>Países vistos</Text>
            </View>
          </View>

          {editando ? (
            <TouchableOpacity style={styles.option} onPress={salvarNome}>
              <Ionicons name="checkmark-circle-outline" size={20} color="#555" />
              <Text style={styles.optionText}>Salvar Nome</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.option} onPress={() => setEditando(true)}>
              <Ionicons name="person-outline" size={20} color="#555" />
              <Text style={styles.optionText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.option} onPress={escolherImagem}>
            <Ionicons name="image-outline" size={20} color="#555" />
            <Text style={styles.optionText}>Alterar Foto</Text>
          </TouchableOpacity>

          {editandoSenha ? (
            <>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#777" />
                <TextInput
                  placeholder="Nova senha"
                  secureTextEntry={!mostrarSenha}
                  style={styles.inputSenha}
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Ionicons
                    name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="#777"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.option} onPress={alterarSenha}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#555" />
                <Text style={styles.optionText}>Salvar Nova Senha</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.option} onPress={() => setEditandoSenha(true)}>
              <Ionicons name="lock-closed-outline" size={20} color="#555" />
              <Text style={styles.optionText}>Alterar Senha</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.logout} onPress={sair}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#999" />
          <Text style={styles.inactiveTab}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Favoritos')}>
          <Ionicons name="heart-outline" size={22} color="#999" />
          <Text style={styles.inactiveTab}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={22} color="#0057FF" />
          <Text style={styles.activeTab}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  header: {
    backgroundColor: '#0057FF',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  profileCard: {
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0057FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraButton: {
    position: 'absolute',
    top: 95,
    right: 120,
    backgroundColor: '#0057FF',
    padding: 8,
    borderRadius: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#222',
  },

  email: {
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: '#F5F7FF',
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
    fontSize: 16,
  },

  inputContainer: {
    width: '100%',
    backgroundColor: '#F5F7FF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },

  inputSenha: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  statsContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  statBox: {
    backgroundColor: '#F5F7FF',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 5,
    minWidth: 120,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057FF',
  },

  statLabel: {
    color: '#777',
    marginTop: 4,
    fontSize: 12,
  },

  option: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  optionText: {
    marginLeft: 12,
    color: '#333',
    fontSize: 15,
  },

  logout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#FF3B30',
    marginLeft: 10,
    fontWeight: 'bold',
  },

  bottomTab: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
  },

  tabItem: {
    alignItems: 'center',
  },

  activeTab: {
    color: '#0057FF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },

  inactiveTab: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
});