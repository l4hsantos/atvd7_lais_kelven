import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function AlterarFotoScreen({ navigation }) {

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFF"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          ALTERAR FOTO
        </Text>

        <View style={{ width: 24 }} />

      </View>

      <View style={styles.content}>

        <Image
          source={{
            uri:
              'https://randomuser.me/api/portraits/men/32.jpg',
          }}
          style={styles.avatar}
        />

        <TouchableOpacity style={styles.cameraButton}>

          <Ionicons
            name="camera"
            size={18}
            color="#FFF"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          ESCOLHA UMA IMAGEM
        </Text>

        <Text style={styles.subtitle}>
          SUA FOTO SERÁ ENVIADA PARA O SERVIDOR
        </Text>

        <TouchableOpacity style={styles.galleryButton}>

          <Ionicons
            name="image-outline"
            size={20}
            color="#0057FF"
          />

          <Text style={styles.galleryText}>
            EsSCOLHER DA GALERIA
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraMainButton}>

          <Ionicons
            name="camera-outline"
            size={20}
            color="#FFF"
          />

          <Text style={styles.cameraText}>
            TIRAR FOTO
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
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

  content: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },

  cameraButton: {
    position: 'absolute',
    top: 170,
    right: 120,
    backgroundColor: '#0057FF',
    padding: 10,
    borderRadius: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#222',
  },

  subtitle: {
    color: '#777',
    marginTop: 8,
    marginBottom: 35,
    textAlign: 'center',
  },

  galleryButton: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 14,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
  },

  galleryText: {
    color: '#0057FF',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  cameraMainButton: {
    width: '100%',
    backgroundColor: '#0057FF',
    borderRadius: 14,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  cameraText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },

});