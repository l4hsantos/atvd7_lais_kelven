import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { doc, setDoc, } from 'firebase/firestore';
import { auth, db} from '../firebase/firebaseConfig';

export default function DetalheScreen({ route, navigation }) {

  const { codigo } = route.params;

  const [pais, setPais] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarDetalhes();
  }, []);

  async function buscarDetalhes() {

    try {

      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${codigo}`
      );

      setPais(response.data[0]);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0057FF" />
      </View>
    );
  }

  const bandeira =
    `https://flagsapi.com/${pais.cca2}/flat/64.png`;

  const moeda =
    pais.currencies
      ? Object.values(pais.currencies)[0]?.name
      : 'N/A';

  const idioma =
    pais.languages
      ? Object.values(pais.languages)[0]
      : 'N/A';

async function adicionarFavorito() {

  try {

    const user = auth.currentUser;

    if (!user) {

      alert('Você precisa estar logado');
      return;
    }

    await setDoc(
      doc(
        db,
        'usuarios',
        user.uid,
        'favoritos',
        pais.cca2
      ),
      {
        cca2: pais.cca2,
        nome: pais.name.common,
        capital: pais.capital?.[0] || 'N/A',
        bandeira: pais.flags?.png,
        continente: pais.region,
      }
    );

    alert('País adicionado aos favoritos!');

  } catch (error) {

    console.log(error);

    alert('Erro ao salvar favorito');
  }
}



  return (

    <ScrollView style={styles.container}>

      <View style={styles.imageContainer}>

        <Image
          source={{
            uri: pais.flags?.png
          }}
          style={styles.countryImage}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#FFF"
          />
        </TouchableOpacity>

      </View>

      <View style={styles.content}>

        <Image
          source={{ uri: bandeira }}
          style={styles.flag}
        />

        <Text style={styles.countryName}>
          {pais.name.common}
        </Text>

        <Text style={styles.officialName}>
          {pais.name.official}
        </Text>

        <View style={styles.infoContainer}>

          <View style={styles.infoRow}>
            <Ionicons
              name="business-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              Capital: {pais.capital?.[0]}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="people-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              População: {pais.population}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="language-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              Idioma: {idioma}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="cash-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              Moeda: {moeda}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="earth-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              Continente: {pais.region}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="map-outline"
              size={20}
              color="#555"
            />
            <Text style={styles.infoText}>
              Sub-região: {pais.subregion}
            </Text>
          </View>

        </View>

        <TouchableOpacity
  style={styles.favoriteButton}
  onPress={adicionarFavorito}
>
          <Ionicons
            name="heart"
            size={20}
            color="#FFF"
          />

          <Text style={styles.favoriteText}>
            Adicionar aos Favoritos
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'relative',
  },

  countryImage: {
    width: '100%',
    height: 250,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 50,
  },

  content: {
    padding: 20,
  },

  flag: {
    width: 60,
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
  },

  countryName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },

  officialName: {
    color: '#777',
    marginBottom: 25,
  },

  infoContainer: {
    marginBottom: 30,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#444',
  },

  favoriteButton: {
    backgroundColor: '#0057FF',
    height: 55,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  favoriteText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },

});