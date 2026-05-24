import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';

export default function HomeScreen({ navigation }) {

  console.log('HOME ABERTA');

  const [paises, setPaises] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPaises();
  }, []);

  async function buscarPaises() {

    try {

      const response = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,capital,cca2'
      );

      const dadosFiltrados = response.data.filter(
        (item) => item?.name?.common
      );

      const ordenados = dadosFiltrados.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setPaises(ordenados);

    } catch (error) {

      console.log('ERRO API:', error);

    } finally {

      setLoading(false);
    }
  }

  const paisesFiltrados = paises.filter((item) =>
    item?.name?.common
      ?.toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  function renderItem({ item }) {

    const bandeira = item?.cca2
      ? `https://flagsapi.com/${item.cca2}/flat/64.png`
      : 'https://via.placeholder.com/64';

    return (

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Detalhe', {
            codigo: item?.cca2
          })
        }
      >

        <View style={styles.cardLeft}>

          <Image
            source={{ uri: bandeira }}
            style={styles.flag}
          />

          <View>

            <Text style={styles.countryName}>
              {item?.name?.common || 'País desconhecido'}
            </Text>

            <Text style={styles.capital}>
              Capital: {item?.capital?.[0] || 'N/A'}
            </Text>

          </View>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
        />

      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#0057FF"
        />
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Países
        </Text>

        <Ionicons
          name="notifications-outline"
          size={24}
          color="#FFF"
        />

      </View>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
        />

        <TextInput
          placeholder="Pesquisar país..."
          style={styles.searchInput}
          value={pesquisa}
          onChangeText={setPesquisa}
        />

      </View>

      <FlatList
        data={paisesFiltrados}
        keyExtractor={(item, index) =>
          item?.cca2 || index.toString()
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomTab}>

        <TouchableOpacity style={styles.tabItem}>

          <Ionicons
            name="home"
            size={22}
            color="#0057FF"
          />

          <Text style={styles.activeTab}>
            Home
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>

          <Ionicons
            name="heart-outline"
            size={22}
            color="#999"
          />

          <Text style={styles.inactiveTab}>
            Favoritos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>

          <Ionicons
            name="person-outline"
            size={22}
            color="#999"
          />

          <Text style={styles.inactiveTab}>
            Perfil
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
    paddingTop: 50,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#0057FF',
    marginHorizontal: 15,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  searchContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 12,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    width: 50,
    height: 35,
    borderRadius: 5,
    marginRight: 15,
  },

  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  capital: {
    color: '#777',
    marginTop: 4,
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    marginTop: 10,
  },

  tabItem: {
    alignItems: 'center',
  },

  activeTab: {
    color: '#0057FF',
    fontSize: 12,
    marginTop: 3,
  },

  inactiveTab: {
    color: '#999',
    fontSize: 12,
    marginTop: 3,
  },

});